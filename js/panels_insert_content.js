(function ($) {
  Drupal.behaviors.columnNavigation = jQuery.fn.columnNavigation;

  Drupal.behaviors.listFilter = function (header, list) {
    // create and add the filter form to the header
    var form = $("<form>").attr({"class":"filterform","action":"#"})
    input = $("<input>").attr({"class":"filterinput","type":"text", "placeholder":"Enter filter query"})
    $(form).append(input).appendTo(header);

    var wto;
    $(input).change( function () {
      clearTimeout(wto);
      $(input).addClass("loading");

      wto = setTimeout(function() {
        var filter = $(input).val();
        if (filter) {
          $("ul.root>li").hide();
          $("div#myTree_panels_insert_content").find(".content-type-button a:contains(" + filter + ")").parents("ul.root>li").show();

          $(list).find(".content-type-button a:not(:contains(" + filter + "))").parents("ul.a li").hide();
          $(list).find(".content-type-button a:contains(" + filter + ")").parents("ul.a li").show();
        } else {
          $(list).find("li").show();
        }
        $(input).removeClass("loading");
      }, 1000);
    }).keyup( function() {
      // fire the above change event after every letter
      $(this).change();
    });
  }

  Drupal.behaviors.panels_insert_content = {

      attach: function(context, settings) {
        jQuery.fn.columnNavigation = Drupal.behaviors.columnNavigation;
        
        $("div#myTree_panels_insert_content").columnNavigation({
          // containerBackgroundColor  : "rgb(255,255,255)",
          // columnFontFamily      : "Arial,sans-serif",
          containerWidth:"100%",
          containerHeight: "90%",
          columnWidth: 400,
          // columnFontSize:"1.2em",
          // columnItemPadding:"1.2em",
          // columnSelectBackgroundColor:"rgb(0,0,255)",
          columnScrollVelocity    : 400
        });
        Drupal.behaviors.listFilter($("#listFilter"),$("div#myTree_panels_insert_content"));
      }
    }
})(jQuery);
