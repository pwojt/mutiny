describe('Mutiny.widgets.jqToggler', function() {
  beforeEach(function(){
    loadFixtures('jq/toggler.html');
    Mutiny.init();
  });

  function expectClass($e, directives) {
    $.each(directives.split(' '), function(i, directive) {
      switch(directive[0]) {
        case '+':
          expect($e).toHaveClass(directive.substring(1));
          break;
        case '-':
          expect($e).not.toHaveClass(directive.substring(1));
          break;
        default:
          throw "expectClass directive not supported: '"+directive[0]+"'";
      }
    });
  }

  it('triggers basic toggler', function() {
    expectClass($('#basic-toggler [data-mutiny-jq-toggler]'), '+inactive -active');
    $('#basic-toggler [data-mutiny-jq-toggler]').click();
    expectClass($('#basic-toggler [data-mutiny-jq-toggler]'), '+active -inactive');
    $('#basic-toggler [data-mutiny-jq-toggler]').click();
    expectClass($('#basic-toggler [data-mutiny-jq-toggler]'), '+inactive -active');
  });

  it('triggers Targeted Class toggler', function() {
    expectClass($('#targeted-class .target'), '+first -last');
    $('#targeted-class [data-mutiny-jq-toggler]').click();
    expectClass($('#targeted-class .target'), '+last -first');
    $('#targeted-class [data-mutiny-jq-toggler]').click();
    expectClass($('#targeted-class .target'), '+first -last');
  });

  it('triggers Class Name toggler', function() {
    expectClass($('#class-name [data-mutiny-jq-toggler]'), '+start -end');
    $('#class-name [data-mutiny-jq-toggler]').click();
    expectClass($('#class-name [data-mutiny-jq-toggler]'), '+end -start');
    $('#class-name [data-mutiny-jq-toggler]').click();
    expectClass($('#class-name [data-mutiny-jq-toggler]'), '+start -end');
  });

  it('triggers Style Changes toggler', function() {
    expect($('#style-changes [data-mutiny-jq-toggler]')).not.toHaveCss({'font-style':'italic'});
    $('#style-changes [data-mutiny-jq-toggler]').click();
    expect($('#style-changes [data-mutiny-jq-toggler]')).toHaveCss({'font-style':'italic'});
    $('#style-changes [data-mutiny-jq-toggler]').click();
    expect($('#style-changes [data-mutiny-jq-toggler]')).not.toHaveCss({'font-style':'italic'});
  });

  it('triggers Checkbox toggler', function() {
    expectClass($('#checkbox [data-mutiny-jq-toggler]'), '+inactive -active');
    $('#checkbox [data-mutiny-jq-toggler]').click();
    expectClass($('#checkbox [data-mutiny-jq-toggler]'), '+active -inactive');
  });

  it('triggers Radio Button toggler', function() {
    expectClass($('#radio-buttons [data-mutiny-jq-toggler]'), '+inactive -active');
    $('#radio-buttons [data-mutiny-jq-toggler]').click();
    expectClass($('#radio-buttons [data-mutiny-jq-toggler]'), '+active -inactive');
  });
});
