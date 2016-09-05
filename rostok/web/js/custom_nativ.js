document.addEventListener("DOMContentLoaded", function() {
	window.onscroll = onChangePos;
    var logo = document.querySelector('.navbar-brand img');
    var nav = document.querySelector('nav');
	function onChangePos() {
		if (window.matchMedia('(min-width: 769px)').matches) {
		    if (window.pageYOffset > 0) {
				logo.setAttribute("src", "web/img/logo-b.png");
				document.querySelector('.navbar-nav li:nth-of-type(1) img').setAttribute('src', 'web/img/binst.png');
				document.querySelector('.navbar-nav li:nth-of-type(2) img').setAttribute('src', 'web/img/bvk.png');
				document.querySelector('.navbar-nav li:nth-of-type(3) img').setAttribute('src', 'web/img/bfb.png');
				nav.classList.add("scroll");
		    }else {
		        logo.setAttribute("src", "web/img/logo.png");
		        document.querySelector('.navbar-nav li:nth-of-type(1) img').setAttribute('src', 'web/img/inst.png');
				document.querySelector('.navbar-nav li:nth-of-type(2) img').setAttribute('src', 'web/img/vk.png');
				document.querySelector('.navbar-nav li:nth-of-type(3) img').setAttribute('src', 'web/img/fb.png');
				nav.classList.remove("scroll");
		    }
		}
	}
	if (window.matchMedia('(max-width: 768px)').matches) {
			logo.setAttribute("src", "web/img/logo-b.png");
			document.querySelector('.navbar-nav li:nth-of-type(1) img').setAttribute('src', 'web/img/binst.png');
			document.querySelector('.navbar-nav li:nth-of-type(2) img').setAttribute('src', 'web/img/bvk.png');
			document.querySelector('.navbar-nav li:nth-of-type(3) img').setAttribute('src', 'web/img/bfb.png');
			nav.classList.add("visible");


		}	


});
