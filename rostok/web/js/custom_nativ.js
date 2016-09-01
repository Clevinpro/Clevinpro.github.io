document.addEventListener("DOMContentLoaded", function() {
	
	

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