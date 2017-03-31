export default function Views(store){

  this.showChatHistory = function(history) {

    let html =`<li>Chat History!</li>`
    history.filter(function(i){
      return i.body&&i.timestamp&&i.sender
    }).forEach(function(i){
      html += `<li>${i.sender} says ${i.body}</li>`
    })

    return html;

  }
}
