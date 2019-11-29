export class MessageView {

  constructor(element) {
    this._element = element;
  }

  update(model, type, timeout) {
    // this._element.innerHTML = '';
    this._element.innerHTML = this._template(model, type);
    this._removeMessageTimeout(type, timeout);
  }

  _removeMessageTimeout(type, timeout = 5000) {
    if (timeout == -1) return;
    setTimeout(() => {
      if (type)
        this._element.removeChild(this._element.querySelector(`h3.show-${type}`));
      else this._element.removeChild(this._element.querySelector(`h3.show-message`));
    }, timeout);
  }

  _template(model, type = 'warn') {
    return `
            <h3 class="show-${type} show-message">
                <p class="message">${model}</p>
            </h3>
        `;
  }
}