//JSON -> JS
function getInfo() {
    document.getElementById("gameChoice").innerText = ""
    var x = document.getElementById("consoleSelect").selectedIndex;
    var xx = document.getElementById("genreSelect").selectedIndex;

    var y = document.getElementById("consoleSelect").options;
    var yy = document.getElementById("genreSelect").options;


    fetch("gaming.json")
        .then(data => data.json())
        .then(gameHome => {
            let isFind = false
            gameHome['products'].forEach(element => {
                if (element.console.toLowerCase() === y[x].value.toLowerCase() && element.genre.toLowerCase() === yy[xx].value.toLowerCase()) {
                    isFind = true
                        //Création virtuel d'un élément HTML
                    let game = document.createElement('div')
                    let image = document.createElement('img')
                    let ref = document.createElement('p')
                    let gamePartsRight = document.createElement('div')
                    let title = document.createElement('h2')
                    let description = document.createElement('p')
                    let gamePartsRight2 = document.createElement('div')
                    let genre = document.createElement('p')
                    let console = document.createElement('p')
                    let price = document.createElement('p')
                    let qty = document.createElement('p')
                    let buy = document.createElement('button')

                    //Ajout des classes bootstrap
                    game.className = "col-6 col-sm-3 my-4 justify-content-center me-5"
                    game.setAttribute("data-bs-container", "body")
                    game.setAttribute("data-bs-toggle", "popover")
                    game.setAttribute("data-bs-content", element.description)
                    image.className = "gameParts"
                    game.id = "element_" + element.id
                    image.src = element.image
                    gamePartsRight.className = "gameParts"
                    title.textContent = element.title
                    title.className = "fs-5 text badge bg-danger"
                    description.textContent = element.description.slice(0, 100) + "..."
                    gamePartsRight2.className = "row"
                    genre.textContent = element.genre
                    genre.className = "col"
                    console.textContent = element.console
                    console.className = "col"
                    price.textContent = element.price + "€"
                    price.className = "col priceCss"
                    qty.textContent = element.qty + " en stock"
                    qty.className = "col qtyCss"
                    ref.textContent = "réf: " + element.id
                    ref.className = "col"
                    buy.innerHTML = "Ajouter au panier"
                    buy.className = "btn btn-outline-danger btn-sm"

                    //Mise en place dans le HTML
                    gamePartsRight.appendChild(title)
                    gamePartsRight.appendChild(description)
                    gamePartsRight.appendChild(gamePartsRight2)
                    gamePartsRight2.appendChild(genre)
                    gamePartsRight2.appendChild(console)
                    gamePartsRight2.appendChild(price)
                    gamePartsRight2.appendChild(qty)
                    gamePartsRight2.appendChild(ref)
                    gamePartsRight.appendChild(buy)
                    game.appendChild(image)
                    game.appendChild(gamePartsRight)
                    gameChoice.appendChild(game)
                    let popover = new bootstrap.Popover(document.querySelector("#element_" + element.id), {
                        trigger: 'hover focus'
                    })
                }
            })
            if (!isFind) {
                alert("Aucun jeu ne correspond à votre recherche :(")
            }
        })
        .catch(error => alert("Une erreur est survenue : " + error))
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