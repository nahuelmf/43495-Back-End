const socket = io();
const button = document.getElementById("submit");

// Products form
const $formAddProduct = document.querySelector("#form-add-product");
const $listProducts = document.querySelector("#list-products");
const $nameInput = document.querySelector("#name-product");
const $priceInput = document.querySelector("#price-product");
const $imgInput = document.querySelector("#img-product");
const $tableProducts = document.querySelector("#table-products");

$formAddProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    name: $nameInput.value,
    price: $priceInput.value,
    img: $imgInput.value,
  };
  socket.emit("newProduct", newProduct);
  e.target.reset();
  location.href = "/";
});

const renderProducts = (products) => {
  if (products.length > 0) $tableProducts.innerHTML = "";
  products.forEach((product) => {
    $tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
  });
};

// Chat form

button?.addEventListener("click", () => {
  const message = {
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const eValidator = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (eValidator.test(message.email)) {
    if (!message.email || !message.message) {
      alert("Recuerde ingresar su correo y el mensaje");
    } else {
      // console.log(message);
      //Guardar en doc

      socket.emit("new-message", message);
    }
  } else {
    alert("La dirección de email no es valida");
  }
});

socket.on("new-chat-message", (messages) => {
  const date = new Date();
  // British English uses day-month-year order and 24-hour time without AM/PM
  const dateFormat = date.toLocaleString();

  const html = messages
    .map((message) => {
      let contentMessage = `<div><span class="has-text-link has-text-weight-bold	" >${message.email}</span>`;
      contentMessage += `[<span style="color:#804000"> ${dateFormat}</span>]`;
      contentMessage += `:<em> <span class="is-italic	has-text-success	"> ${message.message} </span></em></div>`;
      return contentMessage;
    })
    .join(" ");

  document.getElementById("chat").innerHTML = html;
});

socket.on("products", (products) => {
  renderProducts(products);
});
