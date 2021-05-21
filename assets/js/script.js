// //JSON -> JS
// fetch('gaming.json')
//     .then(data => data.json())
//     .then(gameCategories => {

//         var items = JSON.parse(request.responseText)
//         console.log(items);
//         var output = "<ul>"
//         for (i = 0; i < items.lenght; i++) {
//             output += "<li>" + items[i].console + "</li>"
//         }
//         output += "</ul>";
//         document.getElementById("demo").innerHTML = output
//     })

// document.getElementById("snes").onclick = function() {
//     var request;
//     if (window.XMLHttpRequest) {
//         request = new XMLHttpRequest();
//     } else {
//         request = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     request.open('GET', 'gaming.json');
//     request.onreadystatechange = function() {
//         if ((request.readyState === 4) && (request.status === 200)) {
//             var items = JSON.parse(request.responseText)
//             console.log(items);
//             var output = "<ul>"
//             for (i = 0; i < items.lenght; i++) {
//                 output += "<li>" + items[i].console + "</li>"
//             }
//             output += "</ul>";
//             document.getElementById("demo").innerHTML = output
//         }
//     }
// }
// document.getElementById("consoles").selectedIndex
function myFunction() {
    document.getElementById("demo").innerText = ""
    var x = document.getElementById("consoleSelect").selectedIndex;
    var xx = document.getElementById("genreSelect").selectedIndex;

    var y = document.getElementById("consoleSelect").options;
    var yy = document.getElementById("genreSelect").options;
    console.log(y[x].value + " and " + yy[xx].value)

    fetch("gaming.json").then(data => data.json()).then(movieList => {
            movieList['products'].forEach(movie => {
                if (movie.console.toLowerCase() === y[x].value.toLowerCase() && movie.genre.toLowerCase() === yy[xx].value.toLowerCase()) {
                    console.log(movie.console + " and " + movie.genre)
                        //Création virtuel d'un élément HTML
                    let movieCard = document.createElement("div")
                    let movieImg = document.createElement("img")
                    let moviePartsRight = document.createElement("div")
                    let movieOriginalTitle = document.createElement("h2")
                    let movieDesc = document.createElement("p")
                    let movieAverage = document.createElement("div")

                    //Ajout des classes bootstrap
                    movieCard.className = "col-6 col-sm-3 my-4"
                    movieCard.setAttribute("data-bs-container", "body")
                    movieCard.setAttribute("data-bs-toggle", "popover")
                    movieCard.setAttribute("data-bs-placement", "top")
                    movieCard.setAttribute("data-bs-content", movie.description)
                    movieImg.className = "movieParts"
                    movieCard.id = "movie_" + movie.id
                    movieImg.src = movie.image
                    moviePartsRight.className = "movieParts p-2"
                    movieOriginalTitle.textContent = movie.title
                    movieDesc.textContent = movie.description.slice(0, 200) + " ..."

                    //Mise en place dans le HTML
                    moviePartsRight.appendChild(movieOriginalTitle)
                    moviePartsRight.appendChild(movieDesc)
                    moviePartsRight.appendChild(movieAverage)
                    movieCard.appendChild(movieImg)
                    movieCard.appendChild(moviePartsRight)
                    demo.appendChild(movieCard)
                    var popover = new bootstrap.Popover(document.querySelector("#movie_" + movie.id), {
                        trigger: 'hover focus'
                    })
                } else {
                    console.log("rien")
                }
            });
        })
        .catch(error => console.log("Une erreur est survenue : " + error))
}















































































/*{
            //Création virtuel d'un élément HTML
            let consoles = document.createElement("ul")
            let snes = document.createElement("li")
            let megadrive = document.createElement("li")
            let playstation = document.createElement("li")
            let xbox = document.createElement("li")
            let gameboy = document.createElement("li")

            //Ajout des classes bootstrap
            consoles.className = "navbar-nav m-auto navbar-nav-scroll "
            consoles.className = ("data-bs-toggle", "dropdown")
            snes.className = "dropdown-item text-light"
            megadrive.className = "dropdown-item text-light"
            playstation.className = "dropdown-item text-light"
            xbox.className = "dropdown-item text-light"
            gameboy.className = "dropdown-item text-light"

            consoles.appendChild(snes)
            consoles.appendChild(megadrive)
            consoles.appendChild(playstation)
            consoles.appendChild(xbox)
            consoles.appendChild(gameboy)
            })
    })*/

// document.getElementById("snes").onclick = function() {
//     var request;
//     if (window.XMLHttpRequest) {
//         request = new XMLHttpRequest();
//     } else {
//         request = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     request.open('GET', 'gaming.json');
//     request.onreadystatechange = function() {
//         if ((request.readyState === 4) && (request.status === 200)) {
//             var items = JSON.parse(request.responseText);
//             document.getElementById("demo").innerHTML = items;
//             console.log(items);
//             var output = "<ul>";
//             for (var key in items) {
//                 output += "<li>" + items[key].bio + "</li>";
//             }
//             output += "</ul>";
//             document.getElementById("demo").innerHTML = output;
//         }
//     };