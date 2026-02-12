let currentUser = "Renuka";
let followers = parseInt(localStorage.getItem("followers")) || 0;
let isFollowing = false;
let posts = JSON.parse(localStorage.getItem("posts")) || [];

document.getElementById("username-display").innerText = currentUser;
document.getElementById("followers-count").innerText = `Followers: ${followers}`;

// Follow System
function toggleFollow() {
    if (!isFollowing) {
        followers++;
        isFollowing = true;
    } else {
        followers--;
        isFollowing = false;
    }

    localStorage.setItem("followers", followers);
    document.getElementById("followers-count").innerText = `Followers: ${followers}`;
}

// Create Post
function createPost() {
    const content = document.getElementById("post-input").value.trim();
    if (!content) return;

    const newPost = {
        id: Date.now(),
        user: currentUser,
        content: content,
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("post-input").value = "";
    displayPosts();
}

// Display Posts
function displayPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        postDiv.innerHTML = `
            <h4>${post.user}</h4>
            <p>${post.content}</p>
            <div class="post-actions">
                <button onclick="likePost(${post.id})">❤️ ${post.likes}</button>
            </div>
            <div class="comment-box">
                <input type="text" id="comment-${post.id}" placeholder="Write a comment">
                <button onclick="addComment(${post.id})">Comment</button>
                <div id="comments-${post.id}"></div>
            </div>
        `;

        container.appendChild(postDiv);

        // Display comments
        const commentContainer = document.getElementById(`comments-${post.id}`);
        post.comments.forEach(c => {
            commentContainer.innerHTML += `<div class="comment">${c}</div>`;
        });
    });
}

// Like Post
function likePost(id) {
    const post = posts.find(p => p.id === id);
    post.likes++;
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}

// Add Comment
function addComment(id) {
    const input = document.getElementById(`comment-${id}`);
    const commentText = input.value.trim();
    if (!commentText) return;

    const post = posts.find(p => p.id === id);
    post.comments.push(commentText);
    localStorage.setItem("posts", JSON.stringify(posts));
    input.value = "";
    displayPosts();
}

displayPosts();
