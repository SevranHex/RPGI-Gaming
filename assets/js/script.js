//JSON -> JS
getInfo();

function getInfo() {
    document.getElementById("gameChoice").innerText = ""
    var x = document.getElementById("consoleSelect").selectedIndex;
    var xx = document.getElementById("genreSelect").selectedIndex;

    var consoleList = document.getElementById("consoleSelect").options;
    var genreOptionList = document.getElementById("genreSelect").options;
    let defaultConsole="123456789",
        defaultGenre="987654321";
    if (genreOptionList[xx].length == 0)
        {
            genreOptionList[xx].value="ALL";
        }
    if (consoleList[x].length == 0)
        {
            consoleList[x].value="ALL";
        }
    fetch("gaming.json")
        .then(data => data.json())
        .then(gameHome => {
            let isFind = false
            gameHome['products'].forEach(element => {
                myCatalog.push(element)
                if (((element.console.toLowerCase() == consoleList[x].value.toLowerCase()) || (consoleList[x].value == "ALL"))
                    && 
                    ((element.genre.toLowerCase() == genreOptionList[xx].value.toLowerCase()) || (genreOptionList[xx].value == "ALL")))
                {
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
                    buy.className = "btn btn-warning"
                    buy.setAttribute("onclick", `addToBasket(${element.id})`);

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
        })
    }
/*
 * JavaScript file
 */
const prefixName= "select-",
      prefixPrice= "price-",
      prefixNombre= "nombre-";
const itemId= "id",
      itemTitle= "title",
      itemDescription= "description",
      itemGenre= "genre",
      itemImage= "image",
      itemPrice= "price",
      itemConsoleType= "console",
      itemQuantity= "Qty";
const euroFormatter= new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR'});

let totalPrice= 0,
    totalItem= 0,
    totalpriceId, 
    totalItemId;
let savedSelectedList,
    savedItemCatalog,
    myCatalog=[],
    myIdList=[];

function addToBasket( itemId)
{
    console.log(`addToBasket(${itemId})`)
    if (itemId in myIdList == false)
    {
        myIdList.push(itemId.toString());
    }
}
function entryPoint( parentIdName,  totalPriceIdName, totalItemName)
{
    fillCaddieBoddy( parentIdName, totalPriceIdName, totalItemName, myIdList, myCatalog);
}
function increaseTotalItemNb()
{
    totalItem += 1;
    totalItemId.innerText= totalItem;
}
function decreaseTotalItemNb( nbr )
{
    totalItem -= parseInt(nbr);
    if (totalItem < 0)
    {
        totalItem= 0;
    }
    totalItemId.innerText= totalItem;
}
function addPrefixIfNeccessary( tagString, tagPrefix)
{
    let answer;
    tagString= tagString.toString();
    // detect if the prefix is already present from the beginning
    if (tagString.substring( 0, tagPrefix.length) === tagPrefix)
    {
        answer= tagString;
    }
    else
    {
        answer= `${tagPrefix}${tagString}`;
    }
    return answer;
}
function buildItemIdNumber( refId )
{
    return addPrefixIfNeccessary( refId, prefixNombre);
}
function buildItemIdName( refId )
{
    return addPrefixIfNeccessary( refId, prefixName);
}
function buildItemIdPrice( refId )
{
    return addPrefixIfNeccessary( refId, prefixPrice);
}
function getItemParam( itemRefName, paramType )
{
    let answer= null;
    savedItemCatalog.forEach( itemIdx => {
        if (itemIdx.id == itemRefName)
        {
            // Yeap !
            switch(paramType)
            {
                case itemId: answer= itemIdx.id; break;
                case itemTitle: answer= itemIdx.title; break;
                case itemDescription: answer= itemIdx.description; break;
                case itemGenre: answer= itemIdx.genre; break;
                case itemImage: answer= itemIdx.image; break;
                case itemPrice: answer= parseFloat(itemIdx.price); break;
                case itemConsoleType: answer= itemIdx.console; break;
                case itemQuantity: answer= parseInt(itemIdx.Qty); break;
                default: answer= null;
            }
        }
     })
    return answer;
}
function totalPriceUpdate( deltaPrice)
{
    let deltaPriceValue= parseFloat(deltaPrice);
    if (deltaPriceValue >= 0)
    {
        // Add a new price
        totalPrice+= deltaPriceValue;
    }
    else
    {
        // Remove a price   ;-)
        if (totalPrice >= deltaPriceValue)
        {
            totalPrice+= deltaPriceValue;
        }
    }
    totalPriceId.innerText= euroFormatter.format(parseFloat(totalPrice));
}
function increaseOneItem( itemRefName )
{
    // Can't sell more item than we have in stock.
    let maxAvailableItem= getItemParam( itemRefName, itemQuantity);
    // Update the item number
    let itemfullName= buildItemIdNumber(itemRefName);
    let itemId= document.getElementById(itemfullName);
    if (parseInt(itemId.innerText) >= maxAvailableItem)
    {
        let itemIdTitle= getItemParam( itemRefName, itemTitle);
        let itemIdConsole= getItemParam( itemRefName, itemConsoleType);
        alert(`Oups ! On n'en n'a pas assez de "${itemIdTitle}" pour "${itemIdConsole}" en stock. Désolé...`);
    }
    else
    {
        itemId.innerText= parseInt(itemId.innerText) +1;
        // Update the total basket price
        itemfullName= buildItemIdPrice(itemRefName);
        itemId= document.getElementById(`${itemfullName}`);
        totalPriceUpdate(itemId.innerText);
        increaseTotalItemNb();
    }
}
function decreaseOneItem( itemRefName )
{
    // Update the item number
    let itemfullName= buildItemIdNumber(itemRefName);
    let itemId= document.getElementById(itemfullName);
    if (parseInt(itemId.innerText) == 1)
    {
        // Remove the item
        removeSelectedItem(buildItemIdName( itemRefName ));
    }
    else
    {
        // Update the counters
        itemId.innerText= parseInt(itemId.innerText) -1;
        // Update the total basket price
        itemfullName= buildItemIdPrice(itemRefName);
        itemId= document.getElementById(`${itemfullName}`);
        totalPriceUpdate(`-${itemId.innerText}`);
        decreaseTotalItemNb( 1 );
    }
}
function removeSelectedItem( itemRefName)
{
    // Update the selected item list
    let originalitemRefName= itemRefName.replace(prefixName,"");
    for (let idx=0; idx < savedSelectedList.length; idx++)
    {
        if (savedSelectedList[idx] == originalitemRefName)
        {
            // Item to be removed found !
            let priceValue= 0;
            let itemnumber= 1;
            // Search its price
            savedItemCatalog.forEach( itemIdx => {
                if (itemIdx.id == originalitemRefName)
                {
                    let itemNumberId= document.getElementById( buildItemIdNumber( originalitemRefName ));
                    itemNumber= parseInt( itemNumberId.innerText);
                    let itemPriceId= document.getElementById( buildItemIdPrice( originalitemRefName ));
                    let value= parseFloat(itemPriceId.innerText.substr( 0, itemPriceId.innerText.length-2));
                    priceValue= itemNumber * value;
                    totalPriceUpdate( `-${priceValue}`);
                    // Remove the selected item from display
                    let itemId= document.getElementById( buildItemIdName( originalitemRefName));
                    itemId.remove();
                    // Update the selected list
                    savedSelectedList.splice(idx,1);
                    // Snif ! One less item...
                    decreaseTotalItemNb( itemnumber);
                }
            });
            // Done
            break;
        }
    }
}
function closeModalWindow()
{
    document.querySelector(".modal").style.display = "none";
}
function validBasketContent()
{
    alert("Votre commande a bien été prise en compte");
    closeModalWindow();
}
function removeBasketContent()
{
    let answer= confirm( `Abondonnez vous votre commande  ?` )
    if (answer == true)
    {
        let copiedList= [...savedSelectedList];
        copiedList.forEach( item => {
            removeSelectedItem( buildItemIdName( item ));
            });
        totalItemId.innerText= 0;
        totalPriceId.innerText= euroFormatter.format(0);
        closeModalWindow();
    }
}
function displaySelectedItem( parentId, refId, title, genre, imagePath, price, consoleType)
{
    let mainItemId= document.createElement("div");
    mainItemId.className= "row item-info";
    mainItemId.id= buildItemIdName( refId );
    parentId.appendChild(mainItemId);
    // Create the first column
    let colId= document.createElement("div");
    colId.className= "col-2";
    mainItemId.appendChild(colId);
    // Add image
    let imgId=  document.createElement("img");
    imgId.src= imagePath;
    imgId.alt= "poster";
    imgId.width= "60";
    imgId.heigth= "auto";
    imgId.title= title;
    colId.appendChild(imgId);
    // Create the second column
    colId= document.createElement("div");
    colId.className= "col-4";
    mainItemId.appendChild(colId);
    // Add the RefId
    let rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Ref: ${refId}`;
    colId.appendChild(rowId);
    // Add the Title
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Title: ${title}`;
    colId.appendChild(rowId);
    // Add the Genre
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Genre: ${genre}`;
    colId.appendChild(rowId);
    // Add the Type
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Type: ${consoleType}`;
    colId.appendChild(rowId);
    // Create the third column
    colId= document.createElement("div");
    colId.className= "col-2";
    mainItemId.appendChild(colId);
    // Add the quantity
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= "Nombre";
    colId.appendChild(rowId);
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.style="text-align: center";
    rowId.id= buildItemIdNumber( refId );
    rowId.innerText= "1";
    colId.appendChild(rowId);
    rowId= document.createElement("div");
    rowId.className= "row";
    colId.appendChild(rowId);
    let button= document.createElement("button");
    button.className= "btn fs-4 font-weight-bold text-primary";
    button.innerText= "+"
    button.setAttribute("onclick", `increaseOneItem("${refId}")`);
    rowId.appendChild(button);
    button= document.createElement("button");
    button.className= "btn fs-4 font-weight-bold text-primary";
    button.innerText= "-"
    button.setAttribute("onclick", `decreaseOneItem("${refId}")`);
    rowId.appendChild(button);
     // Create the forth column
    colId= document.createElement("div");
    colId.className= "col-2";
    mainItemId.appendChild(colId);
    // Add the unitary price
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= "Prix unitaire"
    colId.appendChild(rowId);
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.id= buildItemIdPrice(refId);
    rowId.innerText= euroFormatter.format(parseFloat(price));
    colId.appendChild(rowId);
    // Create the fith column
    colId= document.createElement("div");
    colId.className= "col-2";
    mainItemId.appendChild(colId);
    // Add a trashbin
    imgId= document.createElement("img");
    imgId.src= "assets/images/icon_empty_trash.png";
    imgId.alt= "trashbin";
    imgId.width= "30";
    imgId.heigth= "auto";
    imgId.title= "trashbin";
    imgId.style= "margin: 3px, height: auto";
    imgId.setAttribute("onclick", `removeSelectedItem("${refId}")`);
    colId.appendChild(imgId);
    // And one more item into the basket !
    increaseTotalItemNb();
}
function fillCaddieBoddy( bodyIdName, totalPriceIdName, totalItemName, selectedItemList, allItemList)
{
    console.log("fillCaddieBoddy")
    console.info(selectedItemList);
    console.info(allItemList);
    if (selectedItemList.length <= 0) return;
    savedSelectedList= selectedItemList;
    savedItemCatalog= [...allItemList];
    let bodyTagId= document.getElementById(bodyIdName);
    totalPriceId= document.getElementById(totalPriceIdName);
    totalItemId= document.getElementById(totalItemName);
    // For each selected item...
    selectedItemList.forEach( elementIdx => {
        // Search the corresponding items
        savedItemCatalog.forEach( itemIdx => {
            if (itemIdx.id == elementIdx)
                {
                    // Yeap ! Display this one...
                    displaySelectedItem( bodyTagId, itemIdx.id, itemIdx.title, itemIdx.genre, itemIdx.image, itemIdx.price, itemIdx.console);
                    totalPriceUpdate( itemIdx.price);
                }
            })
        });
    //debug console.info(bodyTagId);
}