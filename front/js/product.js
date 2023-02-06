const urlID = window.location.search;
const urlSearchParams = new URLSearchParams(urlID);
const productId = urlSearchParams.get('id');

//récupération data API pour affichage infos produit
async function displayProduct() {
    try {
        const reponseJSON = await fetch(`http://localhost:3000/api/products/${productId}`);
        const reponseJs = await reponseJSON.json();
        itemData(reponseJs);
    }
    catch(error) {
        console.log(error, 'erreur');
    }
};

displayProduct();

//assignation data de l'API aux éléments du DOM
function itemData(product) {

    const imageUrl = product.imageUrl;
    const altTxt = product.altTxt;
    const name = product.name;
    const price = product.price;
    const description = product.description;
    const colors = product.colors;

    createImage(imageUrl, altTxt);
    createTitle(name);
    createPrice(price);
    createDescription(description);
    createColors(colors);
}

//fonctions (create...) de création des composants du DOM
function createImage(imageUrl, altTxt) {
    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = altTxt;
    const imgContainer = document.querySelector('.item__img');
    imgContainer.appendChild(productImage);
}

function createTitle(name) {
    const productTitle = document.querySelector('#title');
    productTitle.innerText = name;
}

function createPrice(price) {
    const productPrice = document.querySelector('#price');
    productPrice.innerText = price;
}

function createDescription(description) {
    const productDescription = document.querySelector('#description');
    productDescription.innerText = description;
}

function createColors(colors) {
    const colorsContainer = document.querySelector('#colors');
    for (color of colors) {
        const productColors = document.createElement('option');
        productColors.value = color;
        productColors.innerText = color;
        colorsContainer.appendChild(productColors);
    };
}

// ajouter le produit (id, quantité, couleur) au localStorage

//je selectionne et je stocke les éléments nécessaires
const button = document.querySelector('#addToCart');
const colorChoosen = document.querySelector('option');
const quantityChoosen = document.querySelector('#quantity');

//au clic sur le bouton 'ajouter au panier' j'ajoute les infos renseignées dans le localStorage
button.addEventListener('click', function(e) {
    //empeche rafraichissement page
    e.preventDefault();

    //si une couleur et une quantité sont renseignéés je stocke dans localStorage les infos
    if (colors.value != "" && quantityChoosen.value >= 1) {
        const produit = {
            id: productId,
            color: colors.value,
            quantity: Number(quantityChoosen.value)
        };

        addBasket(produit);

    } else {
        alert("Veuillez saisir une couleur et une quantité valide");
    }
})

//méthode ajoutant les infos au localStorage sous forme clé ('basket') et valeur (id, couleur sélect et quantité sélec)
function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket)); 
}

//méthode récupérant les infos du localStorage
function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {     // le panier n'existe pas encore
        return [];            // création d'un tableau vide à savoir un panier
    } else {
        return JSON.parse(basket);
    }
}

// méthode appelant le localStorage, si celui-ci contient déjà l'article ainsi que la même couleur, alors ajouter seulement la quantité sélectionnée
function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id) && basket.find(p => p.color == product.color);// savoir si le produit est déjà dans le panier
    if (foundProduct != undefined) { // valeur que retroune .find
        foundProduct.quantity += product.quantity;
    } else {
        product.quantity = product.quantity;
        basket.push(product);
    }  
    saveBasket(basket);
}