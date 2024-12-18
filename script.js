const API_KEY = "453bc841763e440da1c1dae013fca519";
const url = "https://newsapi.org/v2/everything?"; 

window.addEventListener("load", () => fetchNews("sports"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(${url}q=${query}&apiKey=${API_KEY}); 
        if (!res.ok) {
            throw new Error(Error: ${res.status} ${res.statusText}); 
        }
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        displayError("Failed to fetch news. Please try again later.");
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return; 
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

    newsImg.src = article.urlToImage || "default-image.jpg";
    newsTitle.textContent = article.title || "No title available";
    newsDesc.textContent = article.description || "No description available";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.textContent = ${article.source.name || "Unknown Source"} · ${date};

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

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim(); 
    if (!query) {
        displayError("Please enter a search term.");
        return;
    }
    fetchNews(query);
});

function displayError(message) {
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = "block";
    } else {
        console.error("Error container not found in the DOM.");
    }
}
