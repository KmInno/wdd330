import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';
import ProductDetails from './productDetails.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');
console.log(`Product ID: ${productId}`);

const product = new ProductDetails(productId, dataSource);
product.init();

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
