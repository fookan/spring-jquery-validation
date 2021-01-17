$(function () {
  let groupCount = 0;

  $.validator.addMethod("requireGroup", function (value, element, options) {

    if (!$(element).data("being_validated")) {
      groupCount += 1;
      console.log(`!! START GROUP !! [${element.id}]`)
    }
    console.log(` (${groupCount}) >> group >> id[${element.id}] : data = ${$(element).data('being_validated')}`);

    var $fields = $(options[1], element.form),
      $fieldsFirst = $fields.eq(0),
      validator = $fieldsFirst.data("valid_req_grp") ? $fieldsFirst.data("valid_req_grp") : $.extend({}, this),
      isValid = $fields.filter(function () {
        // thisに設定されている値を取り出す。thisのタイプ（inputやselectなど）によって取得方法が違うのを補完してくれている。
        return validator.elementValue(this);
      }).length >= options[0];

    // Store the cloned validator for future validation
    $fieldsFirst.data("valid_req_grp", validator);

    // If element isn't being validated, run each require_from_group field's validation rules
    if (!$(element).data("being_validated")) {
      $fields.data("being_validated", true);
      $fields.each(function () {
        console.log(` (${groupCount})   # group >> target:[${this.id}]`)
        // thisをvalidateしている
        validator.element(this);
      });
      $fields.data("being_validated", false);
    }
    return isValid;
  }, $.validator.format("Please fill at least {0} of these fields."));
});