/* ================= SUPABASE CONNECTION ================= */

const SUPABASE_URL = "https://nnoedhpltamkrjzoskcy.supabase.co";

const SUPABASE_KEY = "sb_publishable_TiWvrpFWAOK-YEB9FqzJTg_y3JZmnRZ";

const supabaseClient = window.supabase.createClient(
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

const repairTimeline =
document.getElementById("repairTimeline");

/* ================= REPAIR STATUS ORDER ================= */

const repairStatuses = [
"Booking Received",
"Device Received",
"Under Diagnosis",
"Repair In Progress",
"Waiting for Parts",
"Repair Completed",
"Ready for Collection",
"Collected"
];

/* ================= UPDATE TIMELINE ================= */

function updateRepairTimeline(currentStatus) {

if (!repairTimeline) {
    return;
}

repairTimeline.style.display = "block";

const steps =
    repairTimeline.querySelectorAll(".timeline-step");

const currentIndex =
    repairStatuses.indexOf(currentStatus);

steps.forEach(function(step, index) {

    step.classList.remove("completed");
    step.classList.remove("current");

    if (currentIndex >= 0) {

        if (index < currentIndex) {

            step.classList.add("completed");

        } else if (index === currentIndex) {

            step.classList.add("current");

        }

    }

});

}

/* ================= TRACK FORM ================= */

if (trackForm) {

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

            return;
        }


        trackBtn.disabled = true;

        trackBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Checking...';


        trackResult.innerHTML =
            "<p>Checking your repair...</p>";


        if (repairTimeline) {
            repairTimeline.style.display = "none";
        }


        try {

            const { data, error } =
                await supabaseClient
                    .from("repairs")
                    .select(
                        "ticket_number, customer_name, service, preferred_date, status, created_at"
                    )
                    .eq(
                        "ticket_number",
                        ticketNumber
                    )
                    .maybeSingle();


            if (error) {

                console.error(
                    "Track repair error:",
                    error
                );

                trackResult.innerHTML =
                    "<p>Unable to check the repair right now. Please try again.</p>";

                return;
            }


            /* ================= TICKET NOT FOUND ================= */

            if (!data) {

                trackResult.innerHTML = `
                    <div class="repair-result">

                        <h3>
                            <i class="fas fa-circle-exclamation"></i>
                            Ticket Not Found
                        </h3>

                        <p>
                            We couldn't find a repair with ticket number
                            <strong>${ticketNumber}</strong>.
                        </p>

                        <p>
                            Please check the ticket number and try again.
                        </p>

                    </div>
                `;

                return;
            }


            /* ================= REPAIR DATE ================= */

            let repairDate =
                "Not provided";


            if (data.preferred_date) {

                repairDate =
                    new Date(
                        data.preferred_date + "T00:00:00"
                    ).toLocaleDateString(
                        "en-ZA",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );
            }


            /* ================= CURRENT STATUS ================= */

            const currentStatus =
                data.status || "Booking Received";


            /* ================= DISPLAY REPAIR ================= */

            trackResult.innerHTML = `

                <div class="repair-result">

                    <h3>
                        <i class="fas fa-screwdriver-wrench"></i>
                        Repair Found
                    </h3>

                    <p>
                        <strong>Ticket:</strong>
                        ${data.ticket_number}
                    </p>

                    <p>
                        <strong>Customer:</strong>
                        ${data.customer_name}
                    </p>

                    <p>
                        <strong>Service:</strong>
                        ${data.service}
                    </p>

                    <p>
                        <strong>Preferred Date:</strong>
                        ${repairDate}
                    </p>


<div class="current-repair-status">

<strong>Current Repair Status</strong>

<span class="repair-status">
    ${currentStatus}
</span>

</div>
`;


/* ================= SHOW TIMELINE ================= */

            updateRepairTimeline(
                currentStatus
            );


        } catch (error) {

            console.error(
                "Something went wrong:",
                error
            );

            trackResult.innerHTML =
                "<p>Something went wrong. Please try again.</p>";

        } finally {

            trackBtn.disabled = false;

            trackBtn.innerHTML =
                '<i class="fas fa-search"></i> Track Repair';

        }

    }
);

}

/* ================= FOOTER YEAR ================= */

const yearElement =
document.getElementById("year");

if (yearElement) {

yearElement.textContent =
    new Date().getFullYear();

}