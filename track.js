/* ================= SUPABASE CONNECTION ================= */ 
const SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ"; 
const supabaseClient = 
window.supabase.createClient(
    SUPABASE_URL, 
    SUPABASE_KEY 
); 

/* ================= TRACK REPAIR ================= */

const trackForm =
 document.getElementById("trackForm"); 
 
 const trackResult =
  document.getElementById("trackResult");
  
  const trackBtn = 
  document.getElementById("trackBtn");
  
  trackForm.addEventListener(
     "submit", 
     async function(event) {
        
        event.preventDefault();
        
        const ticketNumber = 
        document 
        .getElementById("ticketNumber") 
        .value 
        .trim() 
        .toUpperCase();
        
        if (!ticketNumber) {
            
            trackResult.innerHTML = 
            "<p>Please enter your repair ticket number.</p>"; 
            
            return; } 
            
            trackBtn.disabled = true; 
            
            trackBtn.innerHTML = 
            '<i class="fas fa-spinner fa-spin"></i> Checking...';
            
            trackResult.innerHTML = "<p>Checking your repair...</p>"; 
            
            try
            
            {
                
                const { data, error } = 
                await supabaseClient 
                .from("repairs") 
                .select( "ticket_number, customer_name, service, preferred_date, status, created_at" 

                ) 
                .eq(
                    
                    "ticket_number",
                     ticketNumber 
                    
                    )
                     .maybeSingle(); 
                     
                     if (error) { 
                        
                        console.error(error); 
                        
                        trackResult.innerHTML = 
                        "<p>Unable to check the repair right now. Please try again.</p>"; 
                        
                        return;
                    
                    } 
                    
                    if (!data) { 
                        trackResult.innerHTML = ` 
                        <div class="repair-result">
                         <h3> <i class="fas fa-circle-exclamation"></i>
                          Ticket Not Found
                           </h3>
                           
                           <p> 
                           We couldn't find a repair with ticket number <strong>${ticketNumber}</strong>. 
                           </p> 
                           
                           p> 
                           Please check the ticket number and try again. 
                           </p>
                           
                           </div> 
                           
                           `;
                           
                           return;
                         }
                         
                         const repairDate = 
                         new Date( 
                            data.preferred_date + "T00:00:00"
                         ).toLocaleDateString( "en-ZA",
                            
                            {
                                
                                day: "2-digit",
                                 month: "long",
                                  year: "numeric"
                                
                                } 
                            ); 
                            
                            trackResult.innerHTML = ` 
                            <div class="repair-result">
                            
                            <h3>
                            
                            <i class="fas fa-screwdriver-wrench"></i> Repair Found
                             </h3>
                             
                             <p>
                             <strong>Ticket:</strong>${data.ticket_number}
                              </p>
                              
                              <p> 
                              
                              <strong>Customer:</strong> ${data.customer_name}
                               </p> 
                               
                               <p>
                                <strong>Service:</strong> ${data.service} </p>
                                 <p>
                                  <strong>Preferred Date:</strong> ${repairDate} </p>
                                  
                                  <p> 
                                  <strong>Status:</strong><br>
                                  
                                  <span class="repair-status"> ${data.status}
                                  
                                  </span>
                                  
                                  </p> 
                                  
                                  </div> 
                                  
                                  `; } catch (error) {
                                    
                                    console.error(error);
                                     trackResult.innerHTML = "<p>Something went wrong. Please try again.</p>";
                                    
                                    } finally { 
                                        
                                        trackBtn.disabled = false;
                                        
                                        trackBtn.innerHTML = 
                                        '<i class="fas fa-search"></i> Track Repair';
                                    
                                    }
                                
                                } 
                            );