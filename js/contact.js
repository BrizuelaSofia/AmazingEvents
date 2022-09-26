var form = document.querySelector(".form");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  var click = event.target;

  if (click[0].value) {
    form.reset(),
      swal(
        "Thanks for comment! 💌",
        "your comment was sent correctly.",
        "success"
      );
  } else {
    swal(
      "Wait! You need to complete the form",
      "Please fill in the fields.",
      "error"
    );
  }
});