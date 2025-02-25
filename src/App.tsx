import React, { useState, useEffect } from 'react';
import { PriceCard } from './components/PriceCard';
import { SearchFilters } from './components/SearchFilters';
import { Product } from './types';
import { RefreshCw } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Smartphone Galaxy S23',
      currentPrice: 4999.99,
      previousPrice: 5299.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80',
      store: 'Magazine Luiza',
      region: 'Sudeste'
    },
    {
      id: '2',
      name: 'Notebook Dell Inspiron',
      currentPrice: 3799.99,
      previousPrice: 3599.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
      store: 'Amazon',
      region: 'Sul'
    },
    {
      id: '3',
      name: 'Smart TV LG 55"',
      currentPrice: 2899.99,
      previousPrice: 3199.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
      store: 'Casas Bahia',
      region: 'Nordeste'
    },
    {
      id: '4',
      name: 'PlayStation 5',
      currentPrice: 3799.99,
      previousPrice: 4299.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80',
      store: 'Amazon',
      region: 'Sul'
    },
    {
      id: '5',
      name: 'iPhone 15 Pro Max',
      currentPrice: 9499.99,
      previousPrice: 9299.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80',
      store: 'Fast Shop',
      region: 'Sudeste'
    },
    {
      id: '6',
      name: 'Headphone Sony WH-1000XM4',
      currentPrice: 1699.99,
      previousPrice: 1899.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80',
      store: 'Magazine Luiza',
      region: 'Centro-Oeste'
    },
    {
      id: '7',
      name: 'iPad Air 5ª Geração',
      currentPrice: 5299.99,
      previousPrice: 5499.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
      store: 'iPlace',
      region: 'Norte'
    },
    {
      id: '8',
      name: 'Monitor Gamer LG 27"',
      currentPrice: 1599.99,
      previousPrice: 1799.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
      store: 'Kabum',
      region: 'Sudeste'
    },
    {
      id: '9',
      name: 'Kindle Paperwhite',
      currentPrice: 499.99,
      previousPrice: 599.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&q=80',
      store: 'Amazon',
      region: 'Nordeste'
    },
    {
      id: '10',
      name: 'Xbox Series X',
      currentPrice: 3999.99,
      previousPrice: 4299.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&q=80',
      store: 'Americanas',
      region: 'Sul'
    },
    {
      id: '11',
      name: 'MacBook Air M2',
      currentPrice: 7999.99,
      previousPrice: 8499.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
      store: 'iPlace',
      region: 'Sudeste'
    },
    {
      id: '12',
      name: 'Câmera Sony A7 III',
      currentPrice: 12999.99,
      previousPrice: 13499.99,
      lastUpdate: new Date().toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
      store: 'Fast Shop',
      region: 'Centro-Oeste'
    }
  ]);

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Todas as regiões');
  const [store, setStore] = useState('Todas as lojas');
  const [priceRange, setPriceRange] = useState('Todas as faixas');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPriceRangeFilter = (price: number) => {
    if (priceRange === 'Até R$ 500') return price <= 500;
    if (priceRange === 'R$ 500 - R$ 1000') return price > 500 && price <= 1000;
    if (priceRange === 'R$ 1000 - R$ 3000') return price > 1000 && price <= 3000;
    if (priceRange === 'R$ 3000 - R$ 5000') return price > 3000 && price <= 5000;
    if (priceRange === 'Acima de R$ 5000') return price > 5000;
    return true;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === 'Todas as regiões' || product.region === region;
    const matchesStore = store === 'Todas as lojas' || product.store === store;
    const matchesPriceRange = getPriceRangeFilter(product.currentPrice);

    return matchesSearch && matchesRegion && matchesStore && matchesPriceRange;
  });

  const refreshPrices = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const updatedProducts = products.map(product => ({
        ...product,
        previousPrice: product.currentPrice,
        currentPrice: product.currentPrice * (1 + (Math.random() * 0.1 - 0.05)),
        lastUpdate: new Date().toISOString()
      }));
      setProducts(updatedProducts);
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshPrices, 30000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              Monitoramento de Preços
            </h1>
            <button
              onClick={refreshPrices}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Atualizar Preços
            </button>
          </div>

          <SearchFilters
            search={search}
            setSearch={setSearch}
            region={region}
            setRegion={setRegion}
            store={store}
            setStore={setStore}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <PriceCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;