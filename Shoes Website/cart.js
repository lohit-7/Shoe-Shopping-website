const firebaseConfig = {
  apiKey: "AIzaSyDwgxx6mA_EmdqsPR2BjlXz1LFg9-B-_sc",
  authDomain: "purchaseform-7a5c5.firebaseapp.com",
  databaseURL: "https://purchaseform-7a5c5-default-rtdb.firebaseio.com",
  projectId: "purchaseform-7a5c5",
  storageBucket: "purchaseform-7a5c5.appspot.com",
  messagingSenderId: "856810392984",
  appId: "1:856810392984:web:65909b2660bf605b5defed"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var purchaseFormDB = firebase.database().ref("purchaseForm");

document.getElementById("purchaseForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var size = getElementVal("size");
  var quantity = getElementVal("quantity");
  var productSelect = getElementVal("productSelect")
  

  saveMessages(size, quantity, productSelect);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  
}

const saveMessages = (size, quantity, productSelect,) => {
  var newpurchaseForm = purchaseFormDB.push();

  newpurchaseForm.set({
     size : size,
     quantity : quantity,
     productSelect : productSelect,
   
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

  