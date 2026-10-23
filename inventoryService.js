function updateInventory(inventory, productId, quantity) {
  // Validate that quantity is a finite non-negative number
  if (typeof quantity !== 'number' || !isFinite(quantity) || quantity < 0) {
    return { success: false, message: 'Invalid quantity' };
  }

  const product = inventory.find(item => item.id === productId);

  if (!product) {
    return { success: false, message: 'Product not found' };
  }

  // Create a shallow copy of the product to avoid mutating the original inventory reference
  const updatedProduct = { ...product };
  const remainingStock = updatedProduct.stock - quantity;

  if (remainingStock < 0) {
    return { success: false, message: 'Insufficient stock' };
  }

  updatedProduct.stock = remainingStock;

  // Persist the updated stock back into the original inventory array
  product.stock = remainingStock;

  return {
    success: true,
    productId: updatedProduct.id,
    remainingStock: updatedProduct.stock
  };
}