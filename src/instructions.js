import "./css/landingpages.css";
import { loadLanguage } from "./js/loadLanguage.js"; // adjust path as needed

const button = document.getElementById("instructions-button");

// Get language from URL
const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") || "en";


const webcam =
  new URL(document.location.href).searchParams.get('webcam') || false;

const subjID =
new URL(document.location.href).searchParams.get('ID') || 'testID';
  
// Load localized text/images
(async () => {
  await loadLanguage(lang);
})();

function applyLocalizedImagePaths(lang) {
  let folder;
  if (lang === "ki" || lang === "sw") {
    folder = "ki";
  } else if (lang === "ger" || lang === "en" || lang === "tr") {
    folder = "ger";
  } else {
    folder = lang;
  }
  const allImgs = document.querySelectorAll("[data-img]");
  allImgs.forEach(img => {
    const relPath = img.getAttribute("data-img");
    img.src = `images/${folder}/${relPath}`;
    console.log(`Setting image src to: ${img.src}`);
  });
}

applyLocalizedImagePaths(lang);

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
  window.location.href = `./prabat.html?lang=${lang}&ID=${subjID}&webcam=${webcam}`;
};

button.addEventListener("click", handleContinueClick);
