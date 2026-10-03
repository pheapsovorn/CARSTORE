// src/services/api.js
// Service layer for the FakeStore API
// Docs: https://fakestoreapi.com/docs

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Generic request helper around fetch().
 * Handles JSON serialization, error checking and parsing.
 *
 * @param {string} endpoint - Path relative to BASE_URL (e.g. "/products")
 * @param {object} [options] - fetch options
 * @param {string} [options.method='GET']
 * @param {object} [options.body] - plain object, will be JSON.stringified
 * @returns {Promise<any>}
 */
async function request(endpoint, { method = 'GET', body, headers, ...rest } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Try to read an error payload, fall back to the status text.
    let errorMessage = response.statusText;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody?.message || JSON.stringify(errorBody);
    } catch {
      // ignore JSON parsing errors
    }
    throw new Error(`API ${response.status}: ${errorMessage}`);
  }

  // Some endpoints (e.g. DELETE) may return an empty body.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

/* ------------------------------------------------------------------ */
/*  Products                                                           */
/* ------------------------------------------------------------------ */

/**
 * GET /products
 * Fetch the full list of products.
 * @returns {Promise<Product[]>}
 */
export function getProducts() {
  return request('/products');
}

/**
 * GET /products/{id}
 * Fetch a single product by its id.
 * @param {number|string} id
 * @returns {Promise<Product>}
 */
export function getProduct(id) {
  return request(`/products/${id}`);
}

/**
 * POST /products
 * Create a new product.
 * @param {Product} product
 * @returns {Promise<Product>}
 */
export function createProduct(product) {
  return request('/products', {
    method: 'POST',
    body: product,
  });
}

/**
 * PUT /products/{id}
 * Update an existing product by id.
 * @param {number|string} id
 * @param {Product} product
 * @returns {Promise<Product>}
 */
export function updateProduct(id, product) {
  return request(`/products/${id}`, {
    method: 'PUT',
    body: product,
  });
}

/**
 * DELETE /products/{id}
 * Delete a product by id.
 * @param {number|string} id
 * @returns {Promise<Product>}
 */
export function deleteProduct(id) {
  return request(`/products/${id}`, { method: 'DELETE' });
}

/* ------------------------------------------------------------------ */
/*  Convenience export                                                 */
/* ------------------------------------------------------------------ */

const api = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default api;