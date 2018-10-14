var rssToJsonUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
var rssFeedUrl = "https://www.fifa.com/rss/index.xml";

function createNewsList(items) {
    try {
        if (items !== undefined && items !== null && items.length > 0) {
            var newsList = document.getElementById("news");
            items.forEach(function(item){
                var newsLi = document.createElement("li");
                var thumbImg = document.createElement("img");
                var headlineH3 = document.createElement("h3");
                var pubDateP = document.createElement("p");
                var descriptionP = document.createElement("p");
                thumbImg.src = item.enclosure.link;
                thumbImg.width = 100;
                thumbImg.height = 100;
                headlineH3.innerHTML = item.title;
                pubDateP.innerHTML = item.pubDate;
                descriptionP.innerHTML = item.description;
                newsLi.appendChild(thumbImg);
                newsLi.appendChild(pubDateP);
                newsLi.appendChild(headlineH3);
                newsLi.appendChild(descriptionP);
                var newsLink = item.link;
                newsLi.addEventListener("click", function(){
                    window.open(newsLink, '_blank');
                });
                newsList.appendChild(newsLi);
            });   
        }
    } catch (err) {
        console.log(err);
    }
}

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        createNewsList(myObj.items);
    }
};
xmlhttp.open("GET", rssToJsonUrl + rssFeedUrl, true);
xmlhttp.send();