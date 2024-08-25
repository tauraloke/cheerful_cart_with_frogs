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
      this.element.innerHTML = this.prepare(newValue);
    }
  }
  prepare(value) {
    return value;
  }
  onBeforeUpdate(newValue) {
    if (typeof this.updateListener == 'function') {
      this.updateListener(this.value, newValue);
    }
  }
}

class CurrencyReference extends Reference {
  prepare(value) {
    return value.toLocaleString('ru-RU') + ' ₽';
  }
}

window.onload = function () {
  let topCartContainer = document.querySelector('.cart__container');

  let discountElement = document.querySelector('.cart__total__top__discount');
  let discountSlider = document.querySelector('.cart__total__slider');
  let discountRef = new CurrencyReference(
    discountElement,
    (_oldValue, newValue) => {
      finalPriceRef.update(totalPriceRef.value - newValue);
    }
  );

  let finalPriceRef = new CurrencyReference(
    document.querySelector('.cart__total__price__value')
  );

  let totalPriceRef = new CurrencyReference(
    document.querySelector('.cart__total__top__value'),
    (_oldValue, newValue) => {
      if (newValue <= discountRef.value) {
        discountRef.update(newValue);
      }
      if (discountSlider && newValue <= discountSlider.max) {
        discountSlider.max = newValue;
        discountSlider.value = newValue;
      }
      finalPriceRef.update(newValue - discountRef.value);
    }
  );

  discountSlider?.addEventListener('change', (event) => {
    let newValue = parseInt(event.target?.value);
    if (newValue !== NaN) discountRef.update(newValue);
  });

  let goodPriceRefs = [];
  let goodAmountRefs = [];
  for (const goodRow of document.querySelectorAll('.cart__table tr')) {
    let rowId = goodRow?.dataset?.id;
    if (!rowId) continue;

    let trashElement = goodRow.querySelector('.cart__table__last__trash');

    goodPriceRefs[rowId] = new Reference(
      goodRow.querySelector('.cart__table__last__price')
    );
    goodAmountRefs[rowId] = new Reference(
      goodRow.querySelector('.cart__table__amount__value')
    );
    trashElement?.addEventListener('click', (event) => {
      fetch(`/api/v1/goods2cart/${rowId}`, { method: 'DELETE' })
        .then((result) => {
          document
            .querySelector(`.cart__table tr[data-id="${rowId}"]`)
            ?.remove();
          if (topCartContainer) topCartContainer.dataset.count -= 1;
          totalPriceRef.update(
            totalPriceRef.value -
              goodPriceRefs[rowId].value * goodAmountRefs[rowId].value
          );
        })
        .catch((errorMsg) => {
          console.log(errorMsg);
        });
    });
  }
};
