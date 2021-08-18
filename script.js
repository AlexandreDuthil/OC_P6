
var scrollPerClick;
var scrollAmount_best_rated_section = 0;
var scrollAmount_category1_slider = 0;
var scrollAmount_category2_slider = 0;
var scrollAmount_category3_slider = 0;

const moviesPerSlider = 15;

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

//TODO: gérer l'implémentation de la section ''premier film''
//TODO: trouver un moyen d'exclure le mieux noté du slider parce qu'il est déja présent en haut
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
        // console.log(params);
        // console.log(result);
        result.results.map((cur) => {
            if(moviesDownloaded < moviesNumber){
                getDetails(cur, target)
            moviesDownloaded ++;
            }
        })
        pageNum ++;
        request = new Request("http://localhost:8000/api/v1/titles/?"+params+"&page="+pageNum,
        {method: 'GET'});
    }
}

async function getDetails(cur, target){
    let detail_request = new Request(cur.url);
    let detail_result = await fetch(detail_request)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            target.insertAdjacentHTML(
        "beforeend",
        `<img src=${response.image_url} alt=${response.title} class="thumbnails" id=${response.id}
                data-genre=${response.genres} data-date_published=${response.date_published} 
                data-rated=${response.rated} data-countries=${response.countries}
                data-imdb_score=${response.imdb_score} data-directors=${response.directors}
                data-actors=${response.actors} data-duration=${response.duration}
                data-description=${response.description} data-income=${response.worldwide_gross_income}>`)
        })
}

//TODO: création d'une modale en JS ? implémentation des données stockées sur les img