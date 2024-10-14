const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

const newsType = document.getElementById("newsType");
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const newsQuery = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const logo = document.getElementById("logo");

var newsDataArr = [];

const API_KEY = `a04b4af0c9a6422fa84e33fe3bbc81f4`;
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=in&apiKey=`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

window.onload = () => {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
};

generalBtn.addEventListener("click", () => {
  newsType.innerHTML = "<h4>General News</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", () => {
  newsType.innerHTML = "<h4>Business News</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", () => {
  newsType.innerHTML = "<h4>Sports News</h4>";
  fetchSportsNews();
});

entertainmentBtn.addEventListener("click", () => {
  newsType.innerHTML = "<h4>Entertainment News</h4>";
  fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", () => {
  newsType.innerHTML = "<h4>Tech News</h4>";
  fetchTechnologyNews();
});

searchBtn.addEventListener("click", () => {
  newsType.innerHTML = `<h4>${newsQuery.value}</h4>`;
  fetchQueryNews();
});

const fetchHeadlines = async () => {
  const response = await fetch(HEADLINES_NEWS + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No Data Found...</h3>";
    return;
  }
  displayNews();
};

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No data found.</h3>";
    return;
  }

  displayNews();
};

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No data found.</h3>";
    return;
  }

  displayNews();
};

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    console.log(myJson);
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No data found.</h3>";
    return;
  }

  console.log("entertainment");

  displayNews();
};

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No data found.</h3>";
    return;
  }

  displayNews();
};

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No data found.</h3>";
    return;
  }

  displayNews();
};

const fetchQueryNews = async () => {
  if (newsQuery.value == null) return;

  const response = await fetch(
    SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY
  );
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    console.log(newsDataArr);
    newsDataArr = myJson.articles;
  } else {
    //error handle
    console.log(response.status, response.statusText);
    newsdetails.innerHTML = "<h3>No data found.</h3>";
    return;
  }

  displayNews();
};

logo.addEventListener("click", () => {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
});

function displayNews() {
  newsdetails.innerHTML = "";

  newsDataArr.forEach((news) => {
    let date = news.publishedAt.split("T");

    let col = document.createElement("div");
    col.className = "news-card";

    let card = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    let cardBody = document.createElement("div");

    let newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    let dateHeading = document.createElement("h6");
    dateHeading.className = "card-heading";
    dateHeading.innerHTML = date[0];

    let description = document.createElement("p");
    description.className = "text-muted";
    description.innerHTML = news.description;

    let link = document.createElement("a");
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read More";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    col.appendChild(image);
    col.appendChild(cardBody);

    newsdetails.appendChild(col);
  });
}

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
