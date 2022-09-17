let posts=[
  {title:"first post" , body:"body of frst post" , createdAt:new Date()},
  {title:"second post" , body:"body of second post" , createdAt:new Date()}
]


let user ={
  name:"John",
  lastActivity:""
}

let intervalId ;

function getPost(){
  clearInterval(intervalId);
  intervalId = setInterval(()=>{
    let output ='';
    posts.forEach(post=>{
      output+=`<li>${post.title} and it was created ${(new Date() - post.createdAt )/1000} sec ago</li>`
    })
    document.body.innerHTML = output; 
  },1000)
}

function add(post){
  return new Promise((resolve , reject)=>{
    setTimeout(()=>{
      posts.push({...post , createdAt: new Date()});
      console.log([...posts]);
      resolve(`${posts}`);
    },100)  
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
      console.log(posts);
    },3000)
  })
}

function createPost(){
  return new Promise((resolve , reject)=>{
    setTimeout(()=>{
      
      let post = {title:"third post" , body:"body of third post" };
      add(post).then(getPost).catch(err=>{console.log(err)});
      
      console.log(posts)

      resolve(posts);
    },1000)
    
  })
}

function updateLastUserActivityTime(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      user.lastActivity = new Date().getTime();
      console.log(`last updated time of user ${user.lastActivity}`)
      resolve(user.lastActivity); 
    },2000)
      
  })
}


const promise1 = Promise.resolve("Hello World");
const promise2 = 10 ;
const promise3 = new Promise((resolve , reject)=>{
  setTimeout(resolve, 2000 , "goodbye");
})

Promise.all([promise1, promise2 , promise3]).then(values=>console.log(values))
Promise.all([createPost() ,updateLastUserActivityTime() , deletePost() ]).then((result)=>{console.log(result)})


