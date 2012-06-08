<?php

class ForceDirectedGraph extends Visualization {

  function __construct($data) {
    $links = ($data['links']) ? $data['links'] : array();
    $nodes = ($data['nodes']) ? $data['nodes'] : array();

    if (isset($data['config']['container_id']))
      $this->container_id = $data['config']['container_id'];

    $this->templateArgs = $data['config'];
    $this->js_add_variable('links', $links);
    $this->js_add_variable('nodes', $nodes);

    $this->templateFile = drupal_get_path('module','d3') . '/templates/ForceDirectedGraph.tpl.js';
  }

}
