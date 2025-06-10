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

// Fetch joke from internal API and display it

async function fetchJoke() {
    try {
        const res = await fetch(`${fetche}/joke`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
         }
     
     });
     if (!res.ok) {
         throw new Error("Failed to fetch joke");
        
    }
const data = await res.json();
const jokeBox = document.getElementById("joke-box");
jokeBox.innerHTML = ""; // clear old content

data.forEach(joke => {
    const jokeDiv = document .createElement("div");
    jokeDiv.classList.add("parents","joke");

    jokeDiv.innerHTML = `
    <P><strong>Joke:</strong> ${joke.jokeText}<\p>
    <P><strong>Author:</strong> ${joke.author.name}<\p>
    <P><strong>Category:</strong> ${joke.category.name}<\p>
    <P>👍 ${joke.likes} &nbsp;👎 ${joke.dislikes}<\p>
    <hr />
    `;
    jokeBox.appendChild(jokeDiv);
    // Show the joke in comment area
    comments.innerHTML = `<div> class = "fetched-joke"><strong> Joke of the day:</strong> ${data.joke ||JSON.stringify(data)}</div>`;

});
// Show the joke in comment area
    //comments.innerHTML = `<div> class = "fetched-joke"><strong> Joke of the day:</strong> ${data.joke ||JSON.stringify(data)}</div>`;
    } catch (error) {
        console.error("Error fetching jokes:", error);
        document.getElementById("joke-box").textContent = "Could not load jokes.";
        comments.innerHTML = "<div class = 'error'>failed to load joke from server.</div>"
    }
}


// Enable/disable publish button based on comment input

userComment.addEventListener("input", () => {
    if (!userComment.value.trim()) {
        publishBtn.setAttribute("disabled", "disabled");
        publishBtn.classList.remove("abled")
    }else{
        publishBtn.removeAttribute("disabled");
        publishBtn.classList.add("abled")
    }
});

// Add user post to DOM

function addpost(){
    
    if (!userComment.value.trim()) return;
    userId.name = userName.value.trim() || "Anonymous";
    userId.identity = userId.name !== "Anonymous";
    userId.Image = userId.identity ? "user.png" : "anonymous.png";
    userId.message = userComment.value.trim();
    userId.date = new Date().toLocaleString();
    const published = `
    <div class = "parents">
       <img src="pix/users-.png">
       <div>
       <h1>${userId.name}</h1>
       <textarea readonly>${userId.message}</textarea>
       <div class="engagement-buttons">
       <button class="button Like">👍<span id="likeCount">0</span></button>
       <button class="button Dislike">👎<span id="dislikeCount">0</span></button>
       </div>
       <span class = "date"> ${userId.date}</span>
       </div>
    </div>`;
    comments.innerHTML += published;
    userComment.value = "";

     
    document.getElementById("comment").textContent = document.querySelectorAll(".parents").length; 

    setupLikeDislikeButtons();
}
// handle like / dislike buttons
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
// Run when DOM is ready
// Kald funktionen første gang siden indlæses for eksisterende kommentarer
document.addEventListener('DOMContentLoaded', () => {
    setupLikeDislikeButtons();
    fetchJoke(); // call internal API on page load
});
publishBtn.addEventListener("click",addpost);






