<?php


function template_preprocess_views_view_d3(&$vars) {
  $view    = $vars['view'];
  $options = $view->style_plugin->options;
  $handler = $view->style_plugin;
  $fields  = &$view->field;
  $columns = $handler->sanitize_columns($options['columns'], $fields);

//dsm($vars);
}

