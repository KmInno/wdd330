import { setLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
  const imageUrl = product.Image || 'path/to/default-image.jpg';
  const altText = product.NameWithoutBrand || 'Product Image';
  return `<section class="product-detail">
    <h3>${product.Brand?.Name || 'Unknown Brand'}</h3>
    <h2 class="divider">${product.NameWithoutBrand || 'Unknown Product'}</h2>
    <img
      class="divider"
      src="${imageUrl}"
      alt="${altText}"
    />
    <p class="product-card__price">$${product.FinalPrice || '0.00'}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || 'No Color'}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple || 'No Description Available'}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id || ''}">Add to Cart</button>
    </div>
  </section>`;
}


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails('main');
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {

    // then add the current product to the list
    cartContents.push(this.product);
    setLocalStorage('so-cart', cartContents);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsTemplate(this.product)
    );
  }
}