// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .

class Reference {
  constructor(element, updateListener) {
    this.value = element?.dataset?.value || 0;
    this.element = element;
    this.updateListener = updateListener;
  }
  update(newValue) {
    this.onBeforeUpdate(newValue);
    this.value = newValue;
    if (this.element) {
      this.element.dataset.value = newValue;
      this.element.innerHTML = Reference.prepare(newValue);
    }
  }
  static prepare(value) {
    return value;
  }
  onBeforeUpdate(newValue) {
    if (typeof this.updateListener == 'function') {
      this.updateListener(this.value, newValue);
    }
  }
}

class CurrencyReference extends Reference {
  static prepare(value) {
    return value.toLocaleString('ru-RU') + ' ₽';
  }
}

window.onload = function () {
  let discountRef = new CurrencyReference(
    document.querySelector('.cart__total__top__discount'),
    (_oldValue, newValue) => {
      totalPriceRef.update(totalSumRef.value - newValue);
    }
  );

  let totalPriceRef = new CurrencyReference(
    document.querySelector('.cart__total__price__value'),
    (_oldValue, newValue) => {}
  );

  let totalSumRef = new CurrencyReference(
    document.querySelector('.cart__total__top__value'),
    (_oldValue, newValue) => {}
  );

  document
    .querySelector('.cart__total__slider')
    ?.addEventListener('change', (event) => {
      let newValue = parseInt(event.target?.value);
      if (newValue !== NaN) discountRef.update(newValue);
    });
};
