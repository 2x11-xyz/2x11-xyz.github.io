document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const introText = document.getElementById("intro-text");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather the form data
    const formData = new FormData(form);

    // Send the form data to Formspree
    fetch(form.action, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Hide the form and show the thank-you message
          form.style.display = "none";
          if (introText) introText.style.display = "none";
          formMessage.style.display = "block";
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(
                "There was a problem submitting your form:\n" +
                  data["errors"].map((error) => error["message"]).join("\n"),
              );
            } else {
              alert("Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch((error) => {
        alert("Oops! There was a problem submitting your form");
      });
  });
});
