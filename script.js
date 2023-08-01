// Initialize cart count
let cartCount = 0;

// Create the container for product display
const container = document.createElement("div");
container.setAttribute("class", "container");

// Create a row within the container
const row = document.createElement("div");
row.setAttribute("class", "row");

// Append the container and row to the body
document.body.append(container);
container.appendChild(row);

// Function to fetch store data from the API
const displayStoreData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    return data;
}

// Function to update the cart count and cart icon
function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    cartCount++;
    cartCountElement.innerText = cartCount;
}

// Function to display category-wise data
function displayCategoryData(category) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ""; // Clear previous products

    // Fetch data from the API and filter based on the selected category
    displayStoreData().then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category === category || category === "all") {
                // Add product cards to the productsContainer
                productsContainer.innerHTML += `
                  <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div class="card h-100">
                      <div class="card-header text-center">${data[i].category}</div>
                      <img class="card-img-top" src="${data[i].image}" alt="Card image cap">
                      <div class="card-body text-center" id="card-body">
                        <p class="card-text product-title">${data[i].title}</p>
                        <p class="card-text">Rs. ${data[i].price}</p>
                        <a href="#" class="btn btn-primary">ADD to CART</a>
                      </div>
                    </div>
                  </div>`;
            }
        }

        // Add event listeners to the new cart buttons
        let cartButtons = document.querySelectorAll(".btn-primary");
        cartButtons.forEach((button, index) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                updateCartCount();
                alert(`${data[index].title} Added to Cart`);
            });
        });
    });
}

// Add event listeners to category links
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const category = link.getAttribute("data-category");
        displayCategoryData(category);
    });
});

// Initially display all products
displayCategoryData("all");
