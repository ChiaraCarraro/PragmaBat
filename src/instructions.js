import "./css/landingpages.css";
import { loadLanguage } from "./js/loadLanguage.js"; // adjust path as needed

const button = document.getElementById("instructions-button");

// Get language from URL
const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") || "en";

// Load localized text/images
(async () => {
  await loadLanguage(lang);
})();

// Extract ID and webcam from stored choices
const storedChoices = localStorage.getItem("storedChoices");
let studyChoices;

if (storedChoices) {
  studyChoices = JSON.parse(storedChoices);
} else {
  console.error("No data found in local storage");
}

studyChoices.ID = studyChoices?.ID ?? "testID";
studyChoices.webcam = studyChoices?.webcam ?? false;

// On continue, forward to prabat.html with language in URL
const handleContinueClick = (event) => {
  event.preventDefault();
  localStorage.setItem("storedChoices", JSON.stringify(studyChoices));
  window.location.href = `./prabat.html?lang=${lang}`;
};

button.addEventListener("click", handleContinueClick);
