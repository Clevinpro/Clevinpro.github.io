document.addEventListener("DOMContentLoaded", function() {
	
	

	window.onscroll = onChangePos;

	function onChangePos() {
    var header = document.getElementById("navbar");
    var logo = document.querySelector('.navbar-brand img');
    if (window.pageYOffset > 0) {
		logo.setAttribute("src", "web/img/logo-b.png");
    } else {
        logo.setAttribute("src", "web/img/logo.png");
    }
}

});