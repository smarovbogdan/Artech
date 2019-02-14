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