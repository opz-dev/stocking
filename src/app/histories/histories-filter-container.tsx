'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

export function HistoriesFilterContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [productName, setProductName] = useState(searchParams.get('productName') || '');

  const handleFilter = useCallback(() => {
    const params = new URLSearchParams();
    
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (productName) params.set('productName', productName);
    
    router.push(`/histories${params.toString() ? `?${params.toString()}` : ''}`);
  }, [startDate, endDate, productName, router]);

  const handleClear = useCallback(() => {
    setStartDate('');
    setEndDate('');
    setProductName('');
    router.push('/histories');
  }, [router]);

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-semibold mb-3">フィルター</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">開始日</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">終了日</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">商品名</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="商品名で検索"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          検索
        </button>
        
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          クリア
        </button>
      </div>
    </div>
  );
}