let posts = [];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
  return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
  return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
  return likedPostsId?.length && likedPostsId.includes(id);
};

const addToLiked = (id) => {
  likedPostsId.push(id);
  showPosts(posts);
};

const reportPost = (id) => {
  reportedPostsId.push(id);
  const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
  showPosts(remainingPosts);
};

const displayContent = (text) => {
  return text.length < 30 ? text : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
  if (id === "posts") {
    document.getElementById("posts").style.display = "grid";
    document.getElementById("liked").style.display = "none";
    document.getElementById("reported").style.display = "none";
  } else if (id === "liked") {
    document.getElementById("liked").style.display = "block";
    document.getElementById("posts").style.display = "none";
    document.getElementById("reported").style.display = "none";

    displayLikedPosts();
  } else {
    document.getElementById("reported").style.display = "block";
    document.getElementById("posts").style.display = "none";
    document.getElementById("liked").style.display = "none";

    displayReportedPosts();
  }
};

const createPost = (post) => {
  const image = post.image;
  const div = document.createElement("article");
  div.classList.add("post");

  div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${post.id
    })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${post.comments[0].user}
                      </a>
                      ${post.comments[0].text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
  return div;
};

const showPosts = (posts) => {
  const productsContainer = document.getElementById("posts");
  productsContainer.innerHTML = "";

  posts.forEach((post) => {
    const div = createPost(post);
    productsContainer.appendChild(div);
  });
};

const displayLikedPosts = () => {
  document.getElementById("liked").innerHTML='';
  const likedPosts = getLikedPosts();
  likedPosts.forEach((post) => {
    const div = createPost(post);
    document.getElementById("liked").appendChild(div);
    
  });
};

const displayReportedPosts = () => {
  document.getElementById("reported").innerHTML=''
  const reportedPosts = getReportedPosts();
  reportedPosts.forEach((post) => {
    const div = createPost(post);
    document.getElementById("reported").appendChild(div);
  });
};

const loadPosts = async () => {
  let data = await fetch('../data/posts.json');
  posts = await data.json();
  showPosts(posts);
}

loadPosts();

const answer = () =>{
  const bonus =  document.getElementById('bonus').innerHTML =`
  <h1>How javascript actually works ?</h1>
  <br>
  <h5>A Web browser is used to run the JavaScript program. A standard Web page contains JavaScript code. The browser has a built-in interpreter that interprets and executes the JavaScript code it finds when it loads the website. To put it another way, when we run a JavaScript application in a web browser, the browser's engine receives the JavaScript code and executes it in order to provide the intended output. JavaScript contains only one Call Stack, despite the fact that it is a single-threaded programming language. As a result, it can only do one thing in today's world. The Call Stack is a data structure that keeps track of our program's location. When we step inside it, we place a function on top of the stack. We erupt off the top of the stack when we return from a function.</h5>
  <br>
  <br>
  <br>
  <h1>Write down The Difference Between Local Storage and Session Storage ?</h1>
  <br>
  <h5>The expiration date is the only significant difference between localStorage and sessionStorage. The sessionStorage read-only property can be used to access Session Storage objects. SessionStorage differs from localStorage in that localStorage data does not expire, however, sessionStorage data is removed after the page session expires. Since LocalStorage is not session-based, it can only be erased manually or using JavaScript. SessionStorage, on the other hand, is session-based and works per window or tab. That states that information is only saved for the duration of a session. SessionStorage has a storage capacity of exactly 5MB, whereas LocalStorage has a storage capacity of 5MB/10MB. In a nutshell, the distinction between LocalStorage and Session Storage was obvious.</h5>
  `
}