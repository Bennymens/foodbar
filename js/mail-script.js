// -------   Mail Send ajax

$(document).ready(function () {
  var form = $("#myForm"); // contact form
  var submit = $(".submit-btn"); // submit button
  var alert = $(".alert-msg"); // alert div for show alert message

  // form submit event
  form.on("submit", function (e) {
    e.preventDefault(); // prevent default form submit

    $.ajax({
      url: "/api/contact", // Vercel serverless function
      type: "POST",
      dataType: "json",
      data: form.serialize(),
      beforeSend: function () {
        alert.fadeOut();
        submit.html("Sending....");
      },
      success: function (data) {
        if (data.success) {
          alert
            .html('<div class="alert alert-success">' + data.message + "</div>")
            .fadeIn();
          form.trigger("reset");
          submit.html("Message Sent!");
          setTimeout(function () {
            submit.html("Send Message");
          }, 3000);
        } else {
          alert
            .html('<div class="alert alert-danger">' + data.message + "</div>")
            .fadeIn();
          submit.html("Send Message");
        }
      },
      error: function (e) {
        console.log(e);
        alert
          .html(
            '<div class="alert alert-danger">Failed to send message. Please try again.</div>',
          )
          .fadeIn();
        submit.html("Send Message");
      },
    });
  });
});
