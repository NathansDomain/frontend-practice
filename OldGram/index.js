const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const section = document.getElementById("section");

let html = "";
posts.forEach( (post, index) => {
    html += renderPost(post, index);
});
section.innerHTML = html;

function addLike(index)
{    
    const likesEl = document.getElementById(`likes-${index}`);
    likesEl.textContent=`${++posts[index].likes} likes`
}

function renderPost({name, username, location, avatar, post, comment, likes}, count = 0)
{
    return `
    <div class="post-container" id="js-obj${count}">
        <div class="user-container small-mrg">
            <img class="avatar-img" src="${avatar}">
            <div class="user-text-container" tabindex="0">
                <p class="user-name-txt">${name}</p>
                <p class="user-location-txt">${location}</p>
            </div>
        </div>
        
        <img class="post-img" src="${post}">
        <div class="reaction-container small-mrg">
            <img class="reaction-img heart" src="images/icon-heart.png" tabindex="0" data-index="${count}">
            <img class="reaction-img" src="images/icon-comment.png" tabindex="0">
            <img class="reaction-img" src="images/icon-dm.png" tabindex="0">
        </div>
        
        <div class="response-container small-mrg">
            <p class="likes-txt" id="likes-${count}">${likes} likes</p>
            <div class="comments-container">
                <p class="username-txt">${username}</p>
                <p class="comment-txt">${comment}</p>
            </div>
        </div>
    </div>
    `;
}

section.addEventListener("click", (el) => {
    if (el.target.classList.contains("heart")) {
        const index = Number(el.target.dataset.index);
        addLike(index);
    }
});