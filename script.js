const API_KEY = "fb19e88aed0a4d0eb66cfaa1c5e93d55";
const url = "https://newsapi.org/v2/everything?";

// Fetch default news category on load
window.addEventListener("load", () => fetchNews("sports"));

function reload() {
    fetchNews("sports"); // Reload sports news instead of refreshing the page
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}q=${query}&apiKey=${API_KEY}`);
        console.log("Response Status:", res.status);

        if (!res.ok) {
            console.error("API Error:", res.status, res.statusText);
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("API Response Data:", data);

        if (!data.articles || data.articles.length === 0) {
            displayError("No news articles found.");
            return;
        }

        // Log articles to check the structure
        console.log("Articles:", data.articles);

        bindData(data.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        displayError("Failed to fetch news. Please try again later.");
    }
}


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    if (!cardsContainer || !newsCardTemplate) {
        console.error("Missing template or container element in DOM.");
        return;
    }

    cardsContainer.innerHTML = ""; // Clear any previous content

    articles.forEach((article, index) => {
        console.log(`Processing article ${index + 1}:`, article);  // Debugging each article
        
        if (!article.urlToImage || !article.title || !article.url) {
            console.log("Skipping incomplete article:", article);  // Skip incomplete articles
            return;
        }

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector(".news-img");
    const newsTitle = cardClone.querySelector(".news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    console.log("Filling card with data:", article);  // Debugging data for each card

    newsImg.src = article.urlToImage || "default-image.jpg";
    newsImg.onerror = () => (newsImg.src = "default-image.jpg"); // Fallback for broken images
    newsTitle.textContent = article.title || "No title available";
    newsDesc.textContent = article.description || "No description available";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.textContent = `${article.source?.name || "Unknown Source"} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (!navItem) return;

    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

if (searchButton && searchText) {
    searchButton.addEventListener("click", () => {
        const query = searchText.value.trim();
        if (!query) {
            displayError("Please enter a search term.");
            return;
        }
        fetchNews(query);
    });
} else {
    console.error("Search button or input not found in the DOM.");
}

function displayError(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = "block";
    } else {
        console.error("Error container not found in the DOM.");
    }
} 
