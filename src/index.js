import "./css/landingpages.css";
let selectedLang = document.getElementById("language-select").value;

// Language dropdown
document.getElementById("language-select").addEventListener("change", (e) => {
  selectedLang = e.target.value;
});

const button = document.getElementById("start-button");
let continueIDOK = false;
// let selectedLang = "ger"; // fallback default

// Detect subject ID from URL
const subjID =
  new URL(document.location.href).searchParams.get("ID") || "testID";


// Continue button click
const handleContinueClick = (event) => {
  event.preventDefault();

  // Store choices in localStorage
  const studyChoices = {
    ID: subjID,
    lang: selectedLang
  };
  localStorage.setItem("storedChoices", JSON.stringify(studyChoices));

  // Redirect to instructions with selected language
  window.location.href = `./id.html?lang=${selectedLang}`;
};

button.addEventListener("click", handleContinueClick);

