import React, { useState } from 'react';
import ProductCard from './productCard';
import useProducts from '@/hooks/useProducts';
import { Input } from '@/components/ui/input';

const ProductsGrid = () => {
  const { data } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = data?.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div className="relative grow">
          <Input
            id="search"
            className="text-grey-600 bg-white rounded-sm focus-visible:ring-blue-500"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1.5 right-2.5"
          >
            <path
              d="M21.7275 20.4093L16.9401 15.6226C16.697 15.3795 16.3534 15.3025 16.0431 15.3844L15.0159 14.3573C16.1747 13.0448 16.8845 11.3267 16.8845 9.44218C16.8845 5.33871 13.5462 2 9.44261 2C5.33847 2 1.99976 5.33871 1.99976 9.44285C1.99976 13.5467 5.33847 16.885 9.44261 16.885C11.3268 16.885 13.0449 16.1755 14.3577 15.0164L15.3848 16.0436C15.3029 16.354 15.3796 16.6972 15.6231 16.9406L20.4097 21.727C20.5921 21.9093 20.83 22 21.0686 22C21.3072 22 21.5454 21.909 21.7274 21.727C22.0911 21.3633 22.0911 20.7733 21.7274 20.4093L21.7275 20.4093ZM2.93168 9.44254C2.93168 5.85288 5.85211 2.93187 9.44236 2.93187C13.0326 2.93187 15.9527 5.85288 15.9527 9.44287C15.9527 13.0325 13.0319 15.9532 9.44236 15.9532C5.85277 15.9532 2.93168 13.0325 2.93168 9.44254Z"
              fill="#5D6679"
            />
          </svg>
        </div>
        <div className="grid place-items-center grid-cols-3 gap-4 mt-10">
          {filteredProducts &&
            filteredProducts.map((item) => (
              <ProductCard key={item.name} data={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductsGrid;
