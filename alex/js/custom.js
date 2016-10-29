
document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = onChangePos;
    var nav = document.querySelector('header');
    function onChangePos() {
        if (window.pageYOffset > 0) {
            nav.classList.add('fixed');
        }else {
            nav.classList.remove("fixed");
        }
    }

// Get the modal
var modal = document.getElementById('modalWindow');
var modalSuccess = document.getElementById('modalSuccess');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var close = document.getElementById("modalClose");
var closeSuccess = document.getElementById("modalCloseSuccess");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
};
closeSuccess.onclick = function() {
    modalSuccess.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }else if (event.target == modalSuccess) {
        modalSuccess.style.display = "none";
    }
}
});



/**
 * Created by Clevin on 13.09.2016.
 */
