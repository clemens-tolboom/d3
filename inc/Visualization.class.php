<?php

class Visualization {

  public $templateFile = NULL;
  public $templateArgs = array();
  public $container_id = 'visualization';
  public $type;
  public $legend = array();
  public $rows = array();

  private $js = '';

  function __construct() {
  }

  public function container() {
    return '<div id="'.$this->container_id.'"></div>';
  }

  public function loadTemplate() {
    $this->templateArgs['container_id'] = $this->container_id;
    $this->js_build(theme_render_template($this->templateFile, $this->templateArgs));
  }

  public function script($js) {
    return '<script type="text/javascript">'.$js.'</script>';
  }

  public function js_add_variable($name,$value) {
    $value = drupal_json_encode($value);
    $this->js_build("var $name = $value;");
  }
  public function js_build($js) {
    $this->js .= "$js\r\n\t";
  }

  public function render() {

    if($this->templateFile)
      $this->js_build($this->loadTemplate());

    // render the container that was set and ALL of the javascript that has been accumulated	
    return $this->container() . $this->script($this->js);
  }
}

