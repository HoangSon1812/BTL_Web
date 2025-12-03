import React, { useMemo } from 'react'
import { Product, Category } from '../types/product'
import ProductCard from './ProductCard'

type TabValue = Category | 'all'

interface ProductListProps {
  products: Product[]
  activeCategory: TabValue
  search: string
  onCategoryChange: (category: TabValue) => void
  onProductClick: (product: Product) => void
}

const tabs: { label: string; value: TabValue }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đồ gia dụng', value: 'dogiadung' },
  { label: 'Điện tử', value: 'dientu' },
  { label: 'Thực phẩm', value: 'thucpham' },
  { label: 'Đồ uống', value: 'douong' }
]

const ProductList: React.FC<ProductListProps> = ({
  products,
  activeCategory,
  search,
  onCategoryChange,
  onProductClick
}) => {
  const filtered = useMemo(() => {
    let list = products

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory)
    }

    if (search.trim()) {
      const kw = search.toLowerCase()
      list = list.filter(p => {
        const name =
          p.tenMatHang ||
          p.ten_mat_hang ||
          ''
        return name.toLowerCase().includes(kw)
      })
    }

    return list
  }, [products, activeCategory, search])

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  // Reset page when category or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="flex-1 w-full">
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-2 sm:gap-3 py-3">
            {tabs.map(tabItem => {
              const active = tabItem.value === activeCategory
              return (
                <button
                  key={tabItem.value}
                  onClick={() => onCategoryChange(tabItem.value)}
                  className={
                    'flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap border transition ' +
                    (active
                      ? 'bg-red-600 border-red-600 text-white shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-300')
                  }
                >
                  <span>{tabItem.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <section id="product-list" className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Sản phẩm
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-10">
            Không tìm thấy sản phẩm phù hợp.
          </div>
        ) : (
          <>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {paginatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => onProductClick(p)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default ProductList
