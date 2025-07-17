import "./css/landingpages.css";
const button = document.getElementById("start-button");
let continueIDOK = false;

const subjID =
  new URL(document.location.href).searchParams.get("ID") || "testID";

// FOR INPUT FORM

// FOR WEBCAM RECORIDING
// get both radio buttons
const webcamOptions = document.getElementsByName("webcam-options");
let webcam = "false"; // no as default

for (const option of webcamOptions) {
  option.onclick = () => {
    if (option.checked) {
      webcam = option.value;
    }
  };
}

// FOR CONTINUE BUTTON
// define what happens on button click
const handleContinueClick = (event) => {
  event.preventDefault();
  const studyChoices = {
    ID: subjID,
    webcam: webcam,
  };

  localStorage.setItem("storedChoices", JSON.stringify(studyChoices));
  window.location.href = `./instructions.html`;
};

button.addEventListener("click", handleContinueClick);
