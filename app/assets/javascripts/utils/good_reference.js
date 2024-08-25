//= require ./reference

function numeral_ending(count) {
  if (count % 100 < 20 && count % 100 > 10) return 'ов';
  if (count % 10 == 1) return '';
  if ([2, 3, 4].includes(count % 10)) return 'а';
  return 'ов';
}

function word_numeral_form(stem, count) {
  return stem + numeral_ending(count);
}

class GoodReference extends Reference {
  prepare(value) {
    return value + ` ${word_numeral_form('товар', parseInt(value))} на сумму`;
  }
}
