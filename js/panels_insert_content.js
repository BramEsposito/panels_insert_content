(function ($) {
  Drupal.behaviors.columnNavigation = jQuery.fn.columnNavigation;
  Drupal.behaviors.panels_insert_content = {

      attach: function(context, settings) {
        jQuery.fn.columnNavigation = Drupal.behaviors.columnNavigation;
        $("div#myTree_panels_insert_content").columnNavigation({
          containerBackgroundColor  : "rgb(255,255,255)",
          // columnFontFamily      : "Arial,sans-serif",
          containerWidth:"100%",
          // columnFontSize:"1.2em",
          // columnItemPadding:"1.2em",
          columnSelectBackgroundColor:"rgb(0,0,255)",
          columnScrollVelocity    : 400
        });
      }
    }
})(jQuery);
