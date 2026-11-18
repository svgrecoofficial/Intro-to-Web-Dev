window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked; document.querySelector("#random").onclick = randomButtonClicked};
let displayTerm = "";
function randomButtonClicked(){
    console.log("randomButtonClicked() called");
    const Rick_URL = "https://rickandmortyapi.com/api/character";

        let url = Rick_URL;
        getDataRandom(url);
}

function getDataRandom(url){
    let xhr = new XMLHttpRequest();
        xhr.onload = dataLoadedRandom;
        xhr.onerror = dataError;
        xhr.open("GET",url);
        xhr.send();
}
function getActualRandomCharacter(url){
        let xhr = new XMLHttpRequest();
        xhr.onload = dataActuallyLoadedRandom;
        xhr.onerror = dataError;
        xhr.open("GET",url);
        xhr.send();
}

function dataLoadedRandom(e){
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let info = obj.info;
    let totalAmt = info.count;
    let randomChar = Math.floor(Math.random() * totalAmt) + 1;
    getActualRandomCharacter(xhr.responseURL + "/" + randomChar)
}

function dataActuallyLoadedRandom(e){
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let result = obj;
    console.log(obj);
    let smallURL = result.image;
    let url = result.url;
    let bigString = "";
    let line = `<p><b>${result.name}</b></p>` + `<div class="result"><img src = "${smallURL}" title = "${result.name}" /></div>`;
    bigString += line;

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>" + "       <i>Here is your random character!</i>";

}

function searchButtonClicked(){
		console.log("searchButtonClicked() called");
		const Rick_URL = "https://rickandmortyapi.com/api/character/?name=";

        let url = Rick_URL;

        let term = document.querySelector("#searchterm").value;
        displayTerm = term;

        term = term.trim();

        term = encodeURIComponent(term);

        if(term.length < 1) return;

        url += term;

        document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

        console.log(url);

        getData(url);
	}

        function getData(url){
        let xhr = new XMLHttpRequest();
           
        xhr.onload = dataLoaded;

        xhr.onerror = dataError;
        xhr.open("GET",url);
        xhr.send();
    }

    function dataLoaded(e){
        let maxResults = document.querySelector("#limit").value;
        console.log(maxResults);
        let xhr = e.target;

        console.log("response text: " + xhr.responseText);

        let obj = JSON.parse(xhr.responseText);
        console.log("obj: " + obj.results);

        if(!obj.results || obj.info.count == 0){
            document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
            return;
        }

        let info = obj.info;
        let results = obj.results;
        console.log("info.count = " + info.count);
        let bigString = ""; 
        let returnAmount = info.count;
        if(info.count > maxResults){
            returnAmount = maxResults;
        }
        for(let i=0;i<returnAmount;i++){
            let result = results[i];

            let smallURL = result.image;
            if(!smallURL) smallURL = "images/no-image-found.png";

            let url = result.url;

            let line = `<div class="result"><p><b>${result.name}</b></p><img src = "${smallURL}" title = "${result.name}" /></div>`;

            bigString += line;

            document.querySelector("#content").innerHTML = bigString;

            document.querySelector("#status").innerHTML = "<b>Success!</b>" + "       <i>Here are " + returnAmount + " results for '" + displayTerm + "'</i>";
        }
    }

    function dataError(e){
        console.log("An error occured");
    }