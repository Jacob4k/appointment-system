  // Function to show the modal
  function showModal(message) {
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modalMessage");

    // Set the message in the modal
    modalMessage.textContent = message;

    // Show the modal
    modal.style.display = "block";

    // Add event listener to close the modal when the close button is clicked
    var closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

// Add event listener to the form submission
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the modal immediately to indicate form submission is in progress
    showModal("Submitting form...");

    // Perform an AJAX request to submit the form
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.action);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Successful response
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    window.location.href = "appointment.html";
                } else {
                    showModal(response.message); // Show the modal with the error message
                }
            } else {
                // Error response
                showModal("Error: Something went wrong."); // Show a generic error message
            }
        }
    };

    // Collect form data
    var formData = new FormData(this);
    var urlEncodedData = new URLSearchParams(formData).toString();

    xhr.send(urlEncodedData);
});