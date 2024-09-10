// Hardcoded search results
const data = ["apple", "apricot", "banana", "grape", "mango", "pineapple", "strawberry", "orange"];

// Debounce function to limit API calls
function debounce(func, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Simulated API call using Promises
function fetchResults(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
      resolve(filteredData);
    }, 1000); // Simulate 1 second delay
  });
}

// Function to display results in the DOM
function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results
  if (results.length === 0) {
    resultsContainer.innerHTML = "<li>No results found</li>";
    return;
  }

  results.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    resultsContainer.appendChild(li);
  });
}

// Main search function
async function handleSearch(event) {
  const query = event.target.value;
  if (query) {
    const results = await fetchResults(query);
    displayResults(results);
  } else {
    displayResults([]); // Clear results when input is empty
  }
}

// Add event listener to the search input with debounce
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", debounce(handleSearch, 500));
