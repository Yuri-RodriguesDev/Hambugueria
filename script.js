document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const cartCounter = document.getElementById("cart-count");
  const addressInput = document.getElementById("address");
  const addressWarn = document.getElementById("address-warn");

  let cart = [];

  // abrindo o modal do carrinho
  cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex";
  });

  // fechando o modal do carrinho
  cartModal.addEventListener("click", function (event) {
    console.log(event);
  });

  cartModal.addEventListener("click", function (event) {
    // quando eu clicar fora do modal, ele fecha tbm
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  closeModalBtn.addEventListener("click", function () {
    //botão de fechar o modal
    cartModal.style.display = "none";
  });

  menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
      const name = parentButton.getAttribute("data-name");
      const price = parseFloat(parentButton.getAttribute("data-price"));
      addToCart(name, price); // estou criando um alerta do meu pedido e passando a logica de um valor pois ele é uma string
    }
  });

  function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name); // metodo que vai percorrer minha lista de item

    if (existingItem) {
      existingItem.quantity += 1; // Se o item ja existe, incrementa mais uma quantidade +1
    } else {
      cart.push({
        name,
        price,
        quantity: 1,
      });
    }
    updateCartModal();
  }

  // atualizando o carrinho
  function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const cartItemElement = document.createElement("div");

      cartItemElement.innerHTML = `
    <div>

      <div>
        <P>${item.name}</p>
         <P>${item.quantity}</p>
         <P>${item.price}</p>
      </div>

      <div>
        <button>
         Remover
        </button>
      </div>
    
    </div>
    
    `
     cartItemsContainer.appendChild(cartItemElement)

    })
  }


})
