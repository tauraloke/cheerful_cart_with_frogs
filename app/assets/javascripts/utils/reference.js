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
  /**
   * @returns {Number}
   */
  getValue() {
    return parseInt(this.value);
  }
  /**
   * @param {Number} delta
   */
  addToValue(delta) {
    this.update(this.getValue() + delta);
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
