$.fn.uiTransform = (function(){
  this.each(function(){
    var $instigator = $(this),
        ui = $instigator.data('ui'),
        defaults = {"accordion" : {"autoHeight" : false, "collapsible" : true, "active" : false}},
        options = $.extend(true, {}, defaults[ui], $instigator.data('ui-options') || {}),
        needs_ui_element = !(ui == 'accordion');
    
    var $ui = (needs_ui_element) ? $('<div id="' + $instigator.attr('id').replace(/_/g,'-') + '-ui-' + ui + '"></div>').insertAfter($instigator) : $instigator;
    
    var hash = window.location.hash || undefined;
    var $menu = (options.menu) ? $(options.menu) : undefined;
    if (hash) {
      var active_index = -1;
      var $search = ($menu) ? $menu : $ui;
      $search.find('a').each(function(index, anchorEl){
        if ($(anchorEl).attr('href') == hash) { active_index = index; return false; }
      });
      if (active_index > -1) { options.active = active_index; }
    }
    
    if ($menu) {
      $menu.click(function(event) {
        var toggle_index = -1;
        var $target = $(event.target);
        if ($target.is("a")) {
          $menu.find('a').each(function(index, anchorEl){
            if ($(anchorEl).attr('href') == $target.attr('href')) {
              toggle_index = index;
              return false;
            };
          });
        }
        if (toggle_index > -1) { $ui.accordion("activate", toggle_index); }
      });
    }

    $ui.accordion(options);
  });
  return this;
});

$(document).ready(function() {
  $('[data-ui=accordion]').uiTransform();
});
