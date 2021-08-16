
var scrollPerClick;

var scrollAmount_best_rated_section = 0;
var scrollAmount_category1_slider = 0;
var scrollAmount_category2_slider = 0;
var scrollAmount_category3_slider = 0;

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

array = getMoviesData("year=2000");
console.log(array);


function getMoviesData(params) {
    let request = new Request("http://localhost:8000/api/v1/titles/?"+params,
        {method: 'GET'});
    let result = fetch(request)
        .then(function(res){
            if(res.ok){
                return res.json();
            }else{
                return 'erreur'
            }
        })
        .then(function(value){
            console.log(value.results);
        })
        .catch(function(err){
        });

}
