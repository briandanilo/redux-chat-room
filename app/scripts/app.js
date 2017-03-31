import { createStore } from 'redux';
import  Server  from './api.js';
import Views from './views.js';

export default function app() {

    const initialState = { items: [], }

    const storeDispatchProcessor = function (state,action) {

      if (state === undefined)
        state = initialState;

      switch (action.type){
        case "TESTING":
          console.log("it works. state ",state);
          return state
        case "ADD_ITEM":
          var i = state.items.slice();
          i.push(action.item)
          return Object.assign(state,{items:i})
        case "REMOVE_ITEM":
          var i = state.items.slice();
          i.splice(action.index,1)
          return Object.assign(state,{items:i})
        case "READ_ENTIRE_DB":
          server.getAll();
          return state
        case "UPDATE_CHAT_HISTORY":
          console.log("state ",state);
          console.log("action ",action.history)
          state.history = action.history;
          console.log("send ",state.history)
          $('#chatHistory').html(views.showChatHistory(state.history));
          console.log("new state ",state)
          return state
        default:
          return state
      }

    }

    const store = createStore(storeDispatchProcessor);
    const server = new Server(store)
    const views = new Views(store)

    store.dispatch({ type: "TESTING" })
    store.dispatch({ type: "ADD_ITEM", item: 'apples' })
    store.dispatch({ type: "ADD_ITEM", item: 'oranges' })
    store.dispatch({ type: "TESTING" })
    store.dispatch({ type: "REMOVE_ITEM", index: 1})
    store.dispatch({ type: "TESTING" })
    store.dispatch({ type: "READ_ENTIRE_DB" })
    //store.dispatch({ type: "UPDATE_CHAT_HISTORY" })

    //api.sayHi();
}
