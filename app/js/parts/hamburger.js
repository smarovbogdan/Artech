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