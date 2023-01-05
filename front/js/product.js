const urlID = window.location.search;
const urlSearchParams = new URLSearchParams(urlID);
const productId = urlSearchParams.get('id');
console.log(productId);

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