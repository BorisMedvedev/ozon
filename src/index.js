"use strict";

//чекбокс===========================
const checkBox = document.querySelectorAll(".filter-check_checkbox");
checkBox.forEach((el) => {
  el.addEventListener("change", function () {
    if (this.checked) {
      this.nextElementSibling.classList.add("checked");
    } else {
      this.nextElementSibling.classList.remove("checked");
    }
  });
});
//end чекбокс=================================

// корзина==========================
const btnCart = document.getElementById("cart"),
  modalCart = document.querySelector(".cart"),
  closeBtn = document.querySelector(".cart-close");
btnCart.addEventListener("click", () => {
  modalCart.style.display = "flex";
  document.body.style.overflow = "hidden";
});
closeBtn.addEventListener("click", () => {
  modalCart.style.display = "none";
  document.body.style.overflow = "";
});

// end корзина ===========================
//======================================================
// работа с корзина=========================================
const cards = document.querySelectorAll(".goods .card"),
  cartWrapper = document.querySelector(".cart-wrapper"),
  countGoods = document.querySelector(".counter"),
  cartEmpty = document.getElementById("cart-empty");
cards.forEach((card) => {
  const btn = card.querySelector("button");
  btn.addEventListener("click", () => {
    const cardClone = card.cloneNode(true);
    cartWrapper.appendChild(cardClone);
    cartEmpty.remove();
    showData();
  });
});

function showData() {
  const cardsCart = cartWrapper.querySelectorAll(".card"),
    cardsPrice = cartWrapper.querySelectorAll('.card-price'),
    cartTotal = document.querySelector('.cart-total span');
  let sum = 0;
  countGoods.textContent = cardsCart.length;
  cardsPrice.forEach((cardPrice) => {
    let price = parseFloat(cardPrice.textContent);
    sum += price;
  });
  cartTotal.textContent = sum;

}

// end работа с корзина=========================================
