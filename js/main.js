/** This is our entry point into our application */

import MessageBoardApp from './MessageBoardApp.js';
import MessageBoardAPI, { commentData } from './MessageBoardAPI.js';

// construct our API and seed it with data
const api = new MessageBoardAPI(commentData);
// construct our app
const app = new MessageBoardApp(api);
// fire off the initial render
app.render();

/** add event listeners */
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', event => app.handleSearchSubmit(event));
