import { formatAttributeAsObject, formatObjectForAttribute } from '../helpers.js';

export default class Comments extends HTMLElement {
  static get observedAttributes() {
    return ['comments'];
  }

  // getter/setter comments
  get comments() {
    if (this.hasAttribute('comments')) {
      return formatAttributeAsObject(this.getAttribute('comments'));
    }
    return [];
  }

  set comments(val) {
    this.setAttribute('comments', formatObjectForAttribute(val));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this.comments
      .map(
        comment => `
          <div class="comment">
            <p>${comment.text}</p>
          </div>
        `
      )
      .join('');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}
