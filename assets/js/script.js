/*
 * JavaScript file
 */
const tagItemId="id";
let totalPrice= 0;
function entryPoint( parentIdName,  totalPriceIdName)
{
    let myCatalog=[];
    myCatalog[0]=   {
                    "id": "001",
                    "title": "Mario Bross",
                    "descr": "un plombier roulant dans un kart",
                    "genre": "course",
                    "image": "Smile.png",
                    "price": "3.14",
                    "console": "XBoX"
                    };
    myCatalog[1]=   {
                    "id": "002",
                    "title": "Tweety & Sylvester",
                    "descr": "Titi et gros minet se ballade en foret",
                    "genre": "rpg",
                    "image": "Worried.png",
                    "price": "1.23",
                    "console": "PlayStation"
                    };
    myCatalog[2]=   {
                    "id": "003",
                    "title": "Kun Fu Fu",
                    "descr": "aie, ouille...",
                    "genre": "rpgbagarre",
                    "image": "Worried.png",
                    "price": "3.00",
                    "console": "PlayStation"
                    };
        let myIdList=[ "001","002"]
    //displayCaddie( parentIdName, myIdList, myCatalog);
    //let caddieFooterId= document.getElementById(caddieFooterIdName);
    //totalPriceUpdate( caddieFooterId, 0);
    fillCaddieBoddie( parentIdName, totalPriceIdName, myIdList, myCatalog)
}
function totalPriceUpdate( totalpriceId, deltaPrice)
{
    totalPrice+= parseFloat(deltaPrice);
    totalpriceId.innerText= `Total= ${totalPrice} euros`;
}
function displayOneElement( parentId, refId, title, genre, imagePath, price, consoleType)
{
    console.info(parentId);
    let mainItemId= document.createElement("div");
    mainItemId.className= "row";
    parentId.appendChild(mainItemId);
    // Create the first column
    let colImg= document.createElement("div");
    colImg.className= "col";
    mainItemId.appendChild(colImg);
    // Insert into the first column the image
    let imgId=  document.createElement("img");
    imgId.src= imagePath;
    imgId.alt= "poster";
    imgId.width= "200";
    imgId.heigth= "auto";
    imgId.title= title;
    colImg.appendChild(imgId);
    // Create the second column
    let colInfo= document.createElement("div");
    colInfo.className= "col";
    mainItemId.appendChild(colInfo);
    // Insert into the second column with the RefId
    let rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Ref: ${refId}`;
    colInfo.appendChild(rowId);
    // Insert into the second column with the Title
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Title: ${title}`;
    colInfo.appendChild(rowId);
    // Insert into the second column with the Genre
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Genre: ${genre}`;
    colInfo.appendChild(rowId);
    // Insert into the second column with the Type
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Type: ${consoleType}`;
    colInfo.appendChild(rowId);
    // Insert into the second column with the price
    rowId= document.createElement("div");
    rowId.className= "row";
    rowId.innerText= `Prix: ${price} euros`;
    colInfo.appendChild(rowId);
}
function fillCaddieBoddie( bodyTagIdName, totalPriceIdName, id_list, GoodInfo)
{
    if (id_list.length <= 0) return;
    console.log( `fillCaddieBoddie( ${bodyTagIdName}, ${totalPriceIdName}, ...)`)
    let bodyTagId= document.getElementById(bodyTagIdName);
    let totalPriceId= document.getElementById(totalPriceIdName);
    // For each selected item...
    id_list.forEach( elementIdx => {
        // Search the corresponding items
        GoodInfo.forEach( itemIdx => {
            if (itemIdx.id == elementIdx)
                {
                    // Yeap ! Display this one...
                    displayOneElement( bodyTagId, itemIdx.id, itemIdx.title, itemIdx.genre, itemIdx.image, itemIdx.price, itemIdx.console);
                    totalPriceUpdate( totalPriceId, itemIdx.price);
                }
            })
        });
}
function displayCaddie( parentIdName, id_list, GoodInfo)
{
    // Only one caddie window
    let previouscaddieModalWindowId= document.getElementById("caddieModalWindowId");
    if (previouscaddieModalWindowId != null)
    {
        previouscaddieModalWindowId.remove();      
    }
    // Build the caddie modal window
    let parentId= document.getElementById(parentIdName),
        caddieModalWindowId= document.createElement("div");
    caddieModalWindowId.className= "modal hide fade";
    // data-toggle="modal"
    caddieModalWindowId.id= "caddieModalWindowId";
    parentId.appendChild(caddieModalWindowId);
    // Add the content --> modal
    let caddieContentId= document.createElement("div");
    caddieContentId.className= "modal-content";
    caddieModalWindowId.appendChild(caddieContentId);
    // Add the header --> content
    let caddieHeaderId= document.createElement("div");
    caddieHeaderId.className= "modal-header";
    caddieHeaderId.innerText="Votre pannier";
    caddieContentId.appendChild(caddieHeaderId);
    // Add body --> content
    let caddieBoddyId= document.createElement("div");
    caddieBoddyId.className= "modal-boddy";
    caddieContentId.appendChild(caddieBoddyId);
    // Add the footer --> content
    let caddieFooterId= document.createElement("div");
    caddieFooterId.className= "modal-footer";
    caddieFooterId.style= "text-align: center;";
    totalPriceUpdate( caddieFooterId, 0);
    caddieContentId.appendChild(caddieFooterId);
    // Add a validate & cancel buttons to the footer
    let validateId= document.createElement("span");
    validateId.className="validate-button";
    validateId.innerText= "Valider";
    caddieFooterId.appendChild(validateId);
    let caddieCancelId= document.createElement("span");
    caddieCancelId.className="cancel-button";
    caddieCancelId.innerText= "Annuler";
    caddieFooterId.appendChild(caddieCancelId);
    // Fill the caddie display
    fillCaddieBoddie( caddieBoddyId, caddieFooterId, id_list, GoodInfo);
    // Display the modal window
    //? caddieModalWindowId.classList.toggle("show-modal");
    caddieModalWindowId.style.display= "block";
    }