// Log in Page

// Obtain values on login
const signInForm = document.querySelector(".form-signin");

const checkUser = () => {
  const email = document.querySelector("#inputEmail").value;
  const password = document.querySelector("#inputPassword").value;
  const user = JSON.parse(localStorage.getItem("user"));
  
  // console.log("Submit Event");
  if (user[0] === null) {
    alert("Sign up please!");
    location.reload();
  }

  if (email === user[0].email && password === user[0].password) {
    document.forms[0].action = '/blogPage.html';
    alert(`Welcome to Blog Me! `);
  } else {
    alert("Sign up please!");
  }
  return;
}

// Submit, under login attempt
signInForm.addEventListener("submit", () => {  
  checkUser();
});



//------------- Sign up form ----------------------
// Create new user

const section = document.querySelector(".forms");
const signUpLink = document.querySelector(".link-sign-up");
const signUpText = document.querySelector(".sign-up-text");

signUpLink.addEventListener('click', () => {
  // change some elements, like intro text and button

  document.querySelector(".intro").textContent = 'Create account...';
  document.querySelector(".btn-sign-in").textContent = 'Sign up';
  document.querySelector(".form-signin").removeChild(signUpText);

  // change classList for the form
  document.querySelector(".form-signin").classList.toggle("form-signin");
  document.querySelector("form").classList.toggle("form-signup");
  // document.querySelector("form");

  // Obtain new class for the form
  document.querySelector(".form-signup").addEventListener("submit",
    (e) => {
      e.preventDefault();
      createUser();
    });
});


// create a new user
const createUser = () => {
  const newEmailValue = document.querySelector("#inputEmail").value;
  const newPasswordValue = document.querySelector("#inputPassword").value;


  // create storage for the user
  localStorage.setItem("user", JSON.stringify([]));
  const user = JSON.parse(localStorage.getItem("user"));
  let newUser = {
    email: '', password: ''
  };

  if (user.length === 0) {
    // insert new user and store
    newUser.email = newEmailValue;
    newUser.password = newPasswordValue;
    user.push(newUser);
    localStorage.setItem("user", JSON.stringify(user));
    alert(`${newUser.email} is now registered!..`);
    location.reload();


  } else if (newEmailValue === user[0].email &&  // check registered
    newPasswordValue === user[0].password
    && user.length !== 0) {
    alert("User already registered!..");
    location.reload();
  }
  return;
}