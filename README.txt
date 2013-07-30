Welcome to the Drupal D3 module!

USING THE API
=============
- Download d3 library and install it into your libraries module.
  Latest version can be found at https://github.com/mbostock/d3/wiki
  To download the library using the provided example makefile and drush, use:
  drush make --no-core d3.make.example
  If you're creating a distribution, simply copy the example makefile
  into your own makefile.
- Enable d3 module and dependencies
- If you're not familiar with the API, see the d3_examples module
  for various code examples of the d3 API.

CUSTOM LIBRARY
==============
Instructions on how to create a new custom d3 library:
- In your sites libraries folder (e.g. sites/all/libraries) create a new
  directory for your library with the prefix d3. (e.g. d3.mylibrary).
- Create your .info file.
  @see libraries.api.php for information on parameters.
- Use javascript enclosure around your js code, and extend the global Drupal.d3
  variable using your unique library name. E.g. 
  @code
    (function($) {

      Drupal.d3.mylibraryname = function (select, settings) {
        // javascript code
      }
    })(jQuery);
  @endcode
- In your d3_draw API call, set 'type' => 'libraryname'.
- Any variable you include in the d3_draw() arguments, will be included in
  the settings variable. For example:
  @code
    $args = array(
      'type' => 'myviz',
      'id' => 'testvis',
      'foo' => 'bar',
    );
    return d3_draw($args);
  @endcode

  Inside your js function, 'foo' will be available as settings.foo.

GRAPHAPI
========
The d3 module comes with support for the graphapi module.
http://drupal.org/project/graphapi

Instructions on how to use d3 with graphapi:

- Enable graphapi, and set d3 as the engine in the api call. 
- An example of a graphapi call, using d3, is also available in
  the d3_examples module.

VIEWS
=====
If you would like to use the d3 modules with views, you can use the
views_charts module http://drupal.org/project/views_charts

Download and install views_charts and its parent charts_graphs and follow
the instructions for views_charts.

FACETAPI
========
You can visualize your facets as d3 graphs using facetapi widgets using
http://drupal.org/project/facetapi_graphs 

