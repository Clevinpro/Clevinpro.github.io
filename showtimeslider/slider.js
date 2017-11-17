(function() {


  document.addEventListener( "DOMContentLoaded", function() {

    function Slideshow( slider ) {
      this.el = document.querySelector(slider);
      this.init();
    }

    Slideshow.prototype = {
      init: function() {
        this.wrapper = this.el.querySelector( ".slider-wrapper" );
        this.slides = this.el.querySelectorAll( ".slide" );
        this.dots = this.el.querySelectorAll('.dot');
        this.dotsWrap = this.el.querySelector('.dots');

        this.firstRun = false;
        this.index = 0;
        this.total = this.slides.length;
        this.timer = null;

        this.createDots();
        this.action();
      },
      _slideTo: function( slide ) {
        var currentSlide = this.slides[slide];
        currentSlide.classList.add('active__slide');

        for( var i = 0; i < this.total; i++ ) {
          var slide = this.slides[i];


          if( slide !== currentSlide ) {
            slide.classList.remove('active__slide');
          }
        }
      },
      action: function() {
        var self = this;
        self.timer = setInterval(function() {
          self.dots[self.index].classList.add('complete');
          if(self.firstRun) {
            self.index++;
          }
          self.firstRun = true;
          if( self.index == self.total ) {
            self.dots.forEach(function (e) {
              e.classList.remove('complete');
            });

            self.index = 0;
          }

          self._slideTo( self.index );
          self.dots.forEach(function (e) {
            e.classList.remove('active');
          });
          self.dots[self.index].classList.add('active');

        }, 5000);
      },
      // stopStart: function() {
      //   var self = this;
      //   self.el.addEventListener( "mouseover", function() {
      //     clearInterval( self.timer );
      //     self.timer = null;
      //
      //   }, false);
      //   self.el.addEventListener( "mouseout", function() {
      //     self.action();
      //
      //   }, false);
      // },
      onDotHandle: function () {
        var self = this;
        self.dots.forEach(function (item, i) {
          item.addEventListener('click', function () {
            if(item == self.dots[1]) {
              self.dots[0].classList.add('complete');
              self.dots[2].classList.remove('complete');
            }
            if(item == self.dots[2]) {
              self.dots[0].classList.add('complete');
              self.dots[1].classList.add('complete');
            }
            if(item == self.dots[0]) {
              self.dots[1].classList.remove('complete');
            }
            self.dots.forEach(function (e) {
                e.classList.remove('active');
            });
            item.classList.add('active');
            clearInterval( self.timer );
            self.timer = null;
            self.index = i;
            self._slideTo(i);
            self.action();
          })
        })
      },
      createDots: function () {
        var dot = document.createElement('SPAN');
        dot.className = 'dot';
        if (this.dots.length < 1) {
          console.log(this.dots.length)
          for (var d = 0; d < this.total; d++) {
            this.dotsWrap.appendChild(dot.cloneNode())
          }
          this.dots = this.el.querySelectorAll('.dot');
          console.log(this.dots);
          this.onDotHandle();
        }
      }


    };

    var slider = new Slideshow( "#main-slider" );

  });


})();
