
const SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co";

const SUPABASE_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function checkLogin() {
 const { data, error } = await supabaseClient.auth.getSession();
  console.log("Session:", data.session);
   console.log("Error:", error); 
   
   if (error) {
     alert("Session error: " + error.message);
      return; 
    } 
    
    if (!data.session) { alert("No active login session."); window.location.href = "admin.html"; return; 

    } 
    
    loadPosts(); 
}


// Logout
document.getElementById("logoutBtn").addEventListener("click", async function () {

    await supabaseClient.auth.signOut();

    window.location.href = "admin.html";

});
// Create a new post
document.getElementById("postForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();

    const content = document.getElementById("content").value.trim();

    const imageFile = document.getElementById("image").files[0];

    const message = document.getElementById("postMessage");

    const publishBtn = document.getElementById("publishBtn");


    publishBtn.disabled = true;

    publishBtn.textContent = "Publishing...";

    message.textContent = "";

try {

        let imageUrl = null;


        // Upload image if one was selected
        if (imageFile) {

            const fileName =
                Date.now() + "-" + imageFile.name.replace(/\s+/g, "-");


            const { error: uploadError } =
                await supabaseClient.storage
                    .from("post-images")
                    .upload(fileName, imageFile);


            if (uploadError) {
                throw uploadError;
            }
const { data: imageData } =
                supabaseClient.storage
                    .from("post-images")
                    .getPublicUrl(fileName);


            imageUrl = imageData.publicUrl;

        }


        // Save post in database
        const { error: insertError } =
            await supabaseClient
                .from("posts")
                .insert([
                    {
                        title: title,
                        content: content,
                        image_url: imageUrl
                    }
                ]);
if (insertError) {
            throw insertError;
        }


        message.textContent = "Post published successfully! ✅";

        document.getElementById("postForm").reset();

        loadPosts();


    } catch (error) {

        console.error(error);

        message.textContent =
            "Error: " + error.message;

    }
publishBtn.disabled = false;

    publishBtn.textContent = "Publish Post";

});


// Load posts
async function loadPosts() {

    const postsList = document.getElementById("postsList");

    postsList.innerHTML = "<p>Loading posts...</p>";


    const { data, error } =
        await supabaseClient
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });


    if (error) {
postsList.innerHTML =
            "<p>Error loading posts: " + error.message + "</p>";

        return;

    }


    if (!data || data.length === 0) {

        postsList.innerHTML =
            "<p>No posts yet. Create your first post above.</p>";

        return;

    }


    postsList.innerHTML = "";

data.forEach(function (post) {

        const article = document.createElement("article");

        article.className = "admin-post";


        if (post.image_url) {

            const image = document.createElement("img");

            image.src = post.image_url;

            image.alt = post.title;

            article.appendChild(image);

        }
const title = document.createElement("h3");

        title.textContent = post.title;

        article.appendChild(title);


        const content = document.createElement("p");

        content.textContent = post.content;

        article.appendChild(content);


        const date = document.createElement("small");

        date.textContent =
            new Date(post.created_at).toLocaleString();

        article.appendChild(date);
const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function () {

            deletePost(post.id);

        });


        article.appendChild(deleteButton);


        postsList.appendChild(article);

    });

}

// Delete post
async function deletePost(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this post?");


    if (!confirmDelete) {
        return;
    }


    const { error } =
        await supabaseClient
            .from("posts")
            .delete()
            .eq("id", id);


    if (error) {

        alert("Could not delete post: " + error.message);

        return;
}


    alert("Post deleted successfully.");

    loadPosts();

}


// Start dashboard
loadPosts();