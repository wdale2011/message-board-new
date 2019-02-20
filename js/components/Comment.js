export default class Comment extends HTMLElement {
  static get observedAttributes() {
    return ['comment'];
  }

  get comment() {
    if (this.hasAttribute('comment')) {
      return JSON.parse(this.getAttribute('comment'));
    }
    return {
      text: 'no comment...',
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <p>${this.comment.text}</p>
      <button type="button" class="delete-button">x</button>
    `;

    this.querySelector('button.delete-button').addEventListener('click', () =>
      this.dispatchEvent(
        new CustomEvent('removeComment', {
          bubbles: true,
        })
      )
    );
  }

  attributeChangedCallback() {
    this.render();
  }
}
