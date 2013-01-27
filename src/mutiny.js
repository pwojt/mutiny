var Mutiny = {
  init: function(dataAttr) {
    dataAttr = dataAttr || 'mutiny';
    $('[data-' + dataAttr + ']').mutiny(dataAttr);
  }
};

$.fn.mutiny = function(dataAttr){
  var mutiny_call = function($instigator, name, instance_options){
    if(Mutiny[name] === undefined) {
      throw '"' + name + '" not found';
    }

    var options = $.extend({}, Mutiny[name].defaults);
    if(typeof instance_options === 'string') {
      options[Mutiny[name].string_arg] = instance_options;
    } else {
      $.extend(options, instance_options);
    }
    Mutiny[name].init($instigator, options);
  };

  dataAttr = dataAttr || 'mutiny';
  this.each(function(i, e) {
    var $e = $(e);
    var data = $e.data(dataAttr);
    switch(typeof data) {
      case 'string':
        /* data-mutiny='slider' */
        mutiny_call($e, data, {});
        break;
      case 'object':
        /* data-mutiny='{"slider": {"some": "options"}}' */
        for(var directive in data) {
          mutiny_call($e, directive, data[directive]);
        }
        break;
      default:
        throw 'Unsupported data';
    }
  });
  return this;
};