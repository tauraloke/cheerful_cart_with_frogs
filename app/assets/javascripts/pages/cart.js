//= require ../utils/reference
//= require ../utils/currency_reference

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
      // @ts-ignore
      if (discountSlider && newValue <= discountSlider.max) {
        // @ts-ignore
        discountSlider.max = newValue;
        // @ts-ignore
        discountSlider.value = newValue;
      }
      finalPriceRef.update(newValue - discountRef.value);
    }
  );

  discountSlider?.addEventListener('change', (event) => {
    // @ts-ignore
    let newValue = parseInt(event.target?.value);
    // @ts-ignore
    if (newValue !== NaN) discountRef.update(newValue);
  });

  let goodPriceRefs = [];
  let goodAmountRefs = [];
  for (const goodRow of document.querySelectorAll('.cart__table tr')) {
    // @ts-ignore
    let rowId = goodRow?.dataset?.id;
    if (!rowId) continue;

    goodRow
      .querySelector('.cart__table__amount__increase')
      ?.addEventListener('click', (event) => {
        goodAmountRefs[rowId].update(parseInt(goodAmountRefs[rowId].value) + 1);
      });
    goodRow
      .querySelector('.cart__table__amount__decrease')
      ?.addEventListener('click', (event) => {
        goodAmountRefs[rowId].update(parseInt(goodAmountRefs[rowId].value) - 1);
      });

    goodPriceRefs[rowId] = new Reference(
      goodRow.querySelector('.cart__table__last__price')
    );

    let deleteRow = (rowId) => {
      fetch(`/api/v1/goods2cart/${rowId}`, { method: 'DELETE' })
        .then((result) => {
          if (!result.ok) {
            throw new Error(`Response status: ${result.status}`);
          }
          document
            .querySelector(`.cart__table tr[data-id="${rowId}"]`)
            ?.remove();
          // @ts-ignore
          if (topCartContainer) topCartContainer.dataset.count -= 1;
          totalPriceRef.update(
            totalPriceRef.value -
              goodPriceRefs[rowId].value * goodAmountRefs[rowId].value
          );
        })
        .catch((errorMsg) => {
          console.log(errorMsg);
        });
    };

    goodAmountRefs[rowId] = new Reference(
      goodRow.querySelector('.cart__table__amount__value'),
      (_oldValue, newValue) => {
        if (newValue <= 0) {
          deleteRow(rowId);
          return true;
        }
        fetch(`/api/v1/goods2cart/${rowId}`, {
          method: 'PATCH',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ amount: newValue }),
        })
          .then((result) => {
            if (!result.ok) {
              throw new Error(`Response status: ${result.status}`);
            }
            let delta = (newValue - _oldValue) * goodPriceRefs[rowId].value;
            totalPriceRef.update(parseInt(totalPriceRef.value) + delta);
          })
          .catch((errorMsg) => {
            console.log(errorMsg);
          });
      }
    );

    // @ts-ignore
    goodRow
      .querySelector('.cart__table__last__trash')
      ?.addEventListener('click', (event) => {
        deleteRow(rowId);
      });
  }
};
