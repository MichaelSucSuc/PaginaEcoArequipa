import { useCart } from "../context/CartContext";
import { Link } from "react-router";
import { Package, Calendar, MapPin, Lock, ChevronRight, CheckCircle2, Clock } from "lucide-react";

export function Orders() {
  // 👇 Extraemos "orders" dinámicamente del contexto
  const { user, orders } = useCart();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <Lock className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tus pedidos</h2>
        <Link to="/login" className="mt-4 bg-[#829E80] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#6b856a] transition-colors">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#829E80]/10 rounded-xl">
          <Package className="w-6 h-6 text-[#829E80]" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Mis Pedidos</h1>
      </div>

      <div className="space-y-4">
        {/* 👇 Verificamos si la lista REAL de pedidos está vacía */}
        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium text-foreground">Aún no tienes pedidos</p>
            <p className="text-muted-foreground mb-6">Explora nuestra tienda y descubre productos ecológicos.</p>
            <Link to="/" className="text-[#829E80] font-medium hover:underline">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          // 👇 Iteramos sobre la lista de pedidos en el Contexto
          orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    Pedido {order.id}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 capitalize">
                    <Calendar className="w-4 h-4" /> {order.date}
                  </p>
                </div>
                
                <div className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${
                  order.status === 'Entregado' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                }`}>
                  {order.status === 'Entregado' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  {order.status}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mt-4">
                <div className="space-y-2">
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    {order.items} {order.items === 1 ? 'producto' : 'productos'}
                  </p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {order.address}, {user.district}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted-foreground">Total pagado</p>
                    <p className="font-bold text-lg text-foreground">S/ {order.total.toFixed(2)}</p>
                  </div>
                  <button className="flex items-center justify-center p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}