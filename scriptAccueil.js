    fetch("gaming.json")
        .then(data => data.json())
        .then(gameHome => {
        gameHome['products'].forEach(element => { // Création des éléments du JS
        let entity = document.createElement('div');
        let gameImage = document.createElement('img');
        let gameRef = document.createElement('p');
        let gamePartsBottom = document.createElement('div');
        let gameTitle = document.createElement('h2');
        let gameDescription = document.createElement('p');
        let gamePartsBottom2 = document.createElement('div')
        let gameGenre = document.createElement('p')
        let gameConsole = document.createElement('p');
        let gamePartsBottom3 = document.createElement('div')
        let gamePrice = document.createElement('p');
        let gameQty = document.createElement('p')
        let gameBuy = document.createElement('button')

        // Ajout des classes Bootstrap
        entity.className = "col-6 col-md-4 my-auto"; 
        entity.setAttribute("data-bs-container","body")
        entity.setAttribute("data-bs-content", element.description)
        gameImage.className = "gamePartsGY"
        entity.id = "element_" + element.id
        gameImage.src = element.image
        gamePartsBottom.className = "gamePartsGY me-2"
        gameTitle.textContent = element.title
        gameDescription.textContent = element.description.slice(0,150)+"..."
        gamePartsBottom2.className= "row"
        gameGenre.textContent = element.genre
        gameGenre.className = "col"
        gameConsole.textContent = element.console
        gameConsole.className = "col"
        gamePartsBottom3.className= "row"
        gamePrice.textContent = element.price+"€"
        gamePrice.className = "col"
        gameQty.textContent = element.qty+" en stock"
        gameQty.className = "col"
        gameRef.textContent = "réf:"+element.id
        gameRef.className = "col"
        gameBuy.innerHTML = "Ajouter au panier"
        gameBuy.className = "btn btn-outline-dark btn-sm"
        

        //Mise en place dans le HTML

        gamePartsBottom.appendChild(gameTitle)
        gamePartsBottom.appendChild(gameDescription)
        gamePartsBottom.appendChild(gamePartsBottom2)
        gamePartsBottom.appendChild(gamePartsBottom3)
        gamePartsBottom2.appendChild(gameGenre)
        gamePartsBottom2.appendChild(gameConsole)
        gamePartsBottom3.appendChild(gamePrice)
        gamePartsBottom3.appendChild(gameQty)
        gamePartsBottom3.appendChild(gameRef)
        gamePartsBottom.appendChild(gameBuy)
        entity.appendChild(gameImage)
        entity.appendChild(gamePartsBottom)
        gameList.appendChild(entity)
    }); 
});