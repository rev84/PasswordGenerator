// Generated by CoffeeScript 1.9.3
var defGenerate, initialize, mt_rand, shuffle;

window.CONFIG = {
  all_char_num: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].concat([32, 64]),
  upper_char_num: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  lower_char_num: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  int_char_num: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  sp_char_num: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  sp_char_set: ['', '_', '_[]()', '_[]()!?@:;,.+-*/']
};

$().ready(function() {
  initialize();
  return defGenerate();
});

initialize = function() {
  var content, id, j, len, results, select, v, val;
  results = [];
  for (id in CONFIG) {
    content = CONFIG[id];
    select = $('#' + id);
    select.html('');
    for (j = 0, len = content.length; j < len; j++) {
      v = content[j];
      select.append($('<option>').val(v).html(v));
    }
    select.on('change', function() {
      console.log('cookie [' + $(this).attr('id') + '] ' + $(this).val());
      return $.cookie($(this).attr('id'), $(this).val(), {
        expires: 365 * 100
      });
    });
    val = $.cookie(id) != null ? $.cookie(id) : content[0];
    results.push(select.val(val));
  }
  return results;
};

defGenerate = function() {
  return $('#generate').on('click', function() {
    var allCharNum, allSet, i, intMin, intSet, j, k, l, lowerMin, lowerSet, m, notSp, o, password, ref, ref1, ref2, ref3, ref4, resArray, restNum, spMin, spSet, upperMin, upperSet;
    resArray = [];
    allCharNum = Number($('#all_char_num').val());
    upperMin = Number($('#upper_char_num').val());
    lowerMin = Number($('#lower_char_num').val());
    intMin = Number($('#int_char_num').val());
    spMin = Number($('#sp_char_num').val());
    notSp = $('#sp_char_set').val() === '' || spMin === 0;
    if (notSp) {
      spMin = 0;
    }
    restNum = allCharNum - (upperMin + lowerMin + intMin + spMin);
    if (restNum < 0) {
      return;
    }
    allSet = [];
    upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    allSet = allSet.concat(upperSet);
    for (i = j = 0, ref = upperMin; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      resArray.push(upperSet[mt_rand(0, upperSet.length - 1)]);
    }
    lowerSet = "abcdefghijklmnopqrstuvwxyz".split('');
    allSet = allSet.concat(lowerSet);
    for (i = k = 0, ref1 = lowerMin; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      resArray.push(lowerSet[mt_rand(0, lowerSet.length - 1)]);
    }
    intSet = "0123456789".split('');
    allSet = allSet.concat(intSet);
    for (i = l = 0, ref2 = intMin; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
      resArray.push(intSet[mt_rand(0, intSet.length - 1)]);
    }
    if (!notSp) {
      spSet = $('#sp_char_set').val().split('');
      allSet = allSet.concat(spSet);
      for (i = m = 0, ref3 = spMin; 0 <= ref3 ? m < ref3 : m > ref3; i = 0 <= ref3 ? ++m : --m) {
        resArray.push(spSet[mt_rand(0, spSet.length - 1)]);
      }
    }
    for (i = o = 0, ref4 = restNum; 0 <= ref4 ? o < ref4 : o > ref4; i = 0 <= ref4 ? ++o : --o) {
      resArray.push(allSet[mt_rand(0, allSet.length - 1)]);
    }
    password = shuffle(resArray).join('');
    return $('#passwords').prepend($('<div>').append($('<span>').html(password).zclip({
      copy: password,
      path: './js/jquery-zclip/ZeroClipboard.swf',
      afterCopy: function() {
        $('.copied').removeClass('copied');
        return $(this).addClass('copied');
      }
    })));
  });
};

mt_rand = function(min, max) {
  Math.round();
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

shuffle = function(ary) {
  var copy, i, n;
  copy = [];
  n = ary.length;
  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(ary.splice(i, 1)[0]);
  }
  return copy;
};
