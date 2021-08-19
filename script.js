
var scrollPerClick;
var scrollAmount_best_rated_section = 0;
var scrollAmount_category1_slider = 0;
var scrollAmount_category2_slider = 0;
var scrollAmount_category3_slider = 0;

const moviesPerSlider = 7;

function ScrollLeft(id) {
    const sliders = document.querySelector("#"+id);
    var scrollTotal = "scrollAmount_" + id
    sliders.scrollTo({
        top: 0,
        left: ((window[scrollTotal]) -= scrollPerClick),
        behavior: "smooth"
    });

    if (window[scrollTotal] < 0) {
        window[scrollTotal] = 0;
    }
}

function ScrollRight(id) {
    const sliders = document.querySelector("#"+id);
    var scrollTotal = "scrollAmount_" + id
    if (window[scrollTotal] <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top: 0,
            left: (window[scrollTotal] += scrollPerClick),
            behavior: "smooth",
        });
    }
}

scrollPerClick = document.querySelector(".thumbnails_container").clientWidth + 20;

getFirstMovie();
getMoviesData("sort_by=-imdb_score", "best_rated_section", moviesPerSlider);
getMoviesData("genre=action", "category1_slider", moviesPerSlider);
getMoviesData("genre=comedy", "category2_slider", moviesPerSlider);
getMoviesData("genre=drama", "category3_slider", moviesPerSlider);

async function getMoviesData(params, targetId, moviesNumber) {
    let moviesDownloaded = 0
    let pageNum = 1
    let target = document.querySelector("#" + targetId);
    let request = new Request("http://localhost:8000/api/v1/titles/?"+params,
        {method: 'GET'});
    while(moviesDownloaded < moviesNumber) {
        let result = await fetch(request)
            .then(response => response.json())
        result.results.map((cur) => {
            if(moviesDownloaded < moviesNumber){
                if(targetId==="best_rated_section" && moviesDownloaded===0){
                    moviesNumber ++
                } else {
                    getDetails(cur, target)
                }
                moviesDownloaded ++
            }
        })
        pageNum ++;
        request = new Request("http://localhost:8000/api/v1/titles/?"+params+"&page="+pageNum,
        {method: 'GET'});
    }
}

async function getDetails(cur, target){
    let modal_target = document.querySelector("#modal_container")
    let detail_request = new Request(cur.url);
    await fetch(detail_request)
        .then(response => response.json())
        .then(response => {
            target.insertAdjacentHTML(
        "beforeend",
        `<a onclick="openModal('#modal_${response.id}')">
                <img src=${response.image_url} alt=${response.title} class="thumbnails" id=${response.id}>
              </a>`)

            modal_target.insertAdjacentHTML(
                "afterbegin",
        `<div id="modal_${response.id}" class="modal">
                <div class="modal_content">
                    <div class="modal_text_content">
                        <h2>${response.title}</h2>
                        <p>Genre : ${response.genres}</p>
                        <p>Date de sortie : ${response.date_published}</p>
                        <p>Rated : ${response.rated}</p>
                        <p>Score Imbd : ${response.imdb_score}</p>
                        <p>Réalisateur : ${response.directors}</p>
                        <p>Acteurs : ${response.actors}</p>
                        <p>Durée : ${response.duration}</p>
                        <p>Pays d'origine : ${response.countries}</p>
                        <p>Résultat au Box Office : ${response.worldwide_gross_income}</p>
                        <p>Résumé : ${response.long_description}</p>
                    </div>
                    <img src=${response.image_url} alt=${response.title} class="modal_img">
                        <a class="modal_close"
                        onclick="closeModal('#modal_${response.id}')">&times</a>
                </div>
            </div>`
            )
        })
}

async function getFirstMovie(){
    let request = new Request("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    let targetText = document.querySelector("#first_film_text_content")
    let targetImage = document.querySelector("#first_film_container")
    await fetch(request)
        .then(response => response.json())
        .then(response => {
            response = response.results[0]
            console.log(response)
            getFirstMovieDetails(response, targetText, targetImage)
        })
}

async function getFirstMovieDetails(res, targetText, targetImage){
    let modal_target = document.querySelector("#modal_container")
    let detail_request = new Request(res.url);
    await fetch(detail_request)
        .then(response => response.json())
        .then(response => {
            targetText.insertAdjacentHTML(
                "beforeend",
                `<a href="#modal_${response.id}">
                    <button onclick="openModal('#modal_${response.id}')" class="first_film_button">En savoir plus</button>
                </a>
                <h2 id="first_film_title">${response.title}</h2>
                <p id="first_film_description">${response.long_description}</p>`
            )
            targetImage.insertAdjacentHTML(
                "beforeend",
                `<a onclick="openModal('#modal_${response.id}')">
                        <img src=${response.image_url} alt=${response.title} class="" id=${response.id}>
                      </a>`)
            modal_target.insertAdjacentHTML(
                "afterbegin",
        `<div id="modal_${response.id}" class="modal">
                <div class="modal_content">
                    <div class="modal_text_content">
                        <h2>${response.title}</h2>
                        <p>Genre : ${response.genres}</p>
                        <p>Date de sortie : ${response.date_published}</p>
                        <p>Rated : ${response.rated}</p>
                        <p>Score Imbd : ${response.imdb_score}</p>
                        <p>Réalisateur : ${response.directors}</p>
                        <p>Acteurs : ${response.actors}</p>
                        <p>Durée : ${response.duration}</p>
                        <p>Pays d'origine : ${response.countries}</p>
                        <p>Résultat au Box Office : ${response.worldwide_gross_income}</p>
                        <p>Résumé : ${response.long_description}</p>
                    </div>
                    <img src=${response.image_url} alt=${response.title} class="modal_img">
                        <a class="modal_close" onclick="closeModal('#modal_${response.id}')">&times</a>
                </div>
            </div>`)
        })
}

function openModal(targetId){
    let target = document.querySelector(targetId)
    target.classList.add("modal_open")
}

function closeModal(targetId){
    let target = document.querySelector(targetId)
    target.classList.remove("modal_open")
}
