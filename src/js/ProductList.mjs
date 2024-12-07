import { renderListWithTemplate } from "./utils.mjs"; // Import the utility function
  
function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
        <h3 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>`;
  }
  

  export default class ProductListing {
    constructor(category, dataSource, listElement) {
      this.category = category; 
      this.dataSource = dataSource;
      this.listElement = listElement; 
    }
  
    // Initialize the product listing (fetch data)
    async init() {
      try {
        // Get the product list for the specified category
        const products = await this.dataSource.getData(this.category);

        const filterProducts = this.filterTopFour(products)
  
        // For now, just log the fetched products
        console.log(filterProducts);
        this.renderList(filterProducts)
      } catch (error) {
        console.error("Error initializing product listing:", error);
      }
    }

    filterTopFour(products) {
      return products.slice(0,4)
    }

      // Render the list of product cards
  // Refactored renderList to use the utility function
  renderList(products) {
    // Use the renderListWithTemplate utility function to insert the product cards
    renderListWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", false);
  }
  }
  