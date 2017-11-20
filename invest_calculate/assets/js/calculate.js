(function () {
  var volumeSlider1 = document.getElementById('volume1');
  var volumeSlider2 = document.getElementById('volume2');
  var rangeSliders = [volumeSlider1, volumeSlider2];

  function RangeSlider(rangeSlider) {
    this.rangeSlider = rangeSlider;
    this.rangeSliderInput = this.rangeSlider.querySelector('.range__slider__input');
    rangeSlider.addEventListener('input', function() {
      this.updateSliderOutput();
      this.updateSliderLevel();
    }.bind(this), false);

    this.level = function() {

      return this.rangeSliderInput.value / this.rangeSliderInput.max * 100;
    };

    this.levelString = function() {
      return parseInt(this.level());
    };

    this.value = function() {
      var cashInput = this.rangeSlider.querySelector('.range__slider__input.cash');
      var monthInput = this.rangeSlider.querySelector('.range__slider__input.month');
      if (cashInput) {
        calc.cashValue = cashInput.value;
        return '$ ' + cashInput.value;
      }
      if (monthInput) {
        if (monthInput.value < 10) {
          calc.month = monthInput.value;
          return '0' + monthInput.value + ' мес.';
        }
        calc.month = monthInput.value;
        return monthInput.value + ' мес.';
      }

    };

    this.remaining = function() {
      return 99.5 - this.level();
    };

    this.remainingString = function() {
      return parseInt(this.remaining());
    };

    this.updateSliderOutput = function() {
      var output = this.rangeSlider.querySelector('.range__slider__output');
      var remaining = this.rangeSlider.querySelector('.range__slider__remaining');
      var thumb = this.rangeSlider.querySelector('.range__slider__thumb');
      output.value = this.value();
      output.style.left = this.levelString() + '%';
      thumb.style.left = this.levelString() + '%';
      if (remaining) {
        remaining.style.width = this.remainingString() + '%';
      }
    };

    this.updateSlider = function(num) {
      var input = this.rangeSlider.querySelector('.range__slider__input');
      input.value = num;
    };

    this.updateSliderLevel =function() {
      var level = this.rangeSlider.querySelector('.range__slider__level');
      level.style.width = this.levelString() + '%';
    }
  }

  rangeSliders.forEach(function(rangeSlider) {
    new RangeSlider(rangeSlider);
  });

  function InvestCalc( element ) {
    this.el = document.querySelector( element );
    this.init();
  }

  InvestCalc.prototype = {
    init: function () {
      this.maxChecked = 5;
      this.calculated = false;
      this.checkboxes = document.querySelectorAll('.check__item input[type="checkbox"]');
      this.checked = function () {
        return document.querySelectorAll('.check__item input[type="checkbox"]:checked');
      };
      this.notChecked = function() {
        return document.querySelectorAll('.check__item input[type="checkbox"]:not(:checked)');
      };
      this.calculateChecked = {};
      this.resultWrapper = document.querySelector('.result__value');
      this.resultButton = document.querySelector('.calculate__button');
      this.cashValue = 50000;
      this.month = 6;

      this.usedCheckbox();

    },

    usedCheckbox: function () {
      var then = this;
      this.checkboxes.forEach(function (element) {

        element.onchange = function() {
            var notChecked = then.notChecked();
            var checked = then.checked();
            if (checked.length === then.maxChecked) {
              notChecked.forEach(function (e) {
                e.disabled = true;
              });
              then.resultButton.addEventListener('click', then.calculateInvest.bind(then));

              then.calculateChecked = checked;


            } else {

              console.log('then.checked().length ', then.checked().length );

              notChecked.forEach(function (e) {
                e.disabled = false;

              });
            }

            then.clearRates();

        };

      })

    },
    calculateInvest: function () {
      if(this.checked().length === 5) {

        var rate = 0;
        var checked = this.checked();
        checked.forEach(function (el) {
          var rateWrapper = document.createElement('span');
          rateWrapper.innerHTML = el.dataset.index;
          rateWrapper.className = 'rate';
          rate += parseFloat(el.dataset.index);
          var parentEl = el.parentNode;
          parentEl.appendChild(rateWrapper);
        });
        var result = Math.round((rate * this.cashValue/ 5) / 12 * this.month).toFixed(2);
        if (result > 0) {
          this.resultWrapper.innerText = '+ ' + result + ' ($)';
        } else {
          var patt = /[-]/g;
          this.resultWrapper.innerText = '- ' + result.toString().replace(/[-]/g, '') + ' ($)';
        }
        this.calculated = true;
        console.log('rate', rate);
        console.log('cash', this.cashValue);
        console.log('month', this.month);
        console.log('this.calculateChecked.length', this.calculateChecked.length)
        console.log('this.checked.length', this.checked().length)
      }
    },
    clearRates: function () {
      var then = this;
      if (this.calculateChecked.length === 5) {
        this.calculateChecked.forEach(function (e) {
          e.onchange = function (el) {
            then.calculateChecked.forEach(function (rateEl) {
              if (rateEl.parentNode.querySelector('.rate')) {
                rateEl.parentNode.removeChild(rateEl.parentNode.querySelector('.rate'));
              }

            })
          }
        });
        this.calculateChecked = this.checked();
      }
    }
  };

  var calc = new InvestCalc();

})();