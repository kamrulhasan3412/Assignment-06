let cart = [];
let total = 0;

// Load categories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

const displayCategories = (categories) => {
  console.log(categories);
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  for (let cat of categories) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `<button id='category-btn-${cat.id}'  onclick="loadLevelTree('${cat.id}')" class="category-btn btn active:bg-[#15803d] hover:bg-green-600 hover:text-white btn-outline border-none text-[#1f2937]">${cat.category_name}</button>`;

    categoryContainer.append(btnDiv);
  }
};

// All trees default categories parts

const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => displayLevelTree(json.plants));
};

// Remove active button
const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((btn) => btn.classList.remove("active"));
};

// trees by categories parts

const loadLevelTree = (categoryId) => {
  document.getElementById("tree-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");

  const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`category-btn-${categoryId}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelTree(data.plants);
    });
};

const loadTreeDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  // console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayDetails(data.plants);
    });
};

const displayLevelTree = (trees) => {
  const treeContainer = document.getElementById("tree-container");
  treeContainer.innerHTML = "";

  trees.forEach((tree) => {
    // console.log(tree);
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="card_div bg-base-100 shadow-sm p-4 rounded-lg h-[470px]">
              <figure>
                <img
                  src="${tree.image}"
                  alt=""
                  class="rounded-xl h-[190px] w-full"
                />
              </figure>
              <div class="items-center text-center ">
                <h2 onclick="loadTreeDetails(${tree.id})" class="card-title text-[14px] font-semibold mt-3">
                  ${tree.name}
                </h2>
                <p class="text-[12px] text-left opacity-80 text-[#1f2937] my-2">
                  ${tree.description}
                </p>
                <div class="flex justify-between items-center mb-3">
                  <div
                    class="bg-[#dcfce7] text-[#15803D] text-[14px] font-medium rounded-full px-3 py-1"
                  >
                    ${tree.category}
                  </div>
                  <div>৳<span class="price">${tree.price}</span></div>
                </div>
                <div class="card-actions">
                  <button onclick="addToCart(this)"
                    class="btn btn-primary w-full text-white bg-[#15803d] rounded-[999px]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>`;

    treeContainer.append(card);
  });
  document.getElementById("tree-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
};

loadAllPlants();
loadCategories();

// Add to cart features

const addToCart = (addBtn) => {
  const card = addBtn.parentNode.parentNode;
  const title = card.querySelector(".card-title").innerText;
  const price = card.querySelector(".price").innerText;
  const numPrice = Number(price);
  // console.log(title, numPrice);
  cart.push(title);

  let div = document.createElement("div");
  let addHistoryEl = document.getElementById("add-to-cart");

  div.innerHTML = `<div
                  class="flex justify-between items-center mb-2 px-3 py-2 rounded-lg bg-[#f0fdf4]"
                >
                  <div>
                    <h3
                      class="history-title text-[14px] font-semibold text-[#1f2937] pb-1 font-inter"
                    >
                      ${title}
                    </h3>
                    <p class="text-[#1f2937] opacity-50">৳<span class="cart-price">${numPrice}</span> x 1</p>
                  </div>
                  <div onclick="removeCart(this)">
                    <i class="fa-solid fa-xmark text-[#1f2937] opacity-50"></i>
                  </div>
                </div>`;

  addHistoryEl.appendChild(div);
  total = total + numPrice;
  displayTotal(total);
};

const removeCart = (removeBtn) => {
  const item = removeBtn.parentNode;
  const historyPrice = item.querySelector(".cart-price").innerText;
  total = total - parseInt(historyPrice);
  displayTotal(total);
  console.log(historyPrice);
  item.remove();
};

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val;
};

// modal features
const displayDetails = (detailsTree) => {
  console.log(detailsTree);
  const detailContainer = document.getElementById("details-container");
  // console.log(detailContainer);
  detailContainer.innerHTML = `
 <div>
  <div class="bg-base-100">
    <h2 class="text-[14px] font-semibold mb-3">${detailsTree.name}</h2>
    <figure>
      <img
        src="${detailsTree.image}"
        alt=""
        class="rounded-xl h-[190px] w-full"
      />
    </figure>
    <p class="text-[12px] text-left opacity-80 text-[#1f2937] my-2">
      <span class="text-[14px] text-black font-semibold">category:</span>
      ${detailsTree.category}
    </p>
    <div class="price">
      <span class="text-[14px] font-semibold">Price:</span> ৳<span
        >${detailsTree.price}</span
      >
    </div>
    <p class="text-[12px] text-left opacity-80 text-[#1f2937] my-2">
      <span class="text-[14px] font-semibold text-black">Description:</span>
      ${detailsTree.description}
    </p>
  </div>
</div>
  `;
  document.getElementById("my_modal_5").showModal();
};
