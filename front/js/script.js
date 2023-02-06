//récupération data API pour affichage infos produits
async function displayProducts() {
    try {
        const reponseJSON = await fetch(`http://localhost:3000/api/products`);
        const reponseJs = await reponseJSON.json();
        itemsData(reponseJs);
    }
    catch(error) {
        console.log(error, 'erreur');
    }
};

displayProducts();

//assignation data de l'API aux éléments du DOM
function itemsData(reponseJs) {

    for (product of reponseJs) {
        const imageUrl = product.imageUrl;
        const altTxt = product.altTxt;
        const name = product.name;
        const description = product.description;
        const id = product._id;

        const image = createImage(imageUrl, altTxt);
        const title = createTitle(name);
        const p = createDescription(description);
        const article = createArticle();
        const anchor = createAnchor(id);

        article.appendChild(image);
        article.appendChild(title);
        article.appendChild(p);

        anchor.appendChild(article);
        const items = document.querySelector('#items');
        items.appendChild(anchor);
    }
}

//fonctions (create...) de création des composants du DOM
function createImage(imageUrl, altTxt) {
    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = altTxt;
    return productImage;
}

function createTitle(name) {
    const productTitle = document.createElement('h3');
    productTitle.innerText = name;
    productTitle.classList.add('productName');
    return productTitle;
}

function createDescription(description) {
    const productDescription = document.createElement('p');
    productDescription.innerText = description;
    productDescription.classList.add('productDescription');
    return productDescription;
}

function createArticle() {
    const article = document.createElement('article');
    return article;
}

function createAnchor(id) {
    const productAnchor = document.createElement('a');
    productAnchor.href = `product.html?id=${id}`;
    return productAnchor;
}

    