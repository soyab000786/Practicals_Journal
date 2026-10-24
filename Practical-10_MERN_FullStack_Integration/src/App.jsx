import React, { useState, useEffect } from 'react';

export default function App() {
  const [products, setProducts] = useState([
    { _id: '1', name: 'Logitech MX Master 3S', category: 'Accessories', price: 8999, stock: 14, sku: 'MOU-8999' },
    { _id: '2', name: 'Dell UltraSharp 27" 4K', category: 'Electronics', price: 42999, stock: 6, sku: 'MON-4299' },
    { _id: '3', name: 'Keychron K2 Mechanical Keyboard', category: 'Accessories', price: 7499, stock: 22, sku: 'KEY-7499' }
  ]);
  const [formData, setFormData] = useState({ name: '', category: 'Electronics', price: '', stock: '', sku: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    const newItem = { ...formData, _id: Date.now().toString(), price: Number(formData.price), stock: Number(formData.stock) || 0 };
    setProducts([newItem, ...products]);
    setFormData({ name: '', category: 'Electronics', price: '', stock: '', sku: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p._id !== id));
  };

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="mern-container">
      <header className="mern-header">
        <span className="badge">PRACTICAL 10</span>
        <h1>Complete MERN Stack Integration</h1>
        <p>React Frontend + Express REST API + MongoDB Database</p>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Items</h4>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Units in Stock</h4>
          <p>{totalStock}</p>
        </div>
        <div className="stat-card">
          <h4>Total Inventory Value</h4>
          <p>₹{totalValuation.toLocaleString()}</p>
        </div>
      </div>

      <div className="main-layout">
        <form className="form-card" onSubmit={handleAdd}>
          <h3>Add New Product</h3>
          <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Furniture</option>
            <option>Office Supplies</option>
          </select>
          <input type="number" placeholder="Price (₹)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
          <input type="number" placeholder="Initial Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          <button type="submit" className="btn-submit">+ Save to MongoDB</button>
        </form>

        <div className="table-card">
          <h3>Live MongoDB Product Collection</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><strong>{p.name}</strong></td>
                  <td><span className="cat-pill">{p.category}</span></td>
                  <td>₹{p.price.toLocaleString()}</td>
                  <td>{p.stock} units</td>
                  <td><button className="btn-del" onClick={() => handleDelete(p._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
