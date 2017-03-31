export default function Server(store){
  const dbUrl = 'http://tiny-za-server.herokuapp.com/collections/bdChat';
  var settings =  { contentType: 'application/json' }

  this.getChatHistory = function (){
    console.log("query db")
    settings.type = 'GET';
    settings.url = dbUrl;
     $.ajax(settings).then(function(d,s,x){
       console.log("data from server! ",d)
       store.dispatch({type:"UPDATE_CHAT_HISTORY_VIEW",history:d})
     })
  }

  this.postToServer = function (state,action){
    console.log("state, action ",state,action);
    settings.url = dbUrl;
    settings.data = JSON.stringify({
      sender: state.username,
      body: action.chatBody,
      timestamp: new Date()
    })
    settings.type = "POST";
     $.ajax(settings).then(function(d,s,x){
       console.log("data from server! ",d)
       store.dispatch({type:"REQUEST_CHAT_HISTORY_DATA"})
     })
  }

  this.deleteChatById = function (id) {
    settings.type = "DELETE";
    settings.url = dbUrl+'/'+id;
     $.ajax(settings).then(function(d,s,x){
       console.log("data from server! ",d)
       store.dispatch({type:"REQUEST_CHAT_HISTORY_DATA"})
     })
  }

}
