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