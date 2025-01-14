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
    cartModal.style.display = "flex"
    updateCartModal();
  })


  cartModal.addEventListener("click", function (event) {
    // quando eu clicar fora do modal, ele fecha tbm
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  })

  closeModalBtn.addEventListener("click", function () {
    //botão de fechar o modal
    cartModal.style.display = "none";
  })

  menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
      const name = parentButton.getAttribute("data-name");
      const price = parseFloat(parentButton.getAttribute("data-price"));
      addToCart(name, price); // estou criando um alerta do meu pedido e passando a logica de um valor pois ele é uma string
    }
  })

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

  // Atualizando contator do carrinho
function updateCartCounter() {
  const totalitems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCounter.textContent = totalitems; 
  
}

 

  // atualizando o carrinho
  function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {       // se eu não tiver nenhum item selecionado, passe pelo FOREACH se  não, passe pelo bloco da div e incremente mais um 
      const cartItemElement = document.createElement("div"); // criando elemento HTML e fazendo os elementos percorrerem os objetos dentro da minha div criada 
      cartItemElement.classList.add("flex", "justify-between", "mb-4" ,"flex-col")
      cartItemElement.innerHTML = `
    <div  class="flex items-center justify-between">

      <div>
        <P class="font-bold">${item.name}</p>
         <P>Qtd: ${item.quantity}</p>
         <P class="font-medium mt-4">R$ ${item.price.toFixed(2)}</p>
      </div>

    
        <button class= "remove-from-cart-btn" data-name="${item.name}">
         Remover
        </button>
    
    </div>
    
    `
    total += item.price * item.quantity;

     cartItemsContainer.appendChild(cartItemElement)    // estou calculando o valor total dos meus pedidos 

    })
    cartTotal.textContent = total.toLocaleString("Pt-BR", {
      style: "currency",
      currency:"BRL"
    })
  }

  // Função para remover o item do carrinho 
  cartItemsContainer.addEventListener("click", function (event) {  // criando a função de remover itens do carrinho 
    if(event.target.classList.contains("remove-from-cart-btn")){  
      const name = event.target.getAttribute("data-name")
      removeItemCart(name);
    }
  })


function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }
  updateCartModal();
  updateCartCounter(); // Atualiza o contador aqui neste codigo 
  // 

}



   function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
      const item = cart[index];   // achando o item da minha lista 
      
      if(item.quantity > 1){
        item.quantity -= 1;
        updateCartModal();
        return;
      }
      cart.splice(index, 1);
      updateCartModal();
      updateCartCounter();
    }
   }

  addressInput.addEventListener("input", function(event){  // ao comceçar a digitar o endereço, o texto em vermelho retira
    let inputValue = event.target.value;
    if(inputValue !== ""){
      addressInput.classList.remove("border-red-500")
      addressWarn.classList.add("hidden")
    }

  })

  // Finalizando pedido
  checkoutBtn.addEventListener("click", function(){    // colocando evento de legenda em vermelho no endereço de entrega
    
   const isOpen = checkRestaurantOpen();
    if(!isOpen){
    
      Toastify({
        text: "Ops o restaurante está fechado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "hight", //  `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
        },
       
      }).showToast();

     return;
    }

    if(cart.length === 0) return;  
    if(addressInput.value === ""){
      addressWarn.classList.remove("hidden")
      addressInput.classList.add("border-red-500")
      return;
    }

    // enviando api de pedidos para o whatssapp
    const cartItems = cart.map((item) => {
      return (
        ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
      )
    }).join("")

   const message = encodeURIComponent(cartItems)
   const phone = "21964062218"
   window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");
   
   cart =[];
   updateCartModal();

  })


// verificando a hora e manipulando o card do horario
function checkRestaurantOpen(){
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
  //true = resturate aberto
}


const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
  spanItem.classList.remove("bg-red-600") // se o restaurante estiver aberto, retorne com a cor verde 
  spanItem.classList.add("bg-green-600")
}else{     // se não, retorne a cor vermelha sinalizando como fehado 
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-600")
}








// usando documentação TOASTIFY.JS PARA ALERTAS
}) 
// usando documentação TOASTIFY.JS PARA ALERTAS