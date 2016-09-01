document.addEventListener("DOMContentLoaded", function() {

    var navbar = document.querySelector('.navbar-fixed-top');
	(function () {
		if (window.pageYOffset > 0) {
			navbar.setAttribute("data-spy", "affix");
		}
	})();
	
	

	window.onscroll = onChangePos;
    var logo = document.querySelector('.navbar-brand img');
	function onChangePos() {
    if (window.pageYOffset > 0) {
		logo.setAttribute("src", "web/img/logo-b.png");
    }else {
        logo.setAttribute("src", "web/img/logo.png");
    }
}

});
