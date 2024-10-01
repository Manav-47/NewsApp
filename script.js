const API_KEY = "1395128a93a64204bac196de5815d1bc";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () =>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardtemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardtemplate.content.cloneNode(true);
        fillDatainCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDatainCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-description');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}  •  ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;


function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');


document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById('search-button');
    const searchText = document.getElementById('search-text');

    searchButton.addEventListener("click", () => {
        if (!searchText) return;
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });
});
