
const SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co";

const SUPABASE_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
)

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
            .schema("public")
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
          .schema("public")
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
        .schema("public")
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


// ================= REPAIR MANAGEMENT =================

async function loadRepairs() {

    const repairsList = document.getElementById("repairsList");

    if (!repairsList) {
        return;
    }

    repairsList.innerHTML = "<p>Loading repairs...</p>";

    try {

        const { data, error } = await supabaseClient
            .from("repairs")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error loading repairs:", error);

            repairsList.innerHTML =
                "<p>Error loading repairs: " +
                error.message +
                "</p>";

            return;
        }

        if (!data || data.length === 0) {

            repairsList.innerHTML =
                "<p>No repair bookings found.</p>";

            return;
        }

        repairsList.innerHTML = "";

        data.forEach(function(repair) {

            const repairCard =
                document.createElement("div");

            repairCard.className = "repair-card";


            // Ticket number
            const ticket =
                document.createElement("h3");

            ticket.textContent =
                "🎫 " +
                (repair.ticket_number || "No ticket number");

            repairCard.appendChild(ticket);


            // Customer
            const customer =
                document.createElement("p");

            customer.innerHTML =
                "<strong>Customer:</strong> " +
                escapeRepairHTML(repair.customer_name);

            repairCard.appendChild(customer);


            // Phone
            const phone =
                document.createElement("p");

            phone.innerHTML =
                "<strong>Phone:</strong> " +
                escapeRepairHTML(repair.phone);

            repairCard.appendChild(phone);


            // Service
            const service =
                document.createElement("p");

            service.innerHTML =
                "<strong>Service:</strong> " +
                escapeRepairHTML(repair.service);

            repairCard.appendChild(service);


            // Preferred date
            const date =
                document.createElement("p");

            let formattedDate = "Not provided";

            if (repair.preferred_date) {

                formattedDate =
                    new Date(
                        repair.preferred_date
                    ).toLocaleDateString(
                        "en-ZA",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );
            }

            date.innerHTML =
                "<strong>Preferred Date:</strong> " +
                formattedDate;

            repairCard.appendChild(date);


            // Customer message
            const message =
                document.createElement("p");

            message.innerHTML =
                "<strong>Message:</strong> " +
                escapeRepairHTML(
                    repair.message || "No message"
                );

            repairCard.appendChild(message);


            // Status label
            const statusLabel =
                document.createElement("label");

            statusLabel.innerHTML =
                "<strong>Repair Status:</strong>";

            repairCard.appendChild(statusLabel);


            // Status dropdown
            const statusSelect =
                document.createElement("select");

            statusSelect.className =
                "repair-status-select";


            const statuses = [
                "Booking Received",
                "Device Received",
                "Under Diagnosis",
                "Repair In Progress",
                "Waiting for Parts",
                "Repair Completed",
                "Ready for Collection",
                "Collected",
                "Cancelled"
            ];


            statuses.forEach(function(status) {

                const option =
                    document.createElement("option");

                option.value = status;

                option.textContent = status;

                if (repair.status === status) {
                    option.selected = true;
                }

                statusSelect.appendChild(option);

            });


            repairCard.appendChild(statusSelect);


            // Update button
            const updateButton =
                document.createElement("button");

            updateButton.className =
                "update-repair-btn";

            updateButton.textContent =
                "Update Status";


            updateButton.addEventListener(
                "click",
                function() {

                    updateRepairStatus(
                        repair.id,
                        statusSelect.value
                    );

                }
            );


            repairCard.appendChild(updateButton);


            // Delete button
            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "delete-repair-btn";

            deleteButton.textContent =
                "Delete Repair";


            deleteButton.addEventListener(
                "click",
                function() {

                    deleteRepair(repair.id);

                }
            );


            repairCard.appendChild(deleteButton);


            repairsList.appendChild(repairCard);

        });

    } catch (error) {

        console.error(error);

        repairsList.innerHTML =
            "<p>Something went wrong while loading repairs.</p>";

    }

}


// ================= ESCAPE HTML =================

function escapeRepairHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null ? "" : value;

    return div.innerHTML;
}

// ============== UPDATE REPAIR STATUS =============

async function updateRepairStatus(repairId, newStatus) {

    try {

        const { data, error } = await supabaseClient
            .from("repairs")
            .update({
                status: newStatus
            })
            .eq("id", repairId)
            .select("id, ticket_number, status");
    

        if (error) {

            console.error("Status update error:", error);

            alert(
                "Could not update repair status:\n" +
                error.message
            );

        }


        alert(
            "Repair status updated successfully! ✅\n\n" +
            "New Status: " +
            newStatus
        );

        await loadRepairs();

    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong while updating the repair."
        );
    }
}


// ================= DELETE REPAIR =================

async function deleteRepair(repairId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this repair booking?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const { error } =
            await supabaseClient
                .from("repairs")
                .delete()
                .eq("id", repairId);


        if (error) {

            console.error(
                "Delete repair error:",
                error
            );

            alert(
                "Could not delete repair:\n" +
                error.message
            );

            return;
        }


        alert(
            "Repair booking deleted successfully!"
        );


        loadRepairs();


    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong while deleting the repair."
        );

    }

}

// ================= DELETE POST =================

async function deletePost(id) {

    console.log("Post ID to delete:", id);

    if (id === null || id === undefined) {

        alert(
            "Could not delete post: Post ID is missing."
        );

        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const { error } = await supabaseClient
            .from("posts")
            .delete()
            .eq("id", id);

        if (error) {

            console.error("Delete post error:", error);

            alert(
                "Could not delete post:\n" +
                error.message
            );

            return;
        }

        alert(
            "Post deleted successfully! ✅"
        );

        await loadPosts();

    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong while deleting the post."
        );
    }
}



// Start dashboard
loadPosts();
loadRepairs();