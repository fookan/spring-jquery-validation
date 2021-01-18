$(function () {

  function groupIsNotEmpty(group) {
    for (let i = 0; i < group.length; i += 1 ) {
      if (group[i].value != null && group[i].value != '') {
        return true;
      }
    }

    return false;

/*
    let groupIsNotEmpty = false;
    group.each(function() {
      if (this.value != null && this.value != '') {
        groupIsNotEmpty = true;
        return false;
      }
    });

    return groupIsNotEmpty;
*/
  }

  $.validator.addMethod("requiredAtLeastOne", function (value, element, param) {

    // debug
    console.log(`CHECK id[${element.id}] : start`);

    // 検証対象にこのメソッドが設定されているか
    // これやるとうまくいかない。optionalがundefinedになる
    if (this.optional(element)) {
        console.log(`CHECK id[${element.id}]    this is not element [${this.optional(element)}]`);
        return true;
    }

    // validtorを自分にセット
    let validator = $.extend({}, this);

    let ownGroupList = $(param[0].join(','));
    let otherGroupList = $(param[1].join(','));

    // 値が入力されているか確認
    let ownGroupIsNotEmpty = groupIsNotEmpty(ownGroupList);
    let otherGroupIsNotEmpty = groupIsNotEmpty(otherGroupList);

    // 両方入力されていたらエラー
    let isValid = !(ownGroupIsNotEmpty && otherGroupIsNotEmpty);

    console.log(`CHECK id[${element.id}] : valid = ${isValid}`);
    return isValid;

  }, 'at least one required');

  // 数字同時のみ比較する。数字以外はtrueとなる
  // このバリデーションをつける項目は、この項目の前にdigitsとfromを行う必要がある
  $.validator.addMethod("rangeCustomerNum", function (value, element, param) {

    console.log('RangeCustomerNum');

    // うまくいかない
    // if(this.optional(element)) {
    //   return true;
    // }

    // 値があるか
    const target = $( param );
    if (target == null || target.val() == null || target.val() === '') {
      return true;
    }

    // 数字があるか
    let pattern = /^\d*$/;
    if (!pattern.test(target.val())) {
      return true;
    }

    return Number(value) <= Number(target.val());
  }, 'rage customer num');
});