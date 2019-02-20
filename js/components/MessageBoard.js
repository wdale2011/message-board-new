import API, { commentData } from '../MessageBoardAPI.js';
import { formatObjectForAttribute } from '../helpers.js';

class MessageBoardApp extends HTMLElement {
  constructor() {
    super();

    this.api = new API(commentData);

    this.state = {
      comments: this.api.getCommentsSortedByTime(),
    };
  }

  setState(newState) {
    Object.keys(newState).forEach(key => {
      // update state
      this.state[key] = newState[key];
      // update component attributes
      this.querySelectorAll(`[${key}]`).forEach(element => {
        element.setAttribute(key, formatObjectForAttribute(newState[key]));
      });
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // console.log(this.state);
    this.innerHTML = /* html */ `
      <nav>
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search"
          />
          <button type="submit">Search</button>
        </form>
      </nav>
      <message-board-comments class="comments" comments="${formatObjectForAttribute(
        this.state.comments
      )}"></message-board-comments>
        <div class="add-comment">
          <form>
            <input
              type="text"
              name="comment"
              placeholder="Your opinion here"
            />
            <button type="submit">Comment</button>
          </form>
        </div>
    `;

    // add event listeners
    this.querySelector('nav form').addEventListener('submit', this.handleSearchSubmit);
    this.querySelector('.add-comment form').addEventListener('submit', this.handleAddComment);
  }

  handleSearchSubmit = event => {
    event.preventDefault();
    const searchText = new FormData(event.target).get('search');
    const comments = this.api.filterCommentsByText(searchText);
    this.setState({ comments });
    // this.querySelector('[comments]').attributes.comments = this.comments;
    // this.render();
  };

  handleAddComment = event => {
    event.preventDefault();
    const commentText = new FormData(event.target).get('comment');
    const comments = this.api.addComment(commentText);
    this.setState({ comments });
    // this.render();
  };
}

export default MessageBoardApp;
