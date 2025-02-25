import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, StoreIcon, MapPinIcon } from 'lucide-react';
import { Product } from '../types';

interface PriceCardProps {
  product: Product;
}

export function PriceCard({ product }: PriceCardProps) {
  const priceDifference = product.currentPrice - product.previousPrice;
  const percentageChange = ((priceDifference / product.previousPrice) * 100).toFixed(2);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <StoreIcon size={16} />
              <span>{product.store}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon size={16} />
              <span>{product.region}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            R$ {product.currentPrice.toFixed(2)}
          </span>
          <div className={`flex items-center gap-1 ${priceDifference < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceDifference < 0 ? (
              <ArrowDownIcon size={16} />
            ) : (
              <ArrowUpIcon size={16} />
            )}
            <span className="text-sm font-medium">{Math.abs(Number(percentageChange))}%</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mt-1">
          Preço anterior: R$ {product.previousPrice.toFixed(2)}
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          Última atualização: {new Date(product.lastUpdate).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
}