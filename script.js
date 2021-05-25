    fetch("gaming.json")
        .then(data => data.json())
        .then(gameHome => {
        gameHome['products'].forEach(element => { // Création des éléments du JS
        let game = document.createElement('div');
        let image = document.createElement('img');
        let ref = document.createElement('p');
        let gamePartsRight = document.createElement('div');
        let title = document.createElement('h2');
        let description = document.createElement('p');
        let gamePartsRight2 = document.createElement('div')
        let genre = document.createElement('p')
        let console = document.createElement('p');
        let gamePartsRight3 = document.createElement('div')
        let price = document.createElement('p');
        let qty = document.createElement('p')
        let buy = document.createElement('button')

        // Ajout des classes Bootstrap
        game.className = "col-6 col-md-4 my-auto"; 
        game.setAttribute("data-bs-container","body")
        game.setAttribute("data-bs-content", element.description)
        image.className = "gameParts"
        game.id = "element_" + element.id
        image.src = element.image
        gamePartsRight.className = "gameParts me-2"
        title.textContent = element.title
        description.textContent = element.description.slice(0,150)+"..."
        gamePartsRight2.className= "row"
        genre.textContent = element.genre
        genre.className = "col"
        console.textContent = element.console
        console.className = "col"
        gamePartsRight3.className= "row"
        price.textContent = element.price+"€"
        price.className = "col"
        qty.textContent = element.qty+" en stock"
        qty.className = "col"
        ref.textContent = "réf:"+element.id
        ref.className = "col"
        buy.innerHTML = "Ajouter au panier"
        buy.className = "btn btn-outline-dark btn-sm"
        

        //Mise en place dans le HTML

        gamePartsRight.appendChild(title)
        gamePartsRight.appendChild(description)
        gamePartsRight.appendChild(gamePartsRight2)
        gamePartsRight.appendChild(gamePartsRight3)
        gamePartsRight2.appendChild(genre)
        gamePartsRight2.appendChild(console)
        gamePartsRight3.appendChild(price)
        gamePartsRight3.appendChild(qty)
        gamePartsRight3.appendChild(ref)
        gamePartsRight.appendChild(buy)
        game.appendChild(image)
        game.appendChild(gamePartsRight)
        gameList.appendChild(game)
    }); 
});