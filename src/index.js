import "./css/landingpages.css";

const button = document.getElementById("start-button");
let continueIDOK = false;
let selectedLang = "en"; // fallback default

// Detect subject ID from URL
const subjID =
  new URL(document.location.href).searchParams.get("ID") || "testID";

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

// Language dropdown
document.getElementById("language-select").addEventListener("change", (e) => {
  selectedLang = e.target.value;
});

// Continue button click
const handleContinueClick = (event) => {
  event.preventDefault();

  // Store choices in localStorage
  const studyChoices = {
    ID: subjID,
    webcam: webcam,
  };
  localStorage.setItem("storedChoices", JSON.stringify(studyChoices));

  // Redirect to instructions with selected language
  window.location.href = `./instructions.html?lang=${selectedLang}`;
};

button.addEventListener("click", handleContinueClick);

