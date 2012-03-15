<?php

class Visualization {

	public $type = 'line';
	public $container_id = 'visualization';
	public $legend = array();
	public $rows = array();

	private $js = '';

	function __construct($data) {
		$this->legend = $data['legend'];	
		$this->rows = $data['rows'];	
	}

	private function container() {
		return '<div id="'.$this->container_id.'"></div>';
	}

	private function script($js) {
		return '<script type="text/javascript">'.$js.'</script>';
	}

	private function js_add_variable($name,$value) {
		$value = drupal_json_encode($value);
		$this->js_build("var $name = $value;");
	}
	private function js_build($js) {
		$this->js .= "$js\r\n\t";
	}
	private function js_load_template($path) {
		
	}
	private function js_process_template($variables = array()) {
		$template_file = theme_render_template('/sites/all/modules/custom/d3/templates/line.tpl.js', $variables);
		return $template_file;
	}
	public function render() {

		$output = $this->container();
		
		$this->js_add_variable('key', $this->legend);	
		$this->js_add_variable('rows', $this->rows);

		$this->js_build($this->js_process_template());
		return $output . $this->script($this->js);
	}
}
