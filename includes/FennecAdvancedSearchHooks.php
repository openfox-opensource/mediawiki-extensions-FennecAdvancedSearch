<?php

namespace MediaWiki\Extension\FennecAdvancedSearch; 

use CirrusSearch\Search\ShortTextIndexField;
use CirrusSearch\Search\CirrusSearchIndexFieldFactory;
use CirrusSearch\SearchConfig;
use SearchEngine;
use ParserOutput;
use WikiPage;
use ContentHandler;

class Hooks{
	static public function categoryExtract( &$params ){
		$params['category'] = [
			'label' => wfMessage('fennecadvancedsearch-category-label')->text(),
        	'field' => 'category',
        	'weight' =>0,
	        'widget' => [
	            'type' => 'autocomplete',
	            'position' => 'sidebar',
	            'autocomplete_callback' => "\\MediaWiki\\Extension\\FennecAdvancedSearch\\Utils::categoryAutocomplete",
	        ],
	    ];
	}
	static public function tryGetNSReplace( ){
		global $wgContLang;
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$manualNamespaces = $conf->get('FennecAdvancedSearchNSReplace');

		foreach ($manualNamespaces as &$manualNamespace) {
			if( !isset( $manualNamespace['value'] ) ){
				$manualNamespace['value'] = $manualNamespace['ns'];
			}
		}
		return $manualNamespaces && count($manualNamespaces) ? $manualNamespaces : NULL;
	}
	static public function getDefinedNamespaces( ){
		$included = self::tryGetNSReplace();
		return $included && count($included) ? $included : array_values( self::getNamspacesDefaultWithOverrides() );
	}
	static public function namespacesExtract( &$params ){
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$topOrSide = $conf->get('FennecAdvancedSearchNSTopOrSide');
		$params['namespaces'] = [
			'label' => '',//wfMessage('fennecadvancedsearch-namespace-label')->text(),
        	'field' => 'namespaces',
        	'withoutLabels' => 1,
	        'widget' => [
	            'type' => 'checkboxes',
	            'position' => $topOrSide,
	            'options' => self::getDefinedNamespaces(),
	        ],
	    ];

		
	}
	static public function getNamspacesDefaultWithOverrides( ){
		global $wgContLang;
		$namespaceIds = $wgContLang->getNamespaceIds();
		//die(print_r($namespaceIds));
		return self::namespacesProccess( $namespaceIds );
	}
	static public function namespacesProccess( $namespaces ){
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$includeTalkPagesType = $conf->get('FennecAdvancedSearchNSIncludeTalkPagesType');
		$showDefault = $conf->get('FennecAdvancedSearchNSDefaultPosition');
		$returnedNamespaces = [];
		foreach ($namespaces as $nsName => $namespaceId) {
			
			$show = $showDefault;
			if( ( ( (integer) $namespaceId % 2) ) || ! is_numeric($namespaceId) ){
				$show = $includeTalkPagesType;
			}
			else if( $namespaceId < 0 ){
				$show = 'advanced';
			}
			$returnedNamespaces[$namespaceId] = [
				'label' => $nsName ? preg_replace('/_/',' ', $nsName) : wfMessage('fennecadvancedsearch-main-namesapce')->text(),
				'value' => $namespaceId,
				'show' => $show,
			];
		}
		$NSOverride = $conf->get('FennecAdvancedSearchNSOverride');
		$weightCount = 1;
		foreach ($NSOverride as $NSData) {
			$NSKey = $NSData['ns'];
			foreach( ['show', 'defaultChecked', 'label','weight'] as $key){
				if( isset( $NSData[ $key ] ) ){
					$returnedNamespaces[ $NSKey ][ $key ] = $NSData[ $key ];
				}
			}
			if(!isset($returnedNamespaces[ $NSKey ]['weight'])){
				$returnedNamespaces[ $NSKey ]['weight'] = $weightCount;
				$weightCount++;
			}
		}
		foreach ($returnedNamespaces as &$ns) {
			if(!isset($ns['weight'])){
				$ns['weight'] = $weightCount;
			}
		}
		usort($returnedNamespaces, function( $itemA, $itemB){
			return $itemA['weight'] < $itemB['weight'] ? -1 : ( $itemA['weight'] === $itemB['weight'] ?0 :1);
		});
		//die(print_r($returnedNamespaces));
		return $returnedNamespaces;
	}
/**
	 * Search index fields hook handler
	 * Adds our stuff to CirrusSearch/Elasticsearch schema
	 *
	 * @param array $fields
	 * @param SearchEngine $engine
	 */
	public static function onSearchIndexFields( array &$fields, SearchEngine $engine ) {
		
		if ( $engine instanceof \CirrusSearch ) {
			/**
			 * @var \CirrusSearch $engine
			 */
			$params = Utils::getSearchParams();
			foreach ($params as $param) {
				if( Utils::isCargoField($param['field']) ){
					$keyForCirrus = Utils::replaceCargoFieldToElasticField( $param['field']);
					$builder = new CirrusSearchIndexFieldFactory($engine->getConfig());

					$fields[$keyForCirrus] = Utils::isNumericField($param) ? $builder->newLongField($keyForCirrus) : $builder->newStringField($keyForCirrus);
				}
			}
			//$fields['tryToText'] = CoordinatesIndexField::build( 'coordinates', $engine->getConfig(), $engine );
		} 
	}

	/**
	 * SearchDataForIndex hook handler
	 *
	 * @param array[] $fields
	 * @param ContentHandler $contentHandler
	 * @param WikiPage $page
	 * @param ParserOutput $parserOutput
	 * @param SearchEngine $searchEngine
	 */
	public static function onSearchDataForIndex(
		array &$fields,
		ContentHandler $contentHandler,
		WikiPage $page,
		ParserOutput $parserOutput,
		SearchEngine $searchEngine
	) {
		
		$params = Utils::getSearchParams();
		$vals = ApiSearch::getResultsAdditionalFieldsFromTitles( [$page->getTitle()->getPrefixedText()],[[]]);
		$vals = array_pop( $vals );
		
		foreach ($params as $param) {
			if( Utils::isCargoField($param['field']) ){
				$keyForCirrus = Utils::replaceCargoFieldToElasticField( $param['field']);
				$fieldName = $param['field'];
				$fields[ $keyForCirrus ] = isset($vals[ $fieldName ]) ? $vals[$fieldName ] : '';
			}
		}

	}
	public static function onCirrusSearchMappingConfig( array &$config, MappingConfigBuilder $builder ) { 
		
	}
	/**
	 * Add cargo search config
	 * @param SearchConfig $config
	 * @param array $features
	 */
	public static function onCirrusSearchAddQueryFeatures( SearchConfig $config, array &$features ) {
		$features[] = new InCargoFeature();
	}
	static public function onFennecAdvancedSearchParams( &$params ){
		$params['search'] = [
			'label' => '',// wfMessage('fennecadvancedsearch-search-label')->text(),
        	'field' => 'search',
        	'withoutLabels' => 1,
	        'widget' => [
	            'type' => 'autocomplete',
	            'position' => 'topbar',
	            'placeholder' => wfMessage( "fennecadvancedsearch-search-placeholder" ),
	        ],
		];
		
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$defaultParams = $conf->get('FennecAdvancedSearchDefaultParams');
		if( !count( $defaultParams ) ){
			$defaultParams = ['namespaces', 'category'];
		}
		foreach ($defaultParams as $keyParam => $defaultParam) {
			//suppot both keyed array (without settings overriding)
			if(  is_string($defaultParam)  ){
				$pName = $defaultParam;
				$pAdditionalSettings = NULL;
			}
			//and assoiative param, with settings overriding
			else{
				$pName = $keyParam;
				$pAdditionalSettings = $defaultParam;
			}
			switch( $pName ){
				case 'namespaces':
				case 'category':
					$methodName = $pName . "Extract";
					self::$methodName( $params );
					if( $pAdditionalSettings ){
						$params[$pName] = array_merge($params[$pName], $pAdditionalSettings);
					}
				default:
					break;
			}
		}
		self::addOptionsToCargoTable( $params );
		
	}
	static public function addOptionsToCargoTable( &$params ){
		foreach ($params as &$param ) {
			if( isset($param['widget']['type']) && in_array($param['widget']['type'] , ['checkboxes','radios','select']) && !isset($param['widget']['options']) && Utils::isCargoField( $param['field'] ) ){
				$options = array_values(Utils::cargoAllRows($param['field']));
				foreach ($options as &$option) {
					$option = [
						'label' => $option,
						'value' => $option,
					];
				}
				if( 'select' === $param['widget']['type'] ){
					array_unshift($options, [
						'label' => wfMessage('fennecadvancedsearch-choose'),
						'value' => '<select>',
					]);
				}
				$param['widget']['options'] = $options;
			}
		}
	}
	static public function onFennecAdvancedSearchResults( &$results ){
		$params = Utils::getSearchParams();
		$imagesKeys = [];
		foreach ($params as $param) {
			if( isset( $param['type']) && 'image' == $param['type']){
				$imagesKeys[] = $param['field'];
			}
		}
		
		foreach ($results as &$result) {
			foreach ($imagesKeys as $imageKey) {
				if(isset($result[$imageKey])){
					$result[$imageKey] = Hooks::fixImageToThumbs( $result[$imageKey]);
				}
			}
		}
		//die();
		//die(print_r($imagesKeys));
	}
	static public function fixImageToThumbs( $file ){
		//die($file);
		
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$wgScriptPath = $conf->get('ScriptPath');
		$wgFennecAdvancedSearchThumbSize = $conf->get('FennecAdvancedSearchThumbSize');
		$dismensions = explode('X', $wgFennecAdvancedSearchThumbSize);
		$fileClass = wfFindFile(\Title::newFromText($file));
		$thumb = $fileClass ? $fileClass->transform( [ 'width' => $dismensions[0], 'height' => $dismensions[1] ] ) : NULL;
		$thumbUrl = NULL;
		if ( $thumb ) {
			$thumbUrl = $thumb->getUrl( );
		}
		return $thumbUrl ? $thumbUrl : $file;
	}

}