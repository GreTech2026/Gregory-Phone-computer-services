
 SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co"; 
 const SUPABASE_ANON_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ";
const supabaseClient = window.supabase.createClient( 
SUPABASE_URL, 
 SUPABASE_ANON_KEY );

 //=============================== 
 //LOAD NEWS POSTS 
 // =============================== 
async function loadNews() {
    
    const newsList = 
    document.getElementById("newsList");
     newsList.innerHTML = '<p class="loading">Loading latest news...</p>'; 
     
     const { data, error } = 
     await supabaseClient 
     .schema("public") 
     .from("posts") 
     .select("*") 
     .order("created_at", { 
        ascending: false 
    }); 
    
    
    if (error) {
         console.error("News loading error:", error);

            newsList.innerHTML =
'<p class="news-error=>Error loadinfg news: ' +
error.message +
'</p>';

         return;
        
        } 
        
        if (!data || data.length === 0) {
            
            newsList.innerHTML = '<p class="no-news">No news and updates available yet.</p>';
            
            return;
        
        } 
        
        newsList.innerHTML = "";
        
        data.forEach(function (post) {
            
            const article = document.createElement("article");
            
            article.className = "news-card";
            
            // ===============================
            //  IMAGE
            // =============================== 
           
            if (post.image_url) {
                
                const image =
                 document.createElement("img");
                 
                 image.src = post.image_url; image.alt = post.title ||
                  "GREGORY PHONE AND COMPUTER SERVICES"; 
                  
                  article.appendChild(image);
                
                }
                
                // =============================== // CONTENT // ===============================
                // 
                
                
                const cardContent =
                 document.createElement("div"); 
                 
                 cardContent.className = "news-card-content";
                 
                 
                 const title = 
                 document.createElement("h3");
                 
                 title.textContent =
                  post.title; cardContent.appendChild(title);
                  
                  const date = document.createElement("span"); 
                  
                  date.className = 
                  "news-date";
                  
                  
                  date.textContent = 
                  new Date(
                     post.created_at
                     ).toLocaleDateString(
                         "en-ZA",
                         
                         {
                            
                            day: "numeric",
                            month: "long", 
                            year: "numeric" 
                        } 
                    );
                     cardContent.appendChild(date);
                     
                     const content = 
                     document.createElement("p"); 
                     
                     content.className = 
                     "news-content"; 
                     
                     content.textContent = 
                     post.content;
                     
                     cardContent.appendChild(content);
                     
                     article.appendChild(cardContent);
                      newsList.appendChild(article); 
                    
                    }); 
                }
                
                // =============================== 
                // START
                // ===============================
                
                
                loadNews();