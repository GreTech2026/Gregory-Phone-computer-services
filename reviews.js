
/* ================= REVIEW ELEMENTS ================= */

const reviewForm = 
document.getElementById("reviewForm");

const reviewsGrid =
 document.getElementById("reviewsGrid");

 const reviewMessage =
  document.getElementById("reviewMessage");
  
  const submitReviewBtn = 
  document.getElementById("submitReviewBtn");
  
  const reviewRating = 
  document.getElementById("reviewRating"); 
  
  const starButtons =
   document.querySelectorAll( "#starRating button" );
   
   
   /* ================= STAR RATING ================= */ 
   
   starButtons.forEach(function(button) { 

    button.addEventListener("click", function() {

         const rating = 
         Number(button.dataset.rating);
          reviewRating.value = rating; starButtons.forEach(function(star) { 
            
            const starRating =
             Number(star.dataset.rating); 
             
             if (starRating <= rating) {
                
                star.classList.add("selected");
            
            } else {
                
                star.classList.remove("selected"); 
            
                }
            
            }); 
        
        
   });
    
    });
    
      /* ================= LOAD REVIEWS ================= */

async function loadReviews() {

    const { data, error } =
        await supabaseClient
            .from("reviews")
            .select("*")
            .eq("approved", true)
            .order("created_at", {
                ascending: false
            });

    if (error) {

        console.error(
            "Error loading reviews:",
            error
        );

        return;
    }


    /* ================= DISPLAY REVIEWS ================= */

    const reviewsGrid =
    document.getElementById("reviewsList");



    data.forEach(function(review) {

        const reviewCard =
            document.createElement("div");

        reviewCard.className =
            "review-card live-review";


        const stars =
            document.createElement("div");

        stars.className =
            "stars";

        stars.textContent =
            "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);


        const text =
            document.createElement("p");

        text.textContent =
            `"${review.review_text}"`;


        const customerInfo =
            document.createElement("div");

        customerInfo.className =
            "customer-review-info";


        const name =
            document.createElement("h3");

        name.textContent =
            review.customer_name;


        const verified =
            document.createElement("span");

        verified.className =
            "verified-review";

        verified.innerHTML =
            '<i class="fas fa-circle-check"></i> Verified Customer';


        const date =
            document.createElement("small");

        date.textContent =
            new Date(
                review.created_at
            ).toLocaleDateString(
                "en-ZA",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );


        customerInfo.appendChild(name);

        customerInfo.appendChild(verified);

        customerInfo.appendChild(date);


        reviewCard.appendChild(stars);

        reviewCard.appendChild(text);

        reviewCard.appendChild(customerInfo);


        reviewsGrid.appendChild(
            reviewCard
        );

    });


    /* ================= RATING SUMMARY ================= */

    const reviewCount =
        document.getElementById(
            "reviewCount"
        );

    const averageRating =
        document.getElementById(
            "averageRating"
        );


    const liveReviewCount =
        data.length;


    const liveRatingTotal =
        data.reduce(
            function(total, review) {

                return total + review.rating;

            },
            0
        );


    const totalReviews =
        liveReviewCount;


    const totalRating =
        liveRatingTotal;


    const average =
        totalReviews > 0
            ? totalRating / totalReviews
            : 0;


    averageRating.textContent =
        average.toFixed(1);


    reviewCount.textContent =
        totalReviews;

}    
                     
    /* ================= SUBMIT REVIEW ================= */                 
                     
 if (reviewForm) {
     reviewForm.addEventListener(
         "submit",
          async function(event) {
            
            event.preventDefault(); 

            const name =
            document
             .getElementById("reviewName")
              .value 
              .trim(); 
              
              const rating = 
              Number( 
                reviewRating.value 
            
            ); 
            
            const reviewText = 
            document
             .getElementById("reviewText")
              .value
               .trim(); 
               
               if (!name) { 
                
                reviewMessage.textContent =
                 "Please enter your name."
                 
                 return; 
                
                } 
                
                if (rating < 1 || rating > 5) {
                    
                    reviewMessage.textContent =
                    "Please select a star rating.";
                    
                    return;
                
                }
                
                if (!reviewText) { 
                    
                    reviewMessage.textContent = 
                    "Please write your review.";
                    
                    return;
                
                } 
                
                submitReviewBtn.disabled = 
                
                true;
                
                submitReviewBtn.innerHTML =
                 '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                 
                 reviewMessage.textContent = 
                 "";
                 
                 try { 
                    
                    const { error } = await supabaseClient .from("reviews") .insert([ { customer_name: name, rating: rating, review_text: reviewText, approved: false } ]); if (error) { console.error(error); reviewMessage.textContent = "Could not submit your review. Please try again."; return; } reviewMessage.textContent = "Thank you! ⭐ Your review has been submitted and is waiting for approval."; reviewForm.reset(); reviewRating.value = "0"; starButtons.forEach( function(star) { star.classList.remove( "selected" ); } ); } catch (error) { console.error(error); reviewMessage.textContent = "Something went wrong. Please try again."; } finally { submitReviewBtn.disabled = false; submitReviewBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Review'; 


                    } 
                
                }
            
            );
        
        } 
  /* ================= START ================= */
                     
                     
loadReviews();