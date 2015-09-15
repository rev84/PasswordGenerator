window.CONFIG = 
  all_char_num : [4..16].concat [32, 64]
  upper_char_num : [0..8]
  lower_char_num : [0..8]
  int_char_num : [0..8]
  sp_char_num : [0..8]
  sp_char_set : [
    ['_']
    ['_[]()']
    ['_[]()!?@:;,.+-*/']
  ]

$().ready(
  ->
    for id, content of CONFIG
      select = $('#'+id)
      select.html('')
      for v in content
        select.append(
          $('<option>').val(v).html(v)
        )
      # 変化したらクッキー設定
      select.on(
        'change'
        ->
          console.log 'cookie ['+$(this).attr('id')+'] '+$(this).val()
          $.cookie($(this).attr('id'), $(this).val(), { expires: 365*100 });
      )
      # クッキーの値を入れる
      val = $.cookie(id)
      select.val(val) if val isnt null
)

