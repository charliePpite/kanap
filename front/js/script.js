fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((value) => {

        value.forEach(product => {

            //création des éléments composant ma carte produit
            let productAnchor = document.createElement('a');
            let productCart = document.createElement('article');
            let productImage = document.createElement('img');
            let productTitle = document.createElement('h3');
            let productDescription = document.createElement('p');

            //ajout classe pour titre et description
            productTitle.classList.add('productName');
            productDescription.classList.add('productDescription');

            //ajout des éléments composant l'article
            productCart.appendChild(productImage);
            productCart.appendChild(productTitle);
            productCart.appendChild(productDescription);

            //ajout de l'article à l'anchor
            productAnchor.appendChild(productCart);

            //ajout de l'anchor au container #items
            const items = document.querySelector('#items');
            items.appendChild(productAnchor);

            //modification DOM avec value récupérées de l'API
            productImage.src = `${product.imageUrl}`;
            productImage.alt = `${product.altTxt}`;
            productTitle.textContent = `${product.name}`;
            productDescription.textContent = `${product.description}`;

            //lien entre produit page d'accueil et sa page produit avec URL searchParams
            productAnchor.href = `product.html?id=${product._id}`;
        });

    } 
    )