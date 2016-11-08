document.addEventListener("DOMContentLoaded", function() {

    var modal = document.getElementById('myModal'),
    btn = document.querySelectorAll('.my-btn'),
    span = document.getElementsByClassName("mdi-close-circle")[0],
    img = document.querySelector('.modal-content img'),
    title = document.querySelector('.modal-content .modalTitle');
    content = document.querySelector('.modal-content p');


    for (var i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click',  function (el) {

            img.setAttribute('src', this.dataset.src);
            title.innerHTML = this.dataset.title;
            content.innerHTML = this.dataset.content;
            modal.setAttribute('style','visibility: visible; opacity: 1;');

        });
    }

        // btn.forEach(function() {
        //     el.addEventListener('click touchstart',  function () {
        //
        //     img.setAttribute('src', this.dataset.src);
        //     title.innerHTML = this.dataset.title;
        //     content.innerHTML = this.dataset.content;
        //     modal.setAttribute('style','visibility: visible; opacity: 1;');
        //
        //     });
        // });





    span.onclick = function () {
        modal.setAttribute('style','visibility: hidden; opacity: 0;');
        img.setAttribute('src', '');
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.setAttribute('style','visibility: hidden; opacity: 0;');
            img.setAttribute('src', '');
        }
    };

});
/**
 * Created by Clevin on 05.10.2016.
 */
