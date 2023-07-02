let cart: HTMLElement[] = [];

function addToCart() {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cart = Array.from(
      cartContainer.getElementsByClassName(
        "cart"
      ) as HTMLCollectionOf<HTMLElement>
    );
    if (cart.length === 0) {
      // Si le panier n'existe pas encore, créez-le
      cart = [document.createElement("ul")];
      cart[0].classList.add("cart");
      cartContainer.appendChild(cart[0]);
    }
  }

  const sandwichSelect = document.getElementById(
    "sandwich-select"
  ) as HTMLSelectElement;
  const meatSelect = document.getElementById(
    "meat-select"
  ) as HTMLSelectElement;
  const sauceCheckboxes = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[name="sauce"]:checked')
  );
  const condimentCheckboxes = Array.from(
    document.querySelectorAll<HTMLInputElement>(
      'input[name="condiment"]:checked'
    )
  );
  const friesSelect = document.getElementById(
    "fries-select"
  ) as HTMLSelectElement;
  const drinkSelect = document.getElementById(
    "drink-select"
  ) as HTMLSelectElement;

  if (
    cart.length > 0 &&
    sandwichSelect &&
    meatSelect &&
    friesSelect &&
    drinkSelect
  ) {
    const sandwich = sandwichSelect.value;
    const meat = meatSelect.value;
    const sauces = sauceCheckboxes.map((checkbox) => checkbox.value);
    const condiments = condimentCheckboxes.map((checkbox) => checkbox.value);
    const fries = friesSelect.value;
    const drink = drinkSelect.value;

    const order = {
      sandwich,
      meat,
      sauces,
      condiments,
      fries,
      drink,
    };

    console.log("Order:", order);
    // Ajouter la commande au panier
    const orderItem = document.createElement("li");
    orderItem.textContent = JSON.stringify(order);
    cart[0].appendChild(orderItem);
    // Réinitialiser le formulaire
    resetForm();

    function formatOrder(order: any): string {
      const sandwich = `Sandwich: ${order.sandwich}`;
      const meat = `Viande: ${order.meat}`;
      const sauces = `Sauces: ${order.sauces.join(", ")}`;
      const condiments = `Condiments: ${order.condiments.join(", ")}`;
      const fries = `Frites: ${order.fries}`;
      const drink = `Boisson: ${order.drink}`;

      return `${sandwich}\n ${meat}\n ${sauces}\n ${condiments}\n ${fries}\n ${drink}`;
    }

    const formattedOrder = formatOrder(order);
    console.log(formattedOrder);
    displayButtonValidate(formattedOrder);
  }
}

function resetForm() {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    const sandwichSelect = document.getElementById(
      "sandwich-select"
    ) as HTMLSelectElement;
    const meatSelect = document.getElementById(
      "meat-select"
    ) as HTMLSelectElement;
    const sauceCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="sauce"]'
    );
    const condimentCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[name="condiment"]'
    );
    const friesSelect = document.getElementById(
      "fries-select"
    ) as HTMLSelectElement;
    const drinkSelect = document.getElementById(
      "drink-select"
    ) as HTMLSelectElement;

    if (sandwichSelect && meatSelect && friesSelect && drinkSelect) {
      sandwichSelect.value = "";
      meatSelect.value = "";
      sauceCheckboxes.forEach((checkbox) => (checkbox.checked = false));
      condimentCheckboxes.forEach((checkbox) => (checkbox.checked = false));
      friesSelect.value = "";
      drinkSelect.value = "";
    }
  }
}

function displayCart() {
  console.log("-------", cart);
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cartContainer.innerHTML = "";

    // Vérifier si le panier est vide
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Panier vide</p>";
      return;
    }

    // Parcourir les commandes du panier et les afficher
    cart.forEach((order, index) => {
      const orderElement = document.createElement("div");
      orderElement.classList.add("order");

      const orderTitle = document.createElement("h3");
      orderTitle.textContent = `Commande ${index + 1}`;
      orderElement.appendChild(orderTitle);

      // Afficher les détails de la commande
      const sandwichDetails = document.createElement("p");
      sandwichDetails.textContent = `Sandwich: ${order.sandwich}`;
      orderElement.appendChild(sandwichDetails);

      const meatDetails = document.createElement("p");
      meatDetails.textContent = `Viande: ${order.meat}`;
      orderElement.appendChild(meatDetails);

      const saucesDetails = document.createElement("p");
      saucesDetails.textContent = `Sauces: ${order.sauces.join(", ")}`;
      orderElement.appendChild(saucesDetails);

      const condimentsDetails = document.createElement("p");
      condimentsDetails.textContent = `Condiments: ${order.condiments.join(
        ", "
      )}`;
      orderElement.appendChild(condimentsDetails);

      const friesDetails = document.createElement("p");
      friesDetails.textContent = `Frites: ${order.fries}`;
      orderElement.appendChild(friesDetails);

      const drinkDetails = document.createElement("p");
      drinkDetails.textContent = `Boisson: ${order.drink}`;
      orderElement.appendChild(drinkDetails);

      cartContainer.appendChild(orderElement);
    });
  }
}

function displayButtonValidate(order: string) {
  const buttonValidate = document.getElementById(
    "button-validate"
  ) as HTMLDivElement;
  const button = document.createElement("button");
  const anchor = document.createElement("a");
  anchor.href = `https://api.whatsapp.com/send/?phone=33625080586&text=${order}&app_absent=0`;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.textContent = "Valider ma commande";
  button.appendChild(anchor);
  buttonValidate.appendChild(button);
}
