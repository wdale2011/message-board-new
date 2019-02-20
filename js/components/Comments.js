export default class Comments extends HTMLElement {
  static get observedAttributes() {
    return ['comments'];
  }

  // getter for comments
  get comments() {
    if (this.hasAttribute('comments')) {
      return JSON.parse(this.getAttribute('comments'));
    }
    return [];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.comments.forEach(comment => {
      const commentElement = document.createElement('message-board-comment');
      commentElement.setAttribute('comment', JSON.stringify(comment));
      this.appendChild(commentElement);
    });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
}
