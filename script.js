const API_KEY = "a300007bfe024582819300db14311d25";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchnews("India"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
const data =await res.json();
console.log(data);
bindData(data.articles);

}

function bindData(articles){
    const cardscontainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardscontainer.innerHTML ='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML =article.title;
    newsSource.innerHTML = article.description;
    newsDesc.innerHTML =article.content;


    const date = new Date(article.PublishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blanl");
    });
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem = document.getElementById(id);

    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;

    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;

})









