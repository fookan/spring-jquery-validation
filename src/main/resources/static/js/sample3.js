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
        range: [0, 10],
      },
      end: {
        require_from_group: [1, ".required-group"],
        requiredAtLeastOne: [['#start', '#end'], ['#key']],
        range: [0, 10],
      },
      key: {
        require_from_group: [1, ".required-group"],
        requiredAtLeastOne: [['#key'], ['#start', '#end']],
        range: [10, 20],
      },
    },
    // エラーメッセージの出力を１つにするグループ化
    groups: {
      customerNum: ['start', 'end']
    },
    // formの各inputのnameに対してのバリデーションエラーメッセージ
    messages: {
      start: {
        require_from_group: 'start/end/keyのいずれか1つは入力してください',
        requiredAtLeastOne: 'start/endとkeyは同時に入力できません',
        rangeCustomerNum: 'startはendよりも小さくしてください',
        range: 'customerNumは0から10だよ',
      },
      end: {
        require_from_group: 'start/end/keyのいずれか1つは入力してください',
        requiredAtLeastOne: 'start/endとkeyは同時に入力できません',
        range: 'customerNumは0から10だよ',
      },
      key: {
        require_from_group: '',
        requiredAtLeastOne: '',
        range: 'keyは10から20にしてね',
      }
    },
    errorLabelContainer: $('#errorMessage'),
  });

  $('#submitBtn').click(() => {
    console.log('CLICK!');
    $testFrom.valid();
  });
});