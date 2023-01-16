async function displayProduct() {
    try {
        const reponseJSON = await fetch(`http://localhost:3000/api/products`);
        const value = await reponseJSON.json();
        //console.log(reponseJS);
        itemsData(value);
        
    }
    catch(error) {
        console.log(error, 'erreur');
    }
};

displayProduct();


// fetch("http://localhost:3000/api/products")
//     .then((response) => response.json())
//     .then((value) => itemsData(value))

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

    