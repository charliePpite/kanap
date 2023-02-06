const itemsList = JSON.parse(localStorage.getItem('basket'));
//console.log(itemsList);

let totalPrice = 0;

//boucler sur chaque item présent dans le tableau récupéré du LocalStorage
itemsList.forEach((item) => {
    let id = item.id;
    let color = item.color;
    let quantity = item.quantity;
    //console.log(id, color, quantity);
    displayItem(id, color, quantity);
    totalQuantityItems()

    async function displayItem(id, color, quantity) {
        try {
            const reponseJSON = await fetch(`http://localhost:3000/api/products/${id}`);
            const value = await reponseJSON.json();
            //console.log(value);
    
            let itemId = id;
            let itemColor = color;
            let itemQuantity = quantity;
    
            itemsData(value, itemId, itemColor, itemQuantity);

            //récupérer pour chaque objet du localStorage (panier), ces infos de l'API
            function itemsData(value, itemId, itemColor, itemQuantity) {

                //création des éléments du DOM pour afficher un item
                const article = createArticle(itemId, itemColor);
                
                const imageContainer = createImageContainer(value);
                article.appendChild(imageContainer);
                
                const cartItemContent = createCartItemContent(value, itemColor, itemQuantity);
                article.appendChild(cartItemContent);
            }
            
            function createArticle(itemId, itemColor) {
                const articleContainer = document.querySelector('#cart__items');

                const article = document.createElement('article');
                article.classList.add('cart__item');
                article.dataset.id = itemId;
                article.dataset.color = itemColor;

                articleContainer.appendChild(article);

                return article;
            }
            
            function createImageContainer(value) {
                const div = document.createElement('div');
                div.classList.add('cart__item__img');
                const image = document.createElement('img');
                image.src = value.imageUrl;
                image.alt = value.altTxt;
                div.appendChild(image);
                return div;
            }

            function createCartItemContent(value, itemColor, itemQuantity) {
                const contentContainer = document.createElement('div');
                contentContainer.classList.add('cart__item__content');

                const description = createCartItemContentDescription(value, itemColor);
                const settings = createCartItemContentSettings(itemQuantity);

                contentContainer.appendChild(description);
                contentContainer.appendChild(settings);

                return contentContainer;
            }

            function createCartItemContentDescription(value, itemColor) {
                const description = document.createElement('div');
                description.classList.add('cart__item__content__description');

                const title = document.createElement('h2');
                title.textContent = value.name;

                const colorParagraph = document.createElement('p');
                colorParagraph.textContent = itemColor;

                const priceParagraph = document.createElement('p');
                priceParagraph.textContent = value.price + ' €';

                description.appendChild(title);
                description.appendChild(colorParagraph);
                description.appendChild(priceParagraph);
                
                return description;
            }

            function createCartItemContentSettings(itemQuantity) {
                const settings = document.createElement('div');
                settings.classList.add('cart__item__content__settings');

                createCartItemContentSettingsQuantity(settings, itemQuantity);
                createCartItemContentSettingsDelete(settings)
                return settings;
            }

            function createCartItemContentSettingsQuantity(settings, itemQuantity) {
                const settingsQuantity = document.createElement('div');
                settingsQuantity.classList.add('cart__item__content__settings__quantity');

                const quantityParagraph = document.createElement('p');
                quantityParagraph.textContent = 'Qté : ';

                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.classList.add = 'itemQuantity';
                quantityInput.name = 'itemQuantity';
                quantityInput.min = '1';
                quantityInput.max = '100';
                quantityInput.value = itemQuantity;

                settingsQuantity.appendChild(quantityParagraph);
                settingsQuantity.appendChild(quantityInput);
                settings.appendChild(settingsQuantity);
            }

            function createCartItemContentSettingsDelete(settings) {
                const settingsDelete = document.createElement('div');
                settingsDelete.classList.add('cart__item__content__settings__delete');

                const deleteParagraph = document.createElement('p');
                deleteParagraph.classList.add('deleteItem');
                deleteParagraph.textContent = 'Supprimer';

                settingsDelete.appendChild(deleteParagraph);
                settings.appendChild(settingsDelete);
            }

            totalPriceItems(value, item)
        }
        catch(error) {
            console.log(error, 'erreur');
        }
    };
     
});

////////////////// calcul prix total ///////////////////////////

function totalPriceItems(value, item) {
    totalPrice += item.quantity * value.price;
    const totalPriceItems = document.querySelector('#totalPrice');
    totalPriceItems.innerText = totalPrice;
    return totalPrice;
}

////////////////// calcul total produits ///////////////////////////

function totalQuantityItems(){
    let basket = itemsList;
    let total = 0;
    for (let item of basket) {
        total += item.quantity
    }

    const totalQuantityItems = document.querySelector('#totalQuantity');
    totalQuantityItems.innerText = total;
}






