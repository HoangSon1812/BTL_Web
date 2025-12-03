import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import Hero from './components/Hero'
import { Cart } from './components/Cart'
import { AuthModal } from './components/AuthModal'
import { OrderHistory } from './components/OrderHistory'
import { WishlistModal } from './components/WishlistModal'
import { ProductDetailModal } from './components/ProductDetailModal'
import { Product, Category } from './types/product'
import { AuthProvider, useAuth } from './store/AuthContext'
import { CartProvider } from './store/CartContext'
import { OrderProvider } from './store/OrderContext'
import { WishlistProvider } from './store/WishlistContext'
import { productsMock } from './data/productsMock'

import { AdminDashboard } from './pages/AdminDashboard'
import './styles/global.css'


import { Routes, Route } from 'react-router-dom'
import { InfoPage } from './pages/InfoPage'

// ---------------------------
// WRAP UI INSIDE ROLE CHECK
// ---------------------------
const AppContent: React.FC = () => {
  const { user } = useAuth();

  // Nếu là ADMIN -> vào giao diện Admin luôn
  if (user?.role === "ADMIN") {
    return <AdminDashboard />;
  }

  return (
    <Routes>
      <Route path="/" element={<UserUI />} />
      <Route path="/page/:slug" element={<InfoPage />} />
    </Routes>
  );
};

// --------------------------
// USER UI (Shop)
// --------------------------
const UserUI: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [search, setSearch] = useState('')

  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products')

        if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`)

        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.warn('Backend lỗi → dùng mock data')
        setProducts(productsMock)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        search={search}
        onSearchChange={setSearch}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <Cart />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <OrderHistory isOpen={isOrderHistoryOpen} onClose={() => setIsOrderHistoryOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      <ProductDetailModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />

      {activeCategory === 'all' && !search && <Hero />}

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
          Đang tải sản phẩm...
        </div>
      ) : (
        <ProductList
          products={products}
          activeCategory={activeCategory}
          search={search}
          onCategoryChange={setActiveCategory}
          onProductClick={(product) => setSelectedProduct(product)}
        />
      )}

      <Footer />
    </div>
  )
}


// ------------------------------
// MAIN APP WRAPPED WITH PROVIDERS
// ------------------------------
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
