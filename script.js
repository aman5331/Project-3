// NASA API Key (Replace with your own API Key)
const apiKey =
  "https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY";

// Get current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split("T")[0];

// Elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById(
  "current-image-container"
);
const currentImage = document.getElementById("current-image");
const imageDescription = document.getElementById("image-description");

// Function to display the image and description
function displayImage(data) {
  currentImage.src = data.url;
  currentImage.alt = data.title;
  imageDescription.textContent = data.explanation;
}
const searchHistoryList = document.getElementById("search-history");

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedDate = searchInput.value;
  getImageOfTheDay(selectedDate);
});

// Function to get the image of the day for a specific date
async function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayImage(data);
    saveSearch(date);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display the image and description
function displayImage(data) {
  currentImageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
    `;
}

// Function to save a search date to local storage
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.unshift(date);
  localStorage.setItem("searches", JSON.stringify(searches));
  displaySearchHistory(searches);
}

// Function to display search history
function displaySearchHistory(searches) {
  searchHistoryList.innerHTML = "";
  searches.forEach((search) => {
    if (search) {
      const listItem = document.createElement("li");
      listItem.textContent = search;
      listItem.addEventListener("click", () => {
        getImageOfTheDay(search);
      });
      searchHistoryList.appendChild(listItem);
    }
  });
}

// Function to initialize the page with the current image and search history
function initializePage() {
  getImageOfTheDay(currentDate);
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  displaySearchHistory(searches);
  getImageOfTheDay(currentDate);
}

initializePage();
