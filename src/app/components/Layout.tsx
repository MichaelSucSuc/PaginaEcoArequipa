import { Link, Outlet } from "react-router";
import { Search, User, ShoppingCart, Leaf, Package, LogOut } from "lucide-react";
import { useState } from "react";
// 1. Importamos el hook del carrito que ahora también maneja el usuario
import { useCart } from "../context/CartContext"; 

export function Layout() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // 2. Extraemos el conteo del carrito y los datos de sesión
  const { cartCount, user, logout } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary" />
              <span className="font-medium text-xl text-foreground">EcoArequipa</span>
            </Link>

            {/* Buscador */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar productos ecológicos..."
                  className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Acciones del Header */}
            <div className="flex items-center gap-4">
              
              {/* Menú de Usuario Dinámico */}
              <div className="relative">
                {/* Botón de usuario actualizado */}
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <User className="w-6 h-6 text-foreground" />
                  {/* Si hay usuario, mostramos su primer nombre */}
                  {user && (
                    <span className="text-sm font-medium hidden sm:inline text-foreground">
                      {user.fullName.split(' ')[0]}
                    </span>
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                    {user ? (
                      <>
                        {/* Información del Usuario Logueado */}
                        <div className="px-4 py-2 border-b border-border mb-2">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Sesión iniciada</p>
                          <p className="text-sm font-bold truncate text-foreground">{user.email}</p>
                        </div>
                        
                        <Link
                          to="/perfil"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          Mi Perfil
                        </Link>
                        
                        <Link
                          to="/pedidos"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Package className="w-4 h-4" />
                          Mis Pedidos
                        </Link>
                        
                        <hr className="my-2 border-border" />
                        
                        <button 
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }} 
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      /* Opciones para Usuario No Logueado */
                      <>
                        <Link 
                          to="/login" 
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors" 
                          onClick={() => setShowUserMenu(false)}
                        >
                          Iniciar Sesión
                        </Link>
                        <Link 
                          to="/register" 
                          className="block px-4 py-2 text-sm text-primary font-medium hover:bg-muted transition-colors" 
                          onClick={() => setShowUserMenu(false)}
                        >
                          Crear Cuenta
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Icono de Carrito Dinámico */}
              <Link to="/checkout" className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center animate-in zoom-in font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>
          </div>
        </div>
      </header>

      {/* Contenido de la Página */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}