import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Globe, ArrowLeft } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link
} from "react-router-dom";
import logo from "./assets/matrezan.png";

function Home() {
  const categories = [
    "Mesas",
    "Cadeiras",
    "Poltrona",
    "Banquetas",
    "Mesa Bistrô",
    "Complementos",
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categoria/${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Logo */}
      <div className="w-full flex justify-center mt-8 animate-fade-in">
        <img
          src={logo}
          alt="Matrezan"
          className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-auto"
        />
      </div>

      {/* Categorias centralizadas */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md gap-4 px-4 sm:px-8 md:px-12 mt-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="bg-white p-4 rounded-2xl shadow-md text-center text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:scale-105 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rodapé fixo com links externos */}
      <footer className="w-full py-4 mt-8 border-t border-gray-300 bg-gray-100">
        <div className="flex justify-center gap-6">
          <a
            href="https://matrezan.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="w-7 h-7 text-blue-600 hover:text-blue-800 transition-transform hover:scale-110 duration-200" />
          </a>
          <a
            href="https://www.facebook.com/matrezanmoveis/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-7 h-7 text-blue-600 hover:text-blue-800 transition-transform hover:scale-110 duration-200" />
          </a>
          <a
            href="https://www.instagram.com/matrezan.moveis/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-7 h-7 text-pink-500 hover:text-pink-700 transition-transform hover:scale-110 duration-200" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function Category() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      const sheetMap = {
        "Mesas": "Mesas",
        "Cadeiras": "Cadeiras",
        "Poltrona": "Poltrona",
        "Banquetas": "Banquetas",
        "Mesa Bistrô": "Mesa Bistrô",
        "Complementos": "Complementos",
      };
      const aba = sheetMap[nome];
      if (aba) {
        const url = `https://opensheet.elk.sh/1jQXJHA19q2wNRA79_JpLT0JlvlC0gQl70BlS-hI5lNk/${encodeURIComponent(aba)}`;
        const res = await fetch(url);
        const data = await res.json();
        setProdutos(data);
      } else {
        setProdutos([]);
      }
    };
    fetchProdutos();
  }, [nome]);

  const produtosFiltrados = produtos.filter((p) =>
    p["PRODUTO"].toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">{nome}</h1>

      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar produto..."
        className="mb-6 px-4 py-2 border rounded-lg shadow-sm w-full max-w-md"
      />

      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtosFiltrados.map((item, index) => {
  const imagem = `/imagens/${item["ITEM"]}-1.jpg`;

  return (
    <div key={index} className="w-full">
      <Link
        to={`/categoria/${nome}/produto/${index}`}
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform flex flex-col items-center text-center"
      >
        <img
          src={imagem}
          alt={`Imagem de ${item["PRODUTO"]}`}
          className="w-full h-48 object-cover rounded-md mb-3"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h2 className="text-xl font-semibold mb-2">{item["PRODUTO"]}</h2>
        <p><strong>Código:</strong> {item["ITEM"]}</p>
      </Link>
      <hr className="my-4 border-t border-gray-300" />
    </div>
  );
})}
        </div>
      ) : (
        <p className="text-gray-500 mb-8">Nenhum produto encontrado.</p>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-10 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition duration-200"
      >
        <ArrowLeft className="w-5 h-5" /> Voltar para categorias
      </button>
    </div>
  );
}

function Produto() {
  const { nome, id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      const sheetMap = {
        "Mesas": "Mesas",
        "Cadeiras": "Cadeiras",
        "Poltrona": "Poltrona",
        "Banquetas": "Banquetas",
        "Mesa Bistrô": "Mesa Bistrô",
        "Complementos": "Complementos",
      };
      const aba = sheetMap[nome];
      if (aba) {
        const url = `https://opensheet.elk.sh/1jQXJHA19q2wNRA79_JpLT0JlvlC0gQl70BlS-hI5lNk/${encodeURIComponent(aba)}`;
        const res = await fetch(url);
        const data = await res.json();
        setProduto(data[parseInt(id)]);
      }
    };
    fetchProduto();
  }, [nome, id]);

  if (!produto) return <p className="p-6">Carregando produto...</p>;

  const codigo = produto["ITEM"];
  const imagem1 = `/imagens/${codigo}-1.jpg`;
  const imagem2 = `/imagens/${codigo}-2.jpg`;
  const imagem3 = `/imagens/${codigo}-3.jpg`;
  const imagem4 = `/imagens/${codigo}-4.jpg`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{produto["PRODUTO"]}</h1>

      <div className="flex flex-col gap-4 mb-4">
        <img src={imagem1} alt="Imagem 1" className="rounded-lg shadow" />
        <img src={imagem2} alt="Imagem 2" className="rounded-lg shadow" />
        <img src={imagem3} alt="Imagem 3" className="rounded-lg shadow" />
        <img src={imagem4} alt="Imagem 4" className="rounded-lg shadow" />
      </div>

      <p><strong>Código:</strong> {produto["ITEM"]}</p>
      <p><strong>Peso Líquido:</strong> {produto["PESO LIQ"]}</p>
      <p><strong>Peso Bruto:</strong> {produto["PESO BRUTO"]}</p>
      <p><strong>Cubagem:</strong> {produto["CUBAGEM"]}</p>
      <p><strong>Volumes:</strong> {produto["VOLUMES"]}</p>

      <Link
        to={`/categoria/${nome}`}
        className="mt-6 inline-block text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft className="inline-block w-4 h-4 mr-1" /> Voltar para {nome}
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:nome" element={<Category />} />
        <Route path="/categoria/:nome/produto/:id" element={<Produto />} />
      </Routes>
    </Router>
  );
}
