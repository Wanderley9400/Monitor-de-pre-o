import React from 'react';
import { SearchIcon, MapPinIcon, StoreIcon, DollarSignIcon } from 'lucide-react';

interface SearchFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  store: string;
  setStore: (value: string) => void;
}

export function SearchFilters({
  search,
  setSearch,
  region,
  setRegion,
  priceRange,
  setPriceRange,
  store,
  setStore
}: SearchFiltersProps) {
  const regions = [
    'Todas as regiões',
    'Sul',
    'Sudeste',
    'Centro-Oeste',
    'Nordeste',
    'Norte'
  ];

  const stores = [
    'Todas as lojas',
    'Magazine Luiza',
    'Amazon',
    'Casas Bahia',
    'Fast Shop',
    'iPlace',
    'Kabum',
    'Americanas',
    'Submarino',
    'Ponto Frio',
    'Extra'
  ];

  const priceRanges = [
    'Todas as faixas',
    'Até R$ 500',
    'R$ 500 - R$ 1000',
    'R$ 1000 - R$ 3000',
    'R$ 3000 - R$ 5000',
    'Acima de R$ 5000'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <StoreIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {stores.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            {priceRanges.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}