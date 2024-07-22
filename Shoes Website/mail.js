const firebaseConfig = {
  apiKey: "AIzaSyBIuUhu1zfMLng-ewb0YnIGedlkwQzke0Q",
  authDomain: "contactform-1ad92.firebaseapp.com",
  databaseURL: "https://contactform-1ad92-default-rtdb.firebaseio.com",
  projectId: "contactform-1ad92",
  storageBucket: "contactform-1ad92.appspot.com",
  messagingSenderId: "182971677340",
  appId: "1:182971677340:web:9f72e6f8a0c87735674b59"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var fullName = getElementVal("fullName");
  var phoneNumber = getElementVal("phoneNumber");
  var pinCode = getElementVal("pinCode");
  var state = getElementVal("state");
  var city = getElementVal("city");
  var houseNo = getElementVal("houseNo");
  var roadNameArea = getElementVal("roadNameArea");
  

  saveMessages(fullName, phoneNumber, pinCode, state,city,houseNo,roadNameArea);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (fullName, phoneNumber, pinCode, state,city,houseNo,roadNameArea) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
     fullName : fullName,
     phoneNumber : phoneNumber,
     pinCode : pinCode,
     state : state,
     city : city,
     houseNo : houseNo,
     roadNameArea : roadNameArea,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

  