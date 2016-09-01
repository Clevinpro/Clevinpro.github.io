document.addEventListener("DOMContentLoaded", function() {
	
	

	window.onscroll = onChangePos;
    var logo = document.querySelector('.navbar-brand img');
    var navbar = document.querySelector('.navbar-fixed-top');
	function onChangePos() {
    if (window.pageYOffset > 0) {
		logo.setAttribute("src", "web/img/logo-b.png");
		navbar.setAttribute("data-spy", "affix");
    }else {
        logo.setAttribute("src", "web/img/logo.png");
    }
}

});
