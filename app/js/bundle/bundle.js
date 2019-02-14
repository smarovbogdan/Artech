(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function() {
	let anchor = require('../parts/anchor.js');
	let hamburger = require('../parts/hamburger.js');
	let inputSelect = require('../parts/inputselect.js');
	let validate = require('../parts/validate.js');

	anchor();
	hamburger();
	inputSelect();
	validate();
});
},{"../parts/anchor.js":2,"../parts/hamburger.js":3,"../parts/inputselect.js":4,"../parts/validate.js":5}],2:[function(require,module,exports){
function anchor() {
	//Плавный скролл до блока .div по клику на .scroll
	//Документация: http://webcomplex.com.ua/jquery/plavnyj-skroll-posle-nazhatiya-na-yakornuyu-ssylku.html
   $(".anchor").on("click", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();	
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),	
		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;	
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});
}

module.exports = anchor;
},{}],3:[function(require,module,exports){
function humburger() {
	// Hamburger
	$('#hamburger').click(function() {
		$(this).toggleClass('active');
		$('#overlay').toggleClass('open');
		$('body').toggleClass('overflow-hidden');	
	});
	//End
	$('.overlay__link').click(function(){
		$('#hamburger').toggleClass('active');
		$('#overlay').removeClass('open');
		$('body').toggleClass('overflow-hidden');	
	});
}

module.exports = humburger;
},{}],4:[function(require,module,exports){
function inputSelect() {
	// Input Select
	$('.select').each(function(){
		// Variables
		var $this = $(this),
			selectOption = $this.find('option'),
			selectOptionLength = selectOption.length,
			selectedOption = selectOption.filter(':selected'),
			dur = 300;

		$this.hide();
		// Wrap all in select box
		$this.wrap('<div class="select"></div>');
		// Style box
		$('<div>',{
			class: 'select__gap',
			text: 'Выберите вид услуги'
		}).insertAfter($this);
		
		var selectGap = $this.next('.select__gap'),
			caret = selectGap.find('.caret');
		// Add ul list
		$('<ul>',{
			class: 'select__list'
		}).insertAfter(selectGap);		

		var selectList = selectGap.next('.select__list');
		// Add li - option items
		for(var i = 0; i < selectOptionLength; i++){
			$('<li>',{
				class: 'select__item',
				html: $('<span>',{
					text: selectOption.eq(i).text()
				})				
			})
			.attr('data-value', selectOption.eq(i).val())
			.appendTo(selectList);
		}
		// Find all items
		var selectItem = selectList.find('li');

		selectList.slideUp(0);
		selectGap.on('click', function(){
			if(!$(this).hasClass('on')){
				$(this).addClass('on');
				selectList.slideDown(dur);

				selectItem.on('click', function(){
					var chooseItem = $(this).data('value');

					$('select').val(chooseItem).attr('selected', 'selected');
					selectGap.text($(this).find('span').text());

					selectList.slideUp(dur);
					selectGap.removeClass('on');
				});
				
			} else {
				$(this).removeClass('on');
				selectList.slideUp(dur);
			}
		});		

	});

	// END
}

module.exports = inputSelect;
},{}],5:[function(require,module,exports){
function validate() {
	$('#form').validate({
		rules: {
			form_name: {
				required: true,
				minlength: 2,
				maxlength: 50
			},
			form_email: {
				required: true,
				email: true
			},
			form_pswd1: {
				required: true,
				minlength: 6
			},
			form_phone: {
				minlength: 10,
				maxlength: 22,
				phone_mask: true
			}
		},
		messages: {
			form_name: {
				required: "Поле \"Имя\" обязательное для заполнения",
				minlength: "Поле \"Имя\" должно содержать минимум 2 символа",
				maxlength: "Не больше 50 символов"
			},
			form_phone: {
				required: "Поле \"Номер телефону\" обязательное для заполнения",
				minlength: "\"Номер телефона\" должен содержать минимум 10 цифр",
				maxlength: "\"Номер телефона\" введен не правильно",
				pattern: "\"Номер телефона\" содержит некорректные цифры"
			},
			form_email: {
				required: "Поле е-майл обьязательное для заполнения",
				email: "Введите Ваш е-майл"
			}
		},
		submitHandler: function (form) {
				$.ajax({
					type: 'POST',
					url: 'mail.php',
					data: $('#form').serialize(),
				success: function () {
					form.reset();
					$('#form, .conect-form').hide(200);
					$('#success-wrap').show(200);
					setTimeout(function() {
						$('#form, .form').show(200);
						$('#success-wrap').hide(200);
					}, 5000);
				},
				error: function () {
					form.reset();
					$('#form, .form').hide(200);
					$('#error-wrap').show(200);
					setTimeout(function() {
						$('#form, .form').show(200);
						$('#error-wrap').hide(200);
					}, 5000);
					}
				});
			}

	});

	$.validator.addMethod( "phone_mask", function( phone_number, element ) {
		return phone_number.match(/^([+]38)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/)
	}, "Номер телефону содержит некоректные символы" );
}

module.exports = validate;
},{}]},{},[1]);
