$.fn.selectText = function(){
var element = this.get(0);
var rng = document.createRange();
rng.selectNodeContents(element);
window.getSelection().addRange(rng);
return this;
}

var LANG = {
	TextLength	: {
		'ja'	: 'パスワードの文字数',
		'en'	: 'password length',
	},
	TextNormalSet : {
		'ja'	: '通常文字セット',
		'en'	: 'normal characters',
	},
	TextSpecialSet : {
		'ja'	: '必須文字セット',
		'en'	: 'special characters',
	},
	TextSpecialSetNum : {
		'ja'	: '必須文字セット文字数',
		'en'	: 'special characters including at least',
	},
	ButtonGenerate : {
		'ja'	: 'パスワード生成',
		'en'	: 'Generate',
	},
};

var LANG_LABEL = {
	'ja'	: '日本語',
	'en'	: 'Engligh',
};

$().ready(function(){
	$('#ConfSpecialCharset').change(function(){
		if($(this).val() == 'custom'){
			$('#ConfSpecialCharsetCustom').css('display', 'inline');
		} else {
			$('#ConfSpecialCharsetCustom').css('display', 'none');
		}
	});
	
	$('#ButtonGenerate').click(function(){
		Generate();
	});
	
	var query = window.location.search.substring(1);
	if(query == 'en'){
		SetLanguage('en');
	}
	else {
		SetLanguage('ja');
	}
});

function SetLanguage(iLanguage){
	if(iLanguage != 'ja'){
		$('#NavLink').attr('href', './?'+iLanguage);
	}

	for(var i in LANG){
		$('#'+i).text(LANG[i][iLanguage]);
	}
	$('#LanguageView').text(LANG_LABEL[iLanguage]);
}

function Generate(){
	var length			= parseInt($('#ConfLength').val());
	var charset			= $('#ConfCharset').val();
	var specialCharset	= $('#ConfSpecialCharset').val() == 'custom' ? $('#ConfSpecialCharsetCustom').val() : $('#ConfSpecialCharset').val();
	var specialLength	= parseInt($('#ConfSpecialLength').val());
	
	$('#tbody').html('<tr><td class="password">'+GetPassword(length, charset, specialCharset, specialLength)+'</td></tr>' + $('#tbody').html());
	
	$('.password').click(function(){
		$(this).selectText();
	});
}


function GetPassword(iLength, iCharSet, iSpecialCharSet, iUseSpecialCharSetNum) {
	var charset = iCharSet.split('');
	var specialCharset = iSpecialCharSet.split('');

	var passwordArray = [];

	for (var i = 0; i < iLength - iUseSpecialCharSetNum; i++) {
	passwordArray.push(charset[Math.floor(Math.random() * charset.length)]);
	}
	for (var i = 0; i < iUseSpecialCharSetNum; i++) {
		passwordArray.push(specialCharset[Math.floor(Math.random() * specialCharset.length)]);
	}

	passwordArray = ArrayShuffle(passwordArray);

	var password = '';

	for(var i = 0; i < passwordArray.length; i++){
		password += passwordArray[i];
	}

	return password;
};

function ArrayShuffle(iArray) {
    var i = iArray.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = iArray[--i];
        iArray[i] = iArray[j];
        iArray[j] = t;
    }
    return iArray;
};