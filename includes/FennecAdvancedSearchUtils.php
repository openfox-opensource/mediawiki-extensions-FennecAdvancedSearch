<?php

namespace MediaWiki\Extension\FennecAdvancedSearch; 

class Utils{
	static public function categoryAutocomplete( $term ){
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$categoryInclude = $conf->get('FennecAdvancedSearchCategoryInclude');
		return  $categoryInclude ? self::preccessDefaultCategories( $categoryInclude, $term ) : self::getCategiresFromDb($term);
	}
	static public function cargoAllRows( $fieldName ){
		$dbrCargo = \CargoUtils::getDB();
		$splitted = preg_split('/:/', $fieldName);
		$tableName = $splitted[0];
		$columnName = $splitted[1];
		$subTable = Utils::replaceCargoFieldToElasticField($fieldName);
		$tables = Utils::getSubtablesOfFields( $tableName );
		if( in_array($subTable, $tables) ){
			
			//read subtitle
			$res = $dbrCargo->select($subTable,[
				'DISTINCT(_value) as val'
			]);
		}
		else{
			$res = $dbrCargo->select($tableName,[
				'DISTINCT(' . $columnName . ') as val'
			]);
		}
		$results = [];
		
		while ( $row = $dbrCargo->fetchObject( $res ) ) {
			$results[$row->val] = $row->val;
		}
		return $results;
	}
	static public function cargoAutocomplete( $term, $fieldName ){
		$results = self::cargoAllRows( $fieldName);
		$results = array_filter( $results, function( $val ) use ($term){
			return  strpos($val, $term) === 0;
		});
		return $results;
	}
	static public function preccessDefaultCategories( $cats, $term = FALSE ){
		$newCats = [];
		foreach ($cats as $cat) {
				$catTitle = \Title::newFromText($cat);
				if($catTitle){
					$readableTitle = $catTitle->getText();
					if( !$term || 0 === strpos($term, $readableTitle )){
						$newCats[$catTitle->getDbKey()] = $readableTitle;
					}
				}
			}
		return $newCats;	
	}
	// static public function onBeforePageDisplay(\OutputPage $out, \Skin $skin ){
	// 	$title = $out->getTitle();
	// 	//FennecAdvancedSearchApiSearch::getResultsAdditionalFieldsFromTitles([$title]);
	// 	// $b = new InCargoFeature();
	// 	// print_r($b->_getKeywords());
	// }

	static public function getCategiresFromDb( $term ){
		$dbr = wfGetDB( DB_REPLICA );
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$categoryExclude = $conf->get('FennecAdvancedSearchCategoryExclude');
		foreach ($categoryExclude as &$cat) {
			$catTitle = \Title::newFromText($cat);
			if($catTitle){
				$cat = $catTitle->getDbKey();
			}
		}
		//die( print_r(get_class($dbr)  ));
		//die('page_title IN (' . $dbr->makeList( $results[1] ) . ')');
		$res = $dbr->select(
			array( 'category' ),
			array( 'cat_title', 'cat_id' ),
			array(
				"cat_title LIKE " . $dbr->addQuotes( $term . '%') ,
				'cat_pages > 0',
			),
			__METHOD__
		);
		$categoriesToReturn = [];
		while ( $row = $dbr->fetchObject( $res ) ) {
			if(in_array($row->cat_title, $categoryExclude)){
				continue;
			}
			$categoriesToReturn[$row->cat_title ] = preg_replace("/_/", " ", $row->cat_title );
			
		}
		return $categoriesToReturn;
	}
	public static function getSearchParamsFiltered() {
		$params = self::getSearchParams();
		foreach ($params as &$param) {
			if( isset($param['widget']['autocomplete_callback'])){
				unset($param['widget']['autocomplete_callback']);
			}
		}
				//die(print_r($params));
		return $params;
	}
	public static function getSubtablesOfFields( $tableName ) {
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$dbr = wfGetDB( DB_REPLICA );
		$dbrCargo = \CargoUtils::getDB();
		$res = $dbr->select( 'cargo_tables', array( 'field_tables' ),
			array( 'main_table' => $tableName ) );
		$row = $dbr->fetchRow( $res );
		$tables = unserialize($row[0]);
		$allDefinedTables = $dbrCargo->query( 'show tables' );
		$tablesFromShow = [];
		$cargoPrefix = $conf->get('DBprefix') . 'cargo__';
		while ( $table = $dbr->fetchObject( $allDefinedTables ) ) {
			$tableAsArr = ( array) $table;
			$tablesFromShow[] = preg_replace('/' . $cargoPrefix .'/','',array_pop($tableAsArr));
		}
		return array_intersect($tables, $tablesFromShow);
//		return $tables;
	}
	public static function getSearchParams() {
		$conf = \MediaWiki\MediaWikiServices::getInstance()->getMainConfig();
		$params = $conf->get('FennecAdvancedSearchParams');
		$newKeyedArray = [];
		foreach ($params as $param) {
			$newKeyedArray[$param['field']] = $param;
		}
		\Hooks::run( 'FennecAdvancedSearchParams', [ &$newKeyedArray ] );
		//die(print_r($params,1));
		return self::fixSearchParams( $newKeyedArray );
	}
	public static function fixSearchParams( $newKeyedArray ) {
		foreach ($newKeyedArray as &$param) {
			if( isset( $param['widget']['options'] ) ){
				foreach ($param['widget']['options'] as &$option ) {
					if( is_string($option) ){
						$option = [
							'value' => $option,
							'label' => $option,
						];
					}
				}
			}
		}
		return $newKeyedArray;
	}
	public static function getSearchBinds( $params ) {
		$binds = [];
		foreach ($params as $param) {
			if(isset( $param['bind_to'])){
				$bind = [
					'fields' => [$param['field']]
				];
				if('before' == $param['bind_to']['my_label_is']){
					array_push($bind['fields'], $param['bind_to']['field'] );
				}
				else{
					array_unshift($bind['fields'], $param['bind_to']['field'] );
				}
				$binds[] = $bind;
			}
		}
		return $binds;
	}
	public static function getFeatureSearchStr( $fieldName, $fieldValue ) {
		$fieldValue = is_array($fieldValue) ? implode("|", $fieldValue) : $fieldValue;
		$fieldValue = '"' . addcslashes($fieldValue,'"') .  '"';
		return ' ' . Utils::getFeatureKey( $fieldName) . ':' . $fieldValue;
	}
	public static function replaceCargoFieldToElasticField( $field ) {
		return preg_replace('/:/', '__',$field);
	}
	public static function replaceElasticFieldToCargoField( $field ) {
		return preg_replace('/__/', ':',$field);
	}
	public static function isSearchableField( $key ) {
		return 'category' == $key || self::isCargoField( $key );
	}
	public static function isCargoField( $key ) {
		return strpos($key, ':');
	}
	public static function isNumericField( $param ) {
		$isRange = isset($param['widget']['type']) && 'range' == $param['widget']['type'];
		$isNumber = isset($param['filed_type']) && 'number' == $param['filed_type'];
		return $isRange || $isNumber;
	}
	public static function getFeatureKey( $key ) {
		return 'in' . (self::isCargoField($key) ? '_' : '')  . self::replaceCargoFieldToElasticField($key);
	}
}