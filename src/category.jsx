import React from "react";
import { useParams, Link } from "react-router-dom";

// Exemplo de dados estáticos — você pode depois puxar de um JSON ou API
const produtosPorCategoria = {
  Mesas: [
    { id: 1, nome: "Mesa de Jantar", imagem: "/produtos/mesa1.jpg", descricao: "Mesa retangular de madeira maciça" },
    { id: 2, nome: "Mesa Redonda", imagem: "/produtos/mesa2.jpg", descricao: "Mesa redonda com tampo de vidro" },
  ],
  Cadeiras: [
    { id: 1, nome: "Cadeira Estofada", imagem: "/produtos/cadeira1.jpg", descricao: "Cadeira com encosto estofado" },
    { id: 2, nome: "Cadeira Madeira", imagem: "/produtos/cadeira2.jpg", descricao: "Cadeira rústica de madeira" },
  ],
  // ... repita para as demais categorias
};

export default function Category() {
  const { nome } = useParams();
  const produtos = produtosPorCategoria[nome] || [];

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">{nome}</h1>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado nesta categoria.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition p-4">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{produto.nome}</h2>
              <p className="text-gray-600">{produto.descricao}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Voltar para categorias
        </Link>
      </div>
    </div>
  );
}
