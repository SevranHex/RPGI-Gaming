/*
 * JavaScript file
 */
const prefixSelect= "select-",
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
const euroFormatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
        })
      
let totalPrice= 0,
    totalItem= 0;
let totalpriceId, 
    totalItemId,
    savedSelectedList,
    savedBodyIdName,
    savedItemCatalog;

function entryPoint( parentIdName,  totalPriceIdName, totalItemName)
{
    let myCatalog=[];
    myCatalog[0]=   {
                    "id": "001",
                    "title": "Mario Bross",
                    "description": "un plombier roulant dans un kart",
                    "genre": "course",
                    "image": "Smile.png",
                    "price": "3.14",
                    "console": "XBoX",
                    "Qty" : 1
                    };
    myCatalog[1]=   {
                    "id": "002",
                    "title": "Tweety & Sylvester",
                    "description": "Titi et gros minet se ballade en foret",
                    "genre": "rpg",
                    "image": "Worried.png",
                    "price": "1.23",
                    "console": "PlayStation",
                    "Qty" : 2
                    };
    myCatalog[2]=   {
                    "id": "003",
                    "title": "Kung Fu Fu",
                    "description": "aie, ouille...",
                    "genre": "Combat",
                    "image": "Worried.png",
                    "price": "3.00",
                    "console": "PlayStation",
                    "Qty" : 3
                    };
    let myIdList=[ "003","002"]
   fillCaddieBoddie( parentIdName, totalPriceIdName, totalItemName, myIdList, myCatalog)
}
function increaseTotalItemNb()
{
    totalItem += 1;
    totalItemId.innerText= totalItem;
}
function decreaseTotalItemNb()
{
    totalItem -= 1;
    if (totalItem < 0)
    {
        totalItem= 0;
    }
    totalItemId.innerText= totalItem;
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
function increaseOneItem( itemRefName )
{
    // Can't sell more item than we have in stock.
    let maxAvailableItem= getItemParam( itemRefName, itemQuantity);
    console.log(`increaseOneItem( ${itemRefName} ) = ${maxAvailableItem}`)
    // Update the item number
    let itemfullName= buildItemIdNombre(itemRefName);
    let itemId= document.getElementById(itemfullName);
    if (parseInt(itemId.innerText) >= maxAvailableItem)
    {
        let itemIdTitle= getItemParam( itemRefName, itemTitle);
        let itemIdConsole= getItemParam( itemRefName, itemConsoleType);
        alert(`On voudrait bien vous en vendre plus mais on n'en n'a pas assez de "${itemIdTitle}" pour "${itemIdConsole}" en stock. Désolé...`);
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
    let itemfullName= buildItemIdNombre(itemRefName);
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
        decreaseTotalItemNb();
    }
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
function removeSelectedItem( itemRefName)
{
    // Update the selected item list
    let originalitemRefName= itemRefName.replace(prefixSelect,"");
    for (let idx=0; idx < savedSelectedList.length; idx++)
    {
        if (savedSelectedList[idx] == originalitemRefName)
        {
            // Item to be removed found !
            let priceValue= 0;
            // Search its price
            savedItemCatalog.forEach( itemIdx => {
                if (itemIdx.id == originalitemRefName)
                {
                    priceValue= parseFloat(`-${itemIdx.price}`);
                }
            });
            totalPriceUpdate( priceValue)
            // Remove the selected item from display
            let itemId= document.getElementById( buildItemIdName (itemRefName));
            itemId.remove();
            // Update the selected list
            savedSelectedList.splice(idx,1);
            // Snif ! One less item...
            decreaseTotalItemNb();
            // Done
            break;
        }
    }
}
function buildItemIdNombre( refId )
{
    return `${prefixNombre}${refId}`
}
function buildItemIdName( refId )
{
    return `${prefixSelect}${refId}`
}
function buildItemIdPrice( refId )
{
    return `${prefixPrice}${refId}`
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
    }
}
function closeModalWindow()
{
    let modalId= document.getElementById("basket");
    console.info(modalId);
}
function validBasketContent()
{
    alert("Votre commande a bien été prise en compte");
    closeModalWindow();
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
    imgId.width= "200";
    imgId.heigth= "auto";
    imgId.title= title;
    imgId.style= "margin: 3px";
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
    rowId.id= buildItemIdNombre( refId );
    rowId.innerText= "1";
    colId.appendChild(rowId);
    rowId= document.createElement("div");
    rowId.className= "row";
    colId.appendChild(rowId);
    let button= document.createElement("button");
    button.className= "btn";
    button.innerText= "+"
    button.setAttribute("onclick", `increaseOneItem("${refId}")`);
    rowId.appendChild(button);
    button= document.createElement("button");
    button.className= "btn";
    button.innerText= "-"
    button.setAttribute("onclick", `decreaseOneItem("${refId}")`);
    rowId.appendChild(button);
     // Create the forth column
    colId= document.createElement("div");
    colId.className= "col-2";
    mainItemId.appendChild(colId);
    // Add the unitary price
    rowId= document.createElement("div");
    rowId.className= "row text-center";
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
    savedBodyIdName= bodyIdName;
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
