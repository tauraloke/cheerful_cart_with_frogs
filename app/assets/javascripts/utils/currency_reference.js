//= require ./reference

class CurrencyReference extends Reference {
  prepare(value) {
    return value.toLocaleString('ru-RU') + ' ₽';
  }
}
