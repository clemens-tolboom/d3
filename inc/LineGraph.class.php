<?php

class LineGraph extends Visualization {


  function __construct($data) {
    $this->legend = $data['legend'];	
    $this->rows = $data['rows'];	

    $this->js_add_variable('key', $this->legend);	
    $this->js_add_variable('rows', $this->rows);

    $this->templateFile = drupal_get_path('module', 'd3') . '/templates/LineGraph.tpl.js';
  }	


}
