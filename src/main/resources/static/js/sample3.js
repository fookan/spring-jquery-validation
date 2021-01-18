$(function () {
  console.log('OK');

  let $testFrom = $('#testForm');

  $('#testForm').validate({
    // formの各inputのnameに対してのバリデーションルール
    rules: {
      start: {
        require_from_group: [1, ".required-group"],
        requiredAtLeastOne: [['#start', '#end'], ['#key']],
        rangeCustomerNum: '#end',
        digits: true,
        maxlength: 5,
      },
      end: {
        require_from_group: [1, ".required-group"],
        requiredAtLeastOne: [['#start', '#end'], ['#key']],
        digits: true,
        maxlength: 5,
      },
      key: {
        require_from_group: [1, ".required-group"],
        requiredAtLeastOne: [['#key'], ['#start', '#end']],
        range: [10, 20],
      },
    },
    // エラーメッセージの出力を１つにするグループ化
    // groups: {
    //   customerNum: ['start', 'end']
    // },
    // formの各inputのnameに対してのバリデーションエラーメッセージ
    messages: {
      start: {
        require_from_group: 'start/end/keyのいずれか1つは入力してください',
        requiredAtLeastOne: 'start/endとkeyは同時に入力できません',
        rangeCustomerNum: 'startはendよりも小さくしてください',
        digits: '整数で入力してね',
        maxlength: 'START:5桁だよ',
      },
      end: {
        require_from_group: '',
        requiredAtLeastOne: 'start/endとkeyは同時に入力できません',
        digits: '整数で入力してね',
        maxlength: 'END:5桁だよ',
      },
      key: {
        require_from_group: '',
        requiredAtLeastOne: '',
        range: 'keyは10から20にしてね',
      }
    },
    // errorLabelContainerを設定していると、errorPlacementの処理は呼ばれないぽい
    // errorLabelContainer: $('#errorMessage'),
    errorPlacement: function (error, element) {
      console.log(`**** ERROR >>> ${error.attr('id')} : ${element.attr('id')} : ${error.text()}`);
      if (error.text() == null || error.text() === '') {

      }
      let id = element.attr('id');
      $('#' + error.attr('id')).remove();
      // 通知書番号のときは同じメッセージを表示させない // ここがんばる！
      let insert = true;
      if (id === 'start' || id === 'end') {
        $('#errorMessage').children().each(function () {
          console.log(`${$(this).text()} : ${error.text()}`)
          if ($(this).text() === error.text()) {
            insert = false;
            return false;
          }
        });
      }
      // $(element).addClass('mk-test');
      // error.remove($('#errorMessage'));
      if (insert) {
        console.log(`insert >> : ${error.text()}`)
        $(error).appendTo($('#errorMessage'));
      }
    },
    success: function (error) {
      console.log(`**** SUCCESS >>> ${error.attr('id')} : ${error.text()}`);
      // $(element).removeClass('mk-test');
      // $('#' + error.attr('id')).remove();
      // $(error).appendTo($('#errorMessage'));
      // $('#errorMessage').children().remove();
    },
    highlight: function(element, errorClass) {
      console.log(`**** HIGHLIGHT ${$(element).attr('id')}`);
      $(element).addClass('mk-test');
    },
    unhighlight: function(element, errorClass) {
      console.log(`**** UNHIGHLIGHT ${$(element).attr('id')}`);
      $(element).removeClass('mk-test');
    },
    errorClass: 'mk-error',
  });

  $('#submitBtn').click(() => {
    console.log('CLICK!');
    $testFrom.valid();
  });
});