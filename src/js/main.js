import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';

// Create an instance of ProductData (assuming it fetches data for the 'tents' category)
const productData = new ProductData('tents');

// Define the HTML element where the product list will be rendered
const listElement = document.querySelector('#product-list');

// Create an instance of ProductListing, passing the productData instance, and initialize it
const productListing = new ProductListing('tents', productData, listElement);
productListing.init();
