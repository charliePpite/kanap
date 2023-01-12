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
//console.log(getBasket());

//récupérer le panier du localStorage
const list = getBasket();
//console.log(list);

// const productsList = JSON.parse(localStorage.getItem('basket'));
// console.log(productsList);

list.forEach((product) => {
    //console.log(product);
    
    const id = product.id;
    const color = product.color;
    const quantity = product.quantity;
    //console.log(id, color, quantity);

    async function displayProduct() {
        try {
            const reponseJSON = await fetch(`http://localhost:3000/api/products/${id}`);
            const reponseJS = await reponseJSON.json();
            //console.log(reponseJS);
            const productArticle = 
            `
                <article class="cart__item" data-id="${id}" data-color="${color}">
                    <div class="cart__item__img">
                        <img src="${reponseJS.imageUrl}" alt="${reponseJS.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${reponseJS.name}</h2>
                            <p>${color}</p>
                            <p>${reponseJS.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            `;
            const productContainer = document.querySelector('#cart__items');
            productContainer.innerHTML += productArticle;


        }
        catch(error) {
            console.log(error, 'erreur');
        }
    }
    displayProduct();
    
    /*fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(value => { 
        //console.log(value)
        //problème de tri des produits - la méthode .sort() ne fonctionne pas avant fetch
        const productArticle = `
                                <article class="cart__item" data-id="${id}" data-color="${color}">
                                    <div class="cart__item__img">
                                        <img src="${value.imageUrl}" alt="${value.altTxt}">
                                    </div>
                                    <div class="cart__item__content">
                                        <div class="cart__item__content__description">
                                            <h2>${value.name}</h2>
                                            <p>${color}</p>
                                            <p>${value.price} €</p>
                                        </div>
                                        <div class="cart__item__content__settings">
                                            <div class="cart__item__content__settings__quantity">
                                                <p>Qté : </p>
                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                                            </div>
                                            <div class="cart__item__content__settings__delete">
                                                <p class="deleteItem">Supprimer</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                `;
        
    const productContainer = document.querySelector('#cart__items');
    productContainer.innerHTML += productArticle;

    const buttonDeleteProduct = document.querySelector('.deleteItem');
    console.log(buttonDeleteProduct, "button");

    
    })*/
})





