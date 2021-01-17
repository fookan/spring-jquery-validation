$(function () {

  let count = 0;
  function groupIsNotEmpty(group) {
    // for (let i = 0; i < group.length; i += 1) {
    //   //let value = $.validator.elementValue(group[i]);
    //   let value = group[i].value;
    //   if (value != null && value != '') {
    //     return true;
    //   }
    // }
    let groupIsNotEmpty = false;
    group.each(function() {
      if (this.value != null && this.value != '') {
        groupIsNotEmpty = true;
        return false;
      }
    });

    return groupIsNotEmpty;
  }

  $.validator.addMethod("requiredAtLeastOne", function (value, element, param) {

    // debug
    count += 1;
    console.log(`CHECK id[${element.id}] : count = ${count} : start`);

    // 検証対象にこのメソッドが設定されているか
    // これやるとうまくいかない。optionalがundefinedになる
    if (this.optional(element)) {
        console.log(`CHECK id[${element.id}]    this is not element [${this.optional(element)}]`);
        $(element).data('checkRequiredAtLeastOne', false);
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

    // requiredAtLeastOneがセットされている項目をバリデーションする
    // if (!$(element).data('checkRequiredAtLeastOne')) {
    //   ownGroupList.data('checkRequiredAtLeastOne', true);
    //   otherGroupList.data('checkRequiredAtLeastOne', true);
    //   ownGroupList.each(function () {
    //     if (this.id != element.id) {
    //         console.log(`    # target:[${this.id}]`)
    //         validator.element(this);
    //       }
    //   })
    //   otherGroupList.each(function () {
    //     console.log(`    # target:[${this.id}]`)
    //     validator.element(this);
    //   })
    // }
    // $(element).data('checkRequiredAtLeastOne', false);

    console.log(`CHECK id[${element.id}] : count = ${count} : valid = ${isValid}`);
    return isValid;

  }, 'at least one required');
});