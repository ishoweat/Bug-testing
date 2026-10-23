function updateInventory(inventory, productId, quantity) {
  // Validate that quantity is a finite non-negative number
  if (typeof quantity !== 'number' || !isFinite(quantity) || quantity < 0) {
    return { success: false, message: 'Invalid quantity' };
  }

  const product = inventory.find(item => item.id === productId);

  if (!product) {
    return { success: false, message: 'Product not found' };
  }

  // Create a shallow copy of the product to avoid mutating the original inventory
  const updatedProduct = { ...product };
  const remainingStock = updatedProduct.stock - quantity;

  if (remainingStock < 0) {
    return { success: false, message: 'Insufficient stock' };
  }

  updatedProduct.stock = remainingStock;

  return {
    success: true,
    productId: updatedProduct.id,
    remainingStock: updatedProduct.stock
  };
}

const inventory = [
  { id: 101, name: 'Laptop', stock: 5 },
  { id: 102, name: 'Keyboard', stock: 10 }
];

console.log(updateInventory(inventory, 101, 8));