"use strict";
//чекбокс===========================
function toggleCheckbox() {
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
}
//end чекбокс=================================
// открыть закрыть корзина==========================
function toggleCart() {
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
}
// end корзина ===========================
////////////////////////////////////////////////////////////
// работа с корзина=========================================
function addCart() {
  const cards = document.querySelectorAll(".goods .card"),
    cartWrapper = document.querySelector(".cart-wrapper"),
    countGoods = document.querySelector(".counter"),
    cartEmpty = document.querySelector(".cart-empty");

  cards.forEach((card) => {
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      showData();
      const removeBtn = cardClone.querySelector(".btn");
      removeBtn.textContent = "Удалить товар";
      removeBtn.addEventListener("click", () => {
        cardClone.remove();
        showData();
      });
    });
  });

  function showData() {
    const cardsCart = cartWrapper.querySelectorAll(".card"),
      cardPrice = cartWrapper.querySelectorAll(".card-price"),
      cartTotal = document.querySelector(".cart-total span");

    countGoods.textContent = cardsCart.length;

    let sum = 0;
    cardPrice.forEach((e) => {
      let price = parseFloat(e.textContent);
      sum += price;
    });
    cartTotal.textContent = sum;

    if (cardsCart.length !== 0) {
      cartEmpty.remove();
    } else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
}

// end работа с корзина=========================================
////////////////////////////////////////////////////////////
// фильтр акции=========================================
function filterSearch() {
  const cards = document.querySelectorAll(".goods .card"),
    checkBox = document.querySelector(".filter-check_checkbox"),
    min = document.getElementById("min"),
    max = document.getElementById("max"),
    search = document.querySelector(".search-wrapper_input"),
    searchBtn = document.querySelector(".search-btn");
  checkBox.addEventListener("click", generalFilter);
  // end фильтр акции=========================================
  // фильтр по цене=========================================
  min.addEventListener("change", generalFilter);
  max.addEventListener("change", generalFilter);
  // end фильтр по цене=========================================
  // поиск=========================================
  searchBtn.addEventListener("click", () => {
    const searchText = new RegExp(search.value.trim(), "i");
    cards.forEach((e) => {
      const title = e.querySelector(".card-title");
      if (!searchText.test(title.textContent)) {
        e.parentNode.style.display = "none";
      } else {
        e.parentNode.style.display = "";
      }
    });
  });
  // end поиск=========================================
  function generalFilter() {
    cards.forEach((e) => {
      const cardPrice = e.querySelector(".card-price"),
        price = parseFloat(cardPrice.textContent),
        discont = e.querySelector(".card-sale");
      if (
        (min.value && price < min.value) ||
        (max.value && price > max.value)
      ) {
        e.parentNode.style.display = "none";
      } else if (checkBox.checked && !discont) {
        e.parentNode.style.display = "none";
      } else {
        e.parentNode.style.display = "";
      }
    });
  }
}

toggleCheckbox();
toggleCart();
addCart();
filterSearch();
