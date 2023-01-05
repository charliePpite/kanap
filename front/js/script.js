fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((value) => itemsData(value))

function itemsData(value) {

    value.forEach(product => {
        const imageUrl = product.imageUrl;
        const altTxt = product.altTxt;
        const name = product.name;
        const description = product.description;
        const id = product._id;

        const anchor = createAnchor(id);
        const article = createArticle();
        const image = createImage(imageUrl, altTxt);
        const title = createTitle(name);
        const p = createDescription(description);

        article.appendChild(image);
        article.appendChild(title);
        article.appendChild(p);

        anchor.appendChild(article);
        const items = document.querySelector('#items');
        items.appendChild(anchor);
    })
}

function createImage(imageUrl, altTxt) {
    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.alt = altTxt;
    return productImage;
}

function createTitle(name) {
    const productTitle = document.createElement('h3');
    productTitle.textContent = name;
    productTitle.classList.add('productName');
    return productTitle;
}

function createDescription(description) {
    const productDescription = document.createElement('p');
    productDescription.textContent = description;
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

    //     value.forEach(product => {

    //         //création des éléments composant ma carte produit
    //         let productAnchor = document.createElement('a');
    //         let productCart = document.createElement('article');
    //         let productImage = document.createElement('img');
    //         let productTitle = document.createElement('h3');
    //         let productDescription = document.createElement('p');

    //         //ajout classe pour titre et description
    //         productTitle.classList.add('productName');
    //         productDescription.classList.add('productDescription');

    //         //ajout des éléments composant l'article
    //         productCart.appendChild(productImage);
    //         productCart.appendChild(productTitle);
    //         productCart.appendChild(productDescription);

    //         //ajout de l'article à l'anchor
    //         productAnchor.appendChild(productCart);

    //         //ajout de l'anchor au container #items
    //         const items = document.querySelector('#items');
    //         items.appendChild(productAnchor);

    //         //modification DOM avec value récupérées de l'API
    //         productImage.src = `${product.imageUrl}`;
    //         productImage.alt = `${product.altTxt}`;
    //         productTitle.textContent = `${product.name}`;
    //         productDescription.textContent = `${product.description}`;

    //         //lien entre produit page d'accueil et sa page produit avec URL searchParams
    //         productAnchor.href = `product.html?id=${product._id}`;
    //     });

    