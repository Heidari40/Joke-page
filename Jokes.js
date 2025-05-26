
const userId = {
    name : null,
    identity : null,
    Image: null,
    message: null,
    date: null
}

const userComment = document.querySelector(".usercomment");
const publishBtn = document.querySelector("#publish");
const comments = document.querySelector(".Comments")
const userName = document.querySelector(".user");

const fetche = "https://10.0.1.211/api";

let global = async() =>{

    const res = await fetche(`${fetche}/joke`, {
       method: "GET",
       headers: {"Content-Type": "application/json"
    }

});

if (!res.ok){
    console.error("Error fetchin")
    throw error
}
const data = await res.json();
comments.innerHTML = JSON.stringify(data);

}
publishBtn.addEventListener("click", () =>{
  getAll();
})








userComment.addEventListener("input", s => {
    if (!userComment.value) {
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled")
    }else{
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled")
    }
})

function addpost(){
    console.log("the button works!")
    if (!userComment.value) return;
    userId.name = userName.value;
    if(userId.name === "Anonymous"){
        userId.identity = false;
        userId.Image = "anonymous.png";
    }else{
        userId.identity = true;
        userId.Image = "user.png"
    }
    userId.message = userComment.value;
    userId.date = new Date().toLocaleString();
    let published = 
    `<div class = "parents">
    <img src="pix/users-.png">
       <div>
       <h1>${userId.name}</h1>
       <textarea>${userId.message}</textarea>
       <div class="engagement-buttons">
       <button id="LikeBtn" class="button Like">👍<span id="likeCount">0</span></button>
       <button id="DislikeBtn" class="button Dislike">👎<span id="dislikeCount">0</span></button>
       </div>
       <span class = "date"> ${userId.date}</span>
       </div>
    </div>`;

    comments.innerHTML += published;
    userComment.value = "";

    let commentsNum = document.querySelectorAll(".parents").length;
    document.getElementById("comment").textContent = commentsNum;

    setupLikeDislikeButtons();
}
function setupLikeDislikeButtons() {
    const allParents = document.querySelectorAll('.parents');

    allParents.forEach(parent => {
        const likeBtn = parent.querySelector('.Like');
        const dislikeBtn = parent.querySelector('.Dislike');
        const likeCount = parent.querySelector('#likeCount');
        const dislikeCount = parent.querySelector('#dislikeCount');
        
        let likes = 0;
        let dislikes = 0;
        let isLiked = false;
        let isDisliked = false;

        likeBtn.addEventListener('click', () => {
            if (!isLiked) {
                likes++;
                isLiked = true;
                likeBtn.classList.add('active');
                
                if (isDisliked) {
                    dislikes--;
                    isDisliked = false;
                    dislikeBtn.classList.remove('active');
                }
            } else {
                likes--;
                isLiked = false;
                likeBtn.classList.remove('active');
            }
            likeCount.textContent = likes;
            dislikeCount.textContent = dislikes;
        });

        dislikeBtn.addEventListener('click', () => {
            if (!isDisliked) {
                dislikes++;
                isDisliked = true;
                dislikeBtn.classList.add('active');
                
                if (isLiked) {
                    likes--;
                    isLiked = false;
                    likeBtn.classList.remove('active');
                }
            } else {
                dislikes--;
                isDisliked = false;
                dislikeBtn.classList.remove('active');
            }
            likeCount.textContent = likes;
            dislikeCount.textContent = dislikes;
        });
        parent.dataset.hasListeners = "true";
    
    });
}

// Kald funktionen første gang siden indlæses for eksisterende kommentarer
document.addEventListener('DOMContentLoaded', () => {
    setupLikeDislikeButtons();
});
publishBtn.addEventListener("click",addpost);

