const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//showing error after invalid input
function showError(input, errorMessage) {
  const formControl = input.parentElement;
  // console.log(formControl);
  formControl.classList = "form-control error";
  const smallEle = formControl.querySelector("small");
  smallEle.textContent = errorMessage;
}

//showing success after valid input
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList = "form-control success";
}

//to check valid email address
function emailcheck(emailstr) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(emailstr.value.trim())) {
    showSuccess(emailstr);
  } else {
    showError(emailstr, "Email is not valid");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//to check the length of password and name
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} character `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(
        input
      )} must be less than ${max} character and should contain @`
    );
  } else {
    if (input.value.includes("@")) {
      showSuccess(input);
    } else {
      showError(input, " field should contain @");
    }
  }
}

//to check both the password are same
function checkPassword(pwd, pwd1) {
  if (pwd.value !== pwd1.value) {
    showError(pwd1, "Password do not match");
  } else {
    if (pwd1.value.includes("@")) {
      showSuccess(pwd1);
    } else {
      showError(pwd1, "Password do not match");
    }
  }
}

//to check all the input field should be filled
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach((element) => {
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element)} is required`);
      isRequired = true;
    } else {
      showSuccess(element);
    }
  });
  return isRequired;
}

//handling form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 6);
    checkLength(password, 3, 6);
    emailcheck(email);
    checkPassword(password, password2);
  }
});
