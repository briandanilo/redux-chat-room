import { createStore } from 'redux';
import  Server  from './api.js';
import Views from './views.js';

export default function app() {

    const initialState = { items: [], }

    const storeDispatchProcessor = function (state,action) {

      if (state === undefined)
        state = initialState;

      switch (action.type){
        case "VISITOR_ARRIVES":
          views.welcomeVisitor();
          return state
        case "LOGIN_ATTEMPT":
          views.welcomeUser(action);
          server.getChatHistory();
          state.username = action.username;
          return state
        case "REQUEST_CHAT_HISTORY_DATA":
          server.getChatHistory();
          return state
        case "UPDATE_CHAT_HISTORY_VIEW":
          state.history = action.history;
          $('#chatHistory').html(views.showChatHistory(state));
          return state
        case "SUBMIT_NEW_CHAT":
          server.postToServer(state,action)
          return state
        case "DELETE_CHAT_BY_ID":
          console.log("deleting ",action.idToDelete)
          server.deleteChatById(action.idToDelete)
          return state;
        default:
          return state
      }
    }

    const store = createStore(storeDispatchProcessor);
    const server = new Server(store)
    const views = new Views(store)

    store.dispatch({ type: "VISITOR_ARRIVES" })

    setInterval(server.getChatHistory,2000);

}
