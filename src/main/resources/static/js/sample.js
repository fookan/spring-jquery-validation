$(function () {
  console.log('OK');

  let $testFrom = $('#testForm');

  $.validator.addMethod("requiredAtLeastOne", function (value, element, param) {
    console.log('param', param);

    // validtorを自分にセット
    let validator = $.extend({}, this);

    // $(element).valid();
    let targetList = $(param.join(','));

    // 値が入力されているか確認
    let valueIsEmpty = (value == null || value === '');
    let targetIsEmpty = true;
    for (let i = 0; i < targetList.length; i += 1) {
      let value = validator.elementValue(targetList[i]);
      if (value != null && value != '') {
        targetIsEmpty = false;
        break;
      }
    }
    // 両方入力されていたらエラー
    let isValid = !(valueIsEmpty && targetIsEmpty);

    // requiredAtLeastOneがセットされている項目をバリデーションする
    // バリデーション実行時にこの処理が二重で走らない様にdataで制御する
    if (!$(element).data('checkRequiredAtLeastOne')) {
      $(element).data('checkRequiredAtLeastOne', true);
      targetList.data('checkRequiredAtLeastOne', true);
      for (let i = 0; i < targetList.length; i += 1) {
        validator.element(targetList[i]);
      }
      $(element).data('checkRequiredAtLeastOne', false);
      targetList.data('checkRequiredAtLeastOne', false);
    }

    return isValid;

  }, 'at least one required');

  // 両方入力されている場合は、false
  $.validator.addMethod("notEnterBoth", function (value, element, param) {
    // 自分と同じもの
    let ownGroupIsEmptyheck = (value === null || value === '');
    if (ownGroupIsEmptyheck) {
      ownGroupIsEmptyheck = groupIsEmpty(param[0]);
    }

    const anotherGroupIsEmpty = groupIsEmpty(param[1]);

    // どちらも入力されている
    if (!ownGroupIsEmptyheck && !anotherGroupIsEmpty) {
      return false;
    }

    return true;
  }, 'own error');


  $('#testForm').validate({
    // formの各inputのnameに対してのバリデーションルール
    rules: {
      number: {
        required: true,
        maxlength: 3
      },
      code: {
        digits: true,
        range: [10, 20],
        // require_from_group: [1, ".required-group"]
        requiredAtLeastOne: [[], ['start', 'end']]
      },
      name: {
        required: true,
        maxlength: 2
      },
      start: {
        digits: true,
        range: [0, 99],
        // require_from_group: [1, ".required-group"],
        requiredAtLeastOne: [['end'], ['code']],
        lessThan: '[name=end]',
        // contineuRegRefRule: [["#end"], ["#code"]]
      },
      end: {
        digits: true,
        range: [0, 99],
        // require_from_group: [1, ".required-group"]
        requiredAtLeastOne: [['start'], ['code']],
        // contineuRegRefRule: [["#start"], ["#code"]]
      },
    },
    // エラーメッセージの出力を１つにするグループ化
    groups: {
      customerNum: ['start', 'end']
    },
    // formの各inputのnameに対してのバリデーションエラーメッセージ
    messages: {
      number: {
        required: '※入力してください'
      },
      code: {
        digits: '整数で入力してください',
        range: '10以上20以下で入力してください',
        require_from_group: 'code/start/endのどれか１つを入力してください:CODE'
      },
      name: {
        required: '※入力してください',
        maxlength: '2文字以内で入力してください'
      },
      start: {
        digits: '整数で入力してください',
        range: '20桁以内で入力してください',
        require_from_group: 'code/start/endのどれか１つを入力してください:START',
        lessThan: 'startはendよりも小さい値にしてください'

      },
      end: {
        digits: '整数で入力してください',
        range: '20桁以内で入力してください',
        require_from_group: 'code/start/endのどれか１つを入力してください:END'
      }
    },
    // // バリデーションエラー時の処理
    // errorPlacement: function(error, element){
    //   const length = $('#errorMessage').children().length;
    //   console.log('ERROR ID = ' + error.attr('id'));
    //   // 削除の前に改行があるか
    //   let $target = $('#' + error.attr('id'));
    //   // console.log($target.next().tagName);
    //   // console.log($target.next().text());
    //   // let $targetBr = $target.next('br');
    //   // if ($targetBr) {
    //   //   $targetBr.remove();
    //   // }
    //   $target.remove();
    //   // $('#' + error.attr('id')).remove();
    //   // if (length > 0) {
    //   //   $('#errorMessage').append('<br>');
    //   // }
    //   error.appendTo($('#errorMessage'));
    // },
    // // バリデーションエラーが解消された時の処理
    // success: function(error, element) {
    //   console.log('success ' + error.attr('id'));
    //         // 削除の前に改行があるか
    //   let $target = $('#' + error.attr('id'));
    //   // let $targetBr = $target.next('<br>');
    //   // if ($targetBr) {
    //   //   $targetBr.remove();
    //   // }
    //   $target.remove();
    //   // $('#' + error.attr('id')).remove();
    // },
    errorLabelContainer: $('#errorMessage'),
    // // バリデーションエラーを表示する時のタグ
    // errorElement: "p",
    // // バリデーションエラーのクラス
    // errorClass: "is-error",
  });

  $('#submitBtn').click(() => {
    console.log('CLICK!');
    $testFrom.valid();
  });
});