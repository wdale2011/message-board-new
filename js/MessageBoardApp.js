import API from './MessageBoardAPI.js';

// const api = new API(commentData);

class MessageBoardApp {
  constructor(api) {
    this.api = api || new API();
    this.comments = api.getCommentsSortedByTime();
    this.commentsSection = document.getElementById('comments');
  }

  render() {
    this.commentsSection.innerHTML = this.comments
      .map(
        comment => `
          <div class="comment">
            <p>${comment.text}</p>
          </div>
        `
      )
      .join('');
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    const searchText = new FormData(event.target).get('search');
    this.comments = this.api.filterCommentsByText(searchText);
    this.render();
  }
}

export default MessageBoardApp;
