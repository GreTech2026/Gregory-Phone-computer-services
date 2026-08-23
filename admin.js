
const SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co";

const SUPABASE_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
);

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Logging in...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        message.textContent = "Login failed: " + error.message;
        return;
    }

    if (!data.session) {
        message.textContent = "Login failed: No session created.";
        return;
    }

    message.textContent = "Login successful!";

    window.location.replace("dashboard.html");

}); 
