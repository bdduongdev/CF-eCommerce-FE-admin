import { Folder, AlertTriangle, Star, Package } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

export default function InventorySummary() {
  const { data: productsData } = useProducts({ page: 1, limit: 1 }); // Just get pagination info
  
  const totalProducts = productsData?.data?.pagination?.total || 0;
  const activeProducts = productsData?.data?.products?.filter(p => p.status === 'active').length || 0;
  const inactiveProducts = totalProducts - activeProducts;
  const activePercentage = totalProducts > 0 ? Math.round((activeProducts / totalProducts) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">All Products</h4>
          <Folder size={18} className="text-indigo-200" />
        </div>
        <h2 className="text-2xl font-bold">{totalProducts}</h2>
        <p className="text-sm mt-1 text-indigo-100">
          Active <span className="font-semibold">{activeProducts}</span> 
          <span className="text-xs"> ({activePercentage}%)</span>
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-green-600">Active Products</h4>
          <Package size={18} className="text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{activeProducts}</p>
        <p className="text-xs text-gray-500 mt-1">Currently available</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-orange-600">Inactive Products</h4>
          <AlertTriangle size={18} className="text-orange-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">{inactiveProducts}</p>
        <p className="text-xs text-gray-500 mt-1">Temporarily unavailable</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-purple-600">Categories</h4>
          <Star size={18} className="text-purple-600" />
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {productsData?.data?.products?.reduce((acc, product) => {
            if (product.category && !acc.includes(product.category._id)) {
              acc.push(product.category._id);
            }
            return acc;
          }, [] as string[]).length || 0}
        </p>
        <p className="text-xs text-gray-500 mt-1">Different categories</p>
      </div>
    </div>
  );
}
