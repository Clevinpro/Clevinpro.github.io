document.addEventListener("DOMContentLoaded", function() {
	
	

	window.onscroll = onChangePos;
	window.click = onBodyClick;
	function onChangePos() {
    var logo = document.querySelector('.navbar-brand img');
    if (window.pageYOffset > 0) {
		logo.setAttribute("src", "web/img/logo-b.png");
    }else {
        logo.setAttribute("src", "web/img/logo.png");
    }
}
	function onBodyClick() {
		(document.querySelector('nav').classList.contains('affix')) ?
    	logo.setAttribute("src", "web/img/logo-b.png") : ''
    	
	}

});