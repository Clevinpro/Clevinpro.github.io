$(document).ready(function() {

	$('.top-menu li a').click(function(e) {
		e.preventDefault();
		var path = $(this).attr('href');
		$('html, body').animate({scrollTop: $(path).offset().top - 75}, 1000);
		if($('ul.mobile-menu').is(':visible')){
			$('ul.mobile-menu').hide();
		}
	});
	
	$('a[href="#mail-modal"]').fancybox({});
	$('a.thanks-link').fancybox({});
	
	$('form.mail-form').submit(function(e) {
		e.preventDefault();
		
		var name = $(this).find('input[name="name"]').val();
		var phone = $(this).find('input[name="phone"]').val();
		var email = $(this).find('input[name="email"]').val();
		var city = $(this).find('input[name="city"]').val();

		console.log( name + "  " + phone + "  " + email + "  " + city);
		
		$.post('php/send.php',{
			name: name,
			email: email,
			phone: phone,
			city: city,
			},
			function(data) {
				$('a.thanks-link').click();
				console.log(data);
			}
		);

	});			
	
	$('input[type="tel"]').inputmask("mask", {"mask": "+7(999) 999-99-99", 'placeholder':'_', showMaskOnHover: false,});

	document.querySelector('.tc-background-orange').setAttribute("style", "display: inline-block; box-sizing: border-box; 	min-height: 50px; max-width: 380px; min-width: 365px; border-radius: 30px; background: -webkit-linear-gradient(top, #fdab00 -1%,#fd8d00 100%); background: linear-gradient(to bottom, #fdab00 -1%,#fd8d00 100%); box-shadow: inset 0px -4px 1px #fdb200; font-size: 18px; font-family: Russia, tahoma, arial; color: #000; font-weight: 700; text-align: center; text-transform: uppercase; margin-top: 20px;");
	document.querySelector('.tc-background-orange.tc__second').setAttribute("style", "display:block; margin: 0 auto; box-sizing: border-box; min-height: 50px; max-width: 380px; min-width: 365px; border-radius: 30px; background: -webkit-linear-gradient(top, #fdab00 -1%,#fd8d00 100%); background: linear-gradient(to bottom, #fdab00 -1%,#fd8d00 100%); box-shadow: inset 0px -4px 1px #fdb200; font-size: 18px; font-family: Russia, tahoma, arial; color: #000; font-weight: 700; text-align: center; text-transform: uppercase; margin-top: 80px;");
	document.querySelector('.tc-background-orange.tc__third').setAttribute("style", "display:block; margin: 0 auto; box-sizing: border-box; min-height: 50px; max-width: 380px; min-width: 365px; border-radius: 30px; background: -webkit-linear-gradient(top, #fdab00 -1%,#fd8d00 100%); background: linear-gradient(to bottom, #fdab00 -1%,#fd8d00 100%); box-shadow: inset 0px -4px 1px #fdb200; font-size: 18px; font-family: Russia, tahoma, arial; color: #000; font-weight: 700; text-align: center; text-transform: uppercase; margin-top: 55px;");

});