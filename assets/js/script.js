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
    savedItemCatalog;

function entryPoint( parentIdName,  totalPriceIdName, totalItemName)
{
    let myCatalog=[];
    myCatalog[0]=   {
                    "id": "1",
                    "title": "Super Mario World",
                    "description": "Super Mario World sur Super Nes vous fait incarner les deux super plombiers Mario et Luigi, à la poursuite de Bowser qui a kidnappé pour la énième fois la princesse Peach. Exploitez de nouveaux objets tels que la plume permettant aux héros de planer pendant un court instant, et faites surtout connaissance avec le petit dinosaure vert Yoshi qui apparaît avec sa tribu pour la toute première fois dans la série.",
                    "image": "https://image.jeuxvideo.com/images-sm/sn/s/m/smwosn0f.jpg",
                    "genre": "Combat",
                    "console": "SNES",
                    "price": "32",
                    "Qty": "10"
               };
    myCatalog[1]=   {
                    "id": "2",
                    "title": "The Legend of Zelda : a Link to the Past",
                    "description": "Dans the Legend of Zelda : A Link to the Past, le joueur dirige Link dans sa quête pour sauver Hyrule. Dans ce jeu d'action/aventure en 2D, il est possible de basculer du monde des ténèbres à celui de la lumière pour sauver la princesse Zelda du sorcier Agahnim et trouver les nombreux objets nécessaires à l'accomplissement de la quête",
                    "image": "https://image.jeuxvideo.com/images/jaquettes/00051134/jaquette-the-legend-of-zelda-a-link-to-the-past-wii-u-wiiu-cover-avant-g-1386876665.jpg",
                    "genre": "Aventure",
                    "console": "SNES",
                    "price": "22",
                     "Qty": "5"
                    };
    myCatalog[2]=   {
                    "id": "3",
                    "title": "Super Mario Kart",
                    "description": "Super Mario Kart sur Super Nintendo est un jeu de courses reprenant l'univers et les personnages de Mario. Après avoir choisi un pilote parmi les huit proposés, lancez-vous dans les quatre coupes différentes pour essayer d'atteindre la plus haute marche du podium. Grâce à des bonus ramassés sur le circuit, tous les coups sont permis, à commencer par le largage de peaux de banane et l'envoi de carapaces. Le mode Battle permet d'ailleurs d'affronter les autres à coup de carapaces.",
                    "image": "https://image.jeuxvideo.com/medias/147938/1479376108-5962-jaquette-avant.jpg",
                    "genre": "Course",
                    "console": "SNES",
                    "price": "21",
                    "Qty" : "4"
                    };
    myCatalog[3]=   {
                    "id": "4",
                    "title": "Street Fighter 2",
                    "description": "Street Fighter II est le deuxième épisode du jeu de combat sorti en 1988 sur diverses consoles et bornes d'arcade. Vous avez le choix parmi huit personnages ayant chacun son propre style de jeu et ses propres techniques spéciales. Dans le mode solo, vous devez affronter les sept autres personnages plus quatre boss cachés. A deux, chacun choisit son personnage pour tenter d'éliminer l'autre.",
                    "image": "https://image.jeuxvideo.com/images/pc/s/t/strepc0f.jpg",
                    "genre": "Combat",
                    "console": "SNES",
                    "price": "25",
                    "Qty" : "3"
                    };
    let myIdList=[ "1","3","2"];
    fillCaddieBoddie( parentIdName, totalPriceIdName, totalItemName, myIdList, myCatalog);
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
function fillCaddieBoddie( bodyIdName, totalPriceIdName, totalItemName, selectedItemList, allItemList)
{
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
    console.info(bodyTagId);
}
