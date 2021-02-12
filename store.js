if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', onDocumentLoaded)
} else {
    onDocumentLoaded()
}

function onDocumentLoaded() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')


    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', onQuantityChanged)
    }

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var removeFromCartButton = removeCartItemButtons[i]
        removeFromCartButton.addEventListener('click', onRemoveFromCartButtonClicked)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', onAddToCartClicked)
    }

    //create anon onClickListener function for each productImage and bind
    var productImages = findProductImages();
    productImages.forEach(image => {
        image.addEventListener('click',createProductImageOnClickFunction(image.src),false);
    });

    //klick auf purchase button -> call onPurchaseClicked
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', onPurchaseClicked)
}

function createProductImageOnClickFunction(imageSrc) {
    return function() {
        console.log("clicked on image: " + imageSrc);
        var filename = imageSrc.substring(imageSrc.lastIndexOf('/')+1);
        //eliminate fileExtension
        filename = filename.split('.').slice(0, -1).join('.')
        console.log("displaying product details page of product: " + filename);
        var productHtmlUrl ="products/"+filename+".html";
        console.log("open procut html page: " + productHtmlUrl);
        window.open(productHtmlUrl);
    };
}


function findProductImages(){
    var images = document.getElementsByTagName("img");
    var productImages = [];
    for(var i = 0; i < images.length; i++){
        //do something to each div like
        if(images[i].className=="shop-item-image"){
            console.log("new image item found: " + images[i].src)
            productImages.push(images[i]);
        }
    }
    return productImages;
}

function onPurchaseClicked() {
    updateCartTotalPrice()
    cleanupCart()
    console.log("open order details page")
    window.location.href = "order-details.html";
}


function cleanupCart(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
}

function onRemoveFromCartButtonClicked(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotalPrice()

}

function onQuantityChanged(event) {
    console.log("quantity of item changed by customer")
    var input = event.target
    console.log("new quanitity value: " + input.value)
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotalPrice()
}

function onAddToCartClicked(event) {
    console.log("item shall be added to cart")
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotalPrice()
}

function addItemToCart(title, price, imageSrc) {
    console.log("shopitem that shall be added to cart: [title: " + title + "; price: " + price + "; imageSrc: " + imageSrc + "]")
    //create div with cartrow class elements in it
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    //iterate over all cartitems and check if it is already added
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    //represents one row in the cart in html, we inject the 3 values of CartItem into html via ${...}
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    console.log("inject new cart row entry (html) into cart-row div from index.html : " + cartRowContents)
    //out created row item gets this html content now; we inject html code dynamically into the website
    cartRow.innerHTML = cartRowContents
    //inject our cartRow div with all its row elements into static cart-items div in index.html
    cartItems.append(cartRow)
    //link dynamically created buttons to listener functions (n-1 relationship, n grows with every cart item dynamically added)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', onRemoveFromCartButtonClicked)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', onQuantityChanged)
}

function updateCartTotalPrice() {
    //iterate over all rows and sum up prices to get total price, then display total price
    console.log("update carts total price... ")
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        //iterate over cart rows and
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
