var cart = [];
function addToCart() {
    var cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
        cart = Array.from(cartContainer.getElementsByClassName("cart"));
        if (cart.length === 0) {
            // Si le panier n'existe pas encore, créez-le
            cart = [document.createElement("ul")];
            cart[0].classList.add("cart");
            cartContainer.appendChild(cart[0]);
        }
    }
    var sandwichSelect = document.getElementById("sandwich-select");
    var meatSelect = document.getElementById("meat-select");
    var sauceCheckboxes = Array.from(document.querySelectorAll('input[name="sauce"]:checked'));
    var condimentCheckboxes = Array.from(document.querySelectorAll('input[name="condiment"]:checked'));
    var friesSelect = document.getElementById("fries-select");
    var drinkSelect = document.getElementById("drink-select");
    if (cart.length > 0 &&
        sandwichSelect &&
        meatSelect &&
        friesSelect &&
        drinkSelect) {
        var sandwich = sandwichSelect.value;
        var meat = meatSelect.value;
        var sauces = sauceCheckboxes.map(function (checkbox) { return checkbox.value; });
        var condiments = condimentCheckboxes.map(function (checkbox) { return checkbox.value; });
        var fries = friesSelect.value;
        var drink = drinkSelect.value;
        var order = {
            sandwich: sandwich,
            meat: meat,
            sauces: sauces,
            condiments: condiments,
            fries: fries,
            drink: drink
        };
        console.log("Order:", order);
        // Ajouter la commande au panier
        var orderItem = document.createElement("li");
        orderItem.textContent = JSON.stringify(order);
        cart[0].appendChild(orderItem);
        // Réinitialiser le formulaire
        resetForm();
        function formatOrder(order) {
            var sandwich = "Sandwich: ".concat(order.sandwich);
            var meat = "Viande: ".concat(order.meat);
            var sauces = "Sauces: ".concat(order.sauces.join(", "));
            var condiments = "Condiments: ".concat(order.condiments.join(", "));
            var fries = "Frites: ".concat(order.fries);
            var drink = "Boisson: ".concat(order.drink);
            return "".concat(sandwich, "\n ").concat(meat, "\n ").concat(sauces, "\n ").concat(condiments, "\n ").concat(fries, "\n ").concat(drink);
        }
        var formattedOrder = formatOrder(order);
        console.log(formattedOrder);
        displayButtonValidate(formattedOrder);
    }
}
function resetForm() {
    var cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
        var sandwichSelect = document.getElementById("sandwich-select");
        var meatSelect = document.getElementById("meat-select");
        var sauceCheckboxes = document.querySelectorAll('input[name="sauce"]');
        var condimentCheckboxes = document.querySelectorAll('input[name="condiment"]');
        var friesSelect = document.getElementById("fries-select");
        var drinkSelect = document.getElementById("drink-select");
        if (sandwichSelect && meatSelect && friesSelect && drinkSelect) {
            sandwichSelect.value = "";
            meatSelect.value = "";
            sauceCheckboxes.forEach(function (checkbox) { return (checkbox.checked = false); });
            condimentCheckboxes.forEach(function (checkbox) { return (checkbox.checked = false); });
            friesSelect.value = "";
            drinkSelect.value = "";
        }
    }
}
function displayCart() {
    console.log("-------", cart);
    var cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
        cartContainer.innerHTML = "";
        // Vérifier si le panier est vide
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Panier vide</p>";
            return;
        }
        // Parcourir les commandes du panier et les afficher
        cart.forEach(function (order, index) {
            var orderElement = document.createElement("div");
            orderElement.classList.add("order");
            var orderTitle = document.createElement("h3");
            orderTitle.textContent = "Commande ".concat(index + 1);
            orderElement.appendChild(orderTitle);
            // Afficher les détails de la commande
            var sandwichDetails = document.createElement("p");
            sandwichDetails.textContent = "Sandwich: ".concat(order.sandwich);
            orderElement.appendChild(sandwichDetails);
            var meatDetails = document.createElement("p");
            meatDetails.textContent = "Viande: ".concat(order.meat);
            orderElement.appendChild(meatDetails);
            var saucesDetails = document.createElement("p");
            saucesDetails.textContent = "Sauces: ".concat(order.sauces.join(", "));
            orderElement.appendChild(saucesDetails);
            var condimentsDetails = document.createElement("p");
            condimentsDetails.textContent = "Condiments: ".concat(order.condiments.join(", "));
            orderElement.appendChild(condimentsDetails);
            var friesDetails = document.createElement("p");
            friesDetails.textContent = "Frites: ".concat(order.fries);
            orderElement.appendChild(friesDetails);
            var drinkDetails = document.createElement("p");
            drinkDetails.textContent = "Boisson: ".concat(order.drink);
            orderElement.appendChild(drinkDetails);
            cartContainer.appendChild(orderElement);
        });
    }
}
function displayButtonValidate(order) {
    var buttonValidate = document.getElementById("button-validate");
    var button = document.createElement("button");
    var anchor = document.createElement("a");
    anchor.href = "https://api.whatsapp.com/send/?phone=33625080586&text=".concat(order, "&app_absent=0");
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = "Valider ma commande";
    button.appendChild(anchor);
    buttonValidate.appendChild(button);
}
