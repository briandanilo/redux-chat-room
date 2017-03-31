export default function Server(store){
  const dbUrl = 'http://tiny-za-server.herokuapp.com/collections/bdChat';
  var settings =  { contentType: 'application/json', url: dbUrl }


  this.getAll = function (){
    console.log("query db")
    settings.type = 'GET';
     $.ajax(settings).then(function(d,s,x){
       console.log("data from server! ",d)
       store.dispatch({type:"UPDATE_CHAT_HISTORY",history:d})
     })
  }


  this.createBlogPostView =
  `<h2>Create New Blog Post<h2>
   <form>
   <input type="text" id="blog-title" placeholder="post title"><br>
   <input type="text" id="blog-body" placeholder="post body"><br>
   <button id="submit-post">submit</button>
   </form>
  `;


  this.submitBtnClickHandler = function (e){
    e.preventDefault();
    let title = $('#blog-title').val();
    let body = $('#blog-body').val();
    let blogPost = new BlogPost(title,body);
    (title && body) ? postToServer(blogPost) : alert("clown")
  }


}
