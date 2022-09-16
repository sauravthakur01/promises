let posts=[
  {title:"first post" , body:"body of frst post" , createdAt:new Date().getTime()},
  {title:"second post" , body:"body of second post" , createdAt:new Date().getTime()}
]

let intervalId ;

function getPost(){
  clearInterval(intervalId);
  intervalId = setInterval(()=>{
    let output ='';
    posts.forEach(post=>{
      output+=`<li>${post.title} and it was created ${(new Date().getTime() - post.createdAt )/1000} sec ago</li>`
    })
    document.body.innerHTML = output; 
  },1000)
}

function add(post){
  return new Promise((resolve , reject)=>{
    setTimeout(()=>{
      posts.push({...post , createdAt: new Date().getTime()});

      let error = false ;

      if(!error){
        resolve();
      }else{
        reject("error  error")
      }
    },1000)  
  })
}


function deletePost(){
  return new Promise ((resolve , reject)=>{
    setTimeout(()=>{
      if(posts.length>0){
        resolve(posts.pop());
      }else{
       reject("Array is Empty Now");
      }
    },1000)
  })
}


add({title:"third post" , body:"body of third post" })
.then(getPost);

add({title:"fourth post" , body:"body of fourth post" })
.then(()=>{
  getPost();
  deletePost().then(()=>{
    getPost();
    deletePost().then(()=>{
      getPost();
      deletePost().then(()=>{
        getPost();
        deletePost().then(()=>{
          getPost();
          deletePost().then(()=>{})
          .catch(err=>{console.log("inside" , err)}) //////this err comes from reject
        })
      })
    })
  })
});