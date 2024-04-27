
# Notes

## advanced custome fields
 - acf custome fields are assigned to acf option page
 - to create custom option page use function acf_add_option_page
 - add show_in_graphql to acf_add_option_page

## wp
### debub
- add the code below to wp-config.php located in public/wp-content inside project folder
```
define('WP_DEBUG', true);
define('WP_DEBUG_DISPLAY', false);
define('WP_DEBUG_LOG', true);
```
- the log file debug.log can be found in public/wp-content


## getStaticProps
 - The context passed to getStaticProps is an object that contains information about the page being rendered,such as the page path and query parameters.

