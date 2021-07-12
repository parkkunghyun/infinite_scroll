const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');


//1. 일단 가져온다
//2. 그다음 보여준다
//3. 그다음 posts 안에 넣는다

let limit =5
let page = 1

//타이틀, 아이디, userid, 바디로 구성된 여러개의 배열? 이 있는데 이걸 fetch로 가져오기

async function getPosts() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
  
    const data = await res.json();
    return data;
  }


// 보여주기
// forEach로 가져올때 걍 전부 가져오나??
// 여러개가 비슷하다면 html에 쓰지말고 js에 이렇게 반복하기
// 이렇게 =>  forEach(post)

async function showPosts() {
    const posts = await getPosts();
  
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.classList.add('post');
      postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
      `;
  
      postsContainer.appendChild(postEl);
    });
  }


//show 가 있을때 잠깐 로딩 표시인 동그래미 3개 나오고 
//
function showLoading(){
    loading.classList.add('show')
    
    setTimeout(()=>{
        loading.classList.remove('show')

        setTimeout(()=>{
            page++
            showPosts()
        },300)
    },1000)
}

//말 그대로 내가 검색해서 나오는 애들이 있으면 display를 flex로 ,
// 만약에 없다면 display를 none으로 바꾸기

function filterPosts(e){
    const term = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const body =post.querySelector('.post-body').innerText.toUpperCase()

        //title 이나 body에 인덱스 번호가 몇번인지 확인하기 인덱스는 0부터 시작이니까 >-1 이라고 표현!!
         
        if(title.indexOf(term)> -1 || body.indexOf(term) > -1 ) {
            post.style.display = 'flex'
        }
        else {
            post.style.display = 'none'
        }
    })
}

//일단 먼저 보여주기 

showPosts()

//이거는 스크롤인데 스크롤이 내려간게 scrollHeight 보다 길면 showLoading하기!!
 
window.addEventListener('scroll', ()=>{
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight-5) {
        showLoading()
    }
})

filter.addEventListener('input', filterPosts)