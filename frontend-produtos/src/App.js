import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [produto, setProduto] = useState({ nome: '', preco: '', quantidade: '' });
  const [produtos, setProdutos] = useState([]);

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
        quantidade: parseInt(produto.quantidade),
      }),
    });
    setProduto({ nome: '', preco: '', quantidade: '' });
    fetchProdutos(); // Atualiza lista
  };

  const fetchProdutos = async () => {
    const response = await fetch('http://localhost:3000/produtos');
    const data = await response.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="container">
      <h1>Cadastro de Produto</h1>
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={produto.nome} onChange={handleChange} required />
        <input name="preco" type="number" placeholder="Preço" value={produto.preco} onChange={handleChange} step="0.01" required />
        <input name="quantidade" type="number" placeholder="Quantidade" value={produto.quantidade} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Produtos Cadastrados</h2>
      <ul>
        {produtos.map((p, index) => (
          <li key={index}>{p.nome} - R$ {p.preco.toFixed(2)} - Quantidade: {p.quantidade}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
