$(function () {
  console.log('OK');

  $.validator.addMethod("requireGroup", function (value, element, options) {
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
        // thisをvalidateしている
        validator.element(this);
      });
      $fields.data("being_validated", false);
    }
    return isValid;
  }, $.validator.format("Please fill at least {0} of these fields."));

  let $testFrom = $('#testForm');
  $('#testForm').validate({
    // formの各inputのnameに対してのバリデーションルール
    rules: {
      start: {
        requireGroup: [1, ".required-group"],
      },
      end: {
        requireGroup: [1, ".required-group"]
      },
    },
    // エラーメッセージの出力を１つにするグループ化
    groups: {
      customerNum: ['start', 'end']
    },
    // formの各inputのnameに対してのバリデーションエラーメッセージ
    messages: {
      start: {
        requireGroup: 'start/endのどれか１つを入力してください:START',
      },
      end: {
        require_from_group: 'start/endのどれか１つを入力してください:END'
      }
    },
    errorLabelContainer: $('#errorMessage'),
  });

  $('#submitBtn').click(() => {
    console.log('CLICK!');
    $testFrom.valid();
  });
});