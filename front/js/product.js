const urlID = window.location.search;
const urlSearchParams = new URLSearchParams(urlID);
const productId = urlSearchParams.get('id');
//console.log(productId);

//récupération data API pour affichage infos produit
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(value => itemsData(value))

function itemsData(product) {

    const imageUrl = product.imageUrl;
    const altTxt = product.altTxt;
    const name = product.name;
    const price = product.price;
    const description = product.description;
    const colors = product.colors;

    createImage(imageUrl, altTxt); // procédure
    createTitle(name);
    createPrice(price);
    createDescription(description);
    createColors(colors);

}

function createImage(imageUrl, altTxt) {
    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = altTxt;
    const imgContainer = document.querySelector('.item__img');
    imgContainer.appendChild(productImage);
}

function createTitle(name) {
    const productTitle = document.querySelector('#title');
    productTitle.textContent = name;
}

function createPrice(price) {
    const productPrice = document.querySelector('#price');
    productPrice.textContent = price;
}

function createDescription(description) {
    const productDescription = document.querySelector('#description');
    productDescription.textContent = description;
}

function createColors(colors) {
    const colorsContainer = document.querySelector('#colors');
    colors.forEach((color) => {
        const productColors = document.createElement('option');
        productColors.value = color;
        productColors.textContent = color;
        colorsContainer.appendChild(productColors);
    });
}

// ajouter le produit (id, quantité, couleur) au localStorage

//je selectionne et je stocke les éléments nécessaires
const button = document.querySelector('#addToCart');
const colorChoosen = document.querySelector('option');
const quantityChoosen = document.querySelector('#quantity');

button.addEventListener('click', function(e) {
    //empeche rafraichissement page
    e.preventDefault();
    //console.log('button appuyé')

    if (colors.value != "" && quantityChoosen.value >= 1) {

        //je stocke les valeurs sélectionnées par user dans une variable produit
        const produit = {
            id: productId,
            color: colors.value,
            quantity: Number(quantityChoosen.value)
        };
        console.log(produit, 'produit');

        function saveBasket(basket) {
            localStorage.setItem('basket', JSON.stringify(basket)); // clé - valeur
        }

        function getBasket() {
            let basket = localStorage.getItem('basket');
            if (basket == null) {        // le panier n'existe pas encore
                return [];              // création d'un tableau vide à savoir un panier
            } else {
                return JSON.parse(basket);
            }
        }

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
        
        addBasket(produit);

    } else {
        alert("Veuillez saisir une couleur et une quantité valide");
    }
    
})