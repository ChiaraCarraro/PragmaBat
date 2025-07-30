import "./css/landingpages.css";
import { loadLanguage } from "./js/loadLanguage.js"; // adjust path as needed

const button = document.getElementById("custom-button");
let continueIDOK = false;

// FOR INPUT FORM
const textField = document.getElementById('participant-id');

// define what happens on input
const handleInput = (event) => {
  event.preventDefault();
  // to get most recent value, get element fresh
  // count number of characters and display the count
  document.getElementById('id-counter').innerHTML = `${
    document.getElementById('participant-id').value.length
  } / 8`;

  continueIDOK = document.getElementById('participant-id').value.length > 0;
  // Enable button only if ID is valid and webcam is selected
  const webcamSelected = Array.from(webcamOptions).some(opt => opt.checked);
  button.disabled = (continueIDOK && webcamSelected);
};

textField.addEventListener('keyup', handleInput, { capture: false });

// Get language from URL
const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") || "en";

// Load localized text/images
(async () => {
  await loadLanguage(lang);
})();


// Webcam recording radio buttons
const webcamOptions = document.getElementsByName("webcam-options");
let webcam = "false"; // default

for (const option of webcamOptions) {
  option.onclick = () => {
    if (option.checked) {
      webcam = option.value;
    }
  };
}

// Continue button click
const handleContinueClick = (event) => {
  event.preventDefault();

  const subjID = document.getElementById('participant-id').value;
  const webcamSelected = Array.from(webcamOptions).some(opt => opt.checked);

  // ✅ Check for both conditions
  if (!subjID || !webcamSelected) {
    alert("Please enter your ID and select a webcam option before continuing.");
    return; // stop the button from proceeding
  }

  // Proceed if all fields are OK
  const studyChoices = {
    ID: subjID,
    webcam: webcam,
  };
  localStorage.setItem("storedChoices", JSON.stringify(studyChoices));

  window.location.href = `./instructions.html?lang=${lang}&ID=${subjID}&webcam=${webcam}`;
};



button.addEventListener("click", handleContinueClick);
