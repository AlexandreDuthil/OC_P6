const elt = document.getElementById("mon_lien");

elt.addEventListener("click", function(event) {
    event.preventDefault();
    elt.innerHTML = "C'est cliqué !"
});

document
    .getElementById("test")
    .addEventListener("mousemove", function(e) {
        let newElt = document.createElement("h2", id="newElt")
            .getElementById("all")
            .appendChild(newElt);
        newElt.innerHTML = "Vous êtes aux coordonnées" + e.offsetX + ", " + e.offsetY;
        document
});