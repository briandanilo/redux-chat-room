import moment from 'moment';

export default function Views(store){

  function deleteButtonHandler(e){
      let i = e.currentTarget.id;
      store.dispatch({type:"DELETE_CHAT_BY_ID",idToDelete:i})
  }

  function loginHandler(e){
    let name = $('#username-form').val();
    store.dispatch({type:"LOGIN_ATTEMPT",username:name});
  }

  function chatSubmitHandler(e){
    let body = $('#chat-form').val();
    store.dispatch({type:"SUBMIT_NEW_CHAT",chatBody:body});
  }

  function registerSignalHandlers() {
    $('.list-group').on('click','.delete-btn',deleteButtonHandler);
    //for not logged in visitors
    $('#login-btn').on('click',loginHandler);
    $("#username-form").keydown(function(e){
        if(e.keyCode == 13)
          loginHandler();
    });

    //for logged in users
    $('#chat-btn').on('click',chatSubmitHandler);
    $("#chat-form").keydown(function(e){
        if(e.keyCode == 13)
          chatSubmitHandler();
    });
  }

  //not logged in
  this.welcomeVisitor = function (){
    $('#login').show()
    $('#chat').hide()
    registerSignalHandlers()
  }

  //logged in
  this.welcomeUser = function (action){
    $('#login').hide()
    $('#chat').show()
    $('#username-form').val("").attr("placeholder","start trolling!")
    $('#welcome-banner').html(`Hello ${action.username}`);
  }

  this.showChatHistory = function(state) {
    let history = state.history;
    let user = state.username;
    let html =``;
    history.filter(function(i){
      return i.body&&i.timestamp&&i.sender
    }).sort(function(a,b){
      return a._id - b._id;
    }).forEach(function(i){
      console.log(i)
      let ts = moment(i.timestamp).fromNow();
      if (i.sender == user || user=='admin')
        html += `<li class="list-group-item"><strong>${i.sender} (${ts}):</strong> ${i.body}
        <button class="delete-btn" id="${i._id}">DELETE</button></li>`
      else
        html += `<li class="list-group-item"><strong>${i.sender} (${ts}):</strong> ${i.body}</li>`
    })
    return html;
  }

}
