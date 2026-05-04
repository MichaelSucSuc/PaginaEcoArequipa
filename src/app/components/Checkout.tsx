import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router";
import { CreditCard, Wallet, Truck, Lock, Trash2 } from "lucide-react";

export function Checkout() {
  // 1. Extraemos addOrder y clearCart del contexto
  const { cart, cartTotal, user, removeFromCart, addOrder, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("entrega"); 
  const [address, setAddress] = useState("");

  // Función para generar y descargar el recibo en formato .txt
  const generateReceipt = () => {
    const paymentNames = {
      yape: "Yape / Plin",
      tarjeta: "Tarjeta (Web)",
      entrega: "Pago en entrega"
    };

    let receipt = `=== RECIBO DE COMPRA - ECOAREQUIPA ===\n\n`;
    receipt += `DATOS DEL CLIENTE:\n`;
    receipt += `Nombre: ${user.fullName}\n`;
    receipt += `Email: ${user.email}\n`;
    receipt += `Teléfono: ${user.phone}\n`;
    receipt += `Dirección: ${address}, ${user.district} (Arequipa)\n\n`;

    receipt += `DETALLE DEL PEDIDO:\n`;
    cart.forEach(item => {
      receipt += `- ${item.name} (x${item.quantity}): S/ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    receipt += `\nSubtotal: S/ ${cartTotal.toFixed(2)}\n`;
    receipt += `Envío (Arequipa): S/ 5.00\n`;
    receipt += `TOTAL A PAGAR: S/ ${(cartTotal + 5).toFixed(2)}\n\n`;

    receipt += `MÉTODO DE PAGO: ${paymentNames[paymentMethod as keyof typeof paymentNames]}\n`;
    receipt += `========================================\n`;
    receipt += `¡Gracias por tu compra y por cuidar el planeta!`;

    // Crear el archivo y forzar la descarga
    const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Recibo_EcoArequipa_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      alert("Por favor, ingresa tu dirección completa para el envío.");
      return;
    }

    // 1. Descargamos el archivo
    generateReceipt();

    // 2. Creamos el objeto del pedido
    const newOrder = {
      id: `ORD-AQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "En preparación",
      total: cartTotal + 5,
      items: cart.reduce((acc, item) => acc + item.quantity, 0),
      address: address
    };

    // 3. Guardamos el pedido y vaciamos el carrito
    addOrder(newOrder);
    clearCart();

    // 4. Mostramos éxito y redirigimos a Mis Pedidos
    alert("¡Pedido confirmado con éxito! Hemos descargado tu recibo y guardado tu compra.");
    navigate("/pedidos");
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <Lock className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Inicia sesión para continuar</h2>
        <p className="text-muted-foreground mb-6">Necesitamos tus datos para gestionar el envío de tus productos ecológicos.</p>
        <Link to="/login" className="bg-[#829E80] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#6b856a] transition-colors">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Información de Envío */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Truck className="text-primary w-6 h-6" /> Información de Envío
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Nombre completo</label>
                <input type="text" disabled value={user.fullName} className="w-full p-3 bg-muted border border-border rounded-lg cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Teléfono de contacto</label>
                <input type="text" disabled value={user.phone} className="w-full p-3 bg-muted border border-border rounded-lg cursor-not-allowed" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                <input type="text" disabled value={user.email} className="w-full p-3 bg-muted border border-border rounded-lg cursor-not-allowed" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Distrito (Arequipa)</label>
                <select className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary">
                  <option>{user.district}</option>
                  <option>Arequipa (Cercado)</option>
                  <option>Cayma</option>
                  <option>Yanahuara</option>
                  <option>Cerro Colorado</option>
                  <option>Paucarpata</option>
                  <option>José Luis Bustamante y Rivero</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección completa</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, referencia" 
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary" 
                  required 
                />
              </div>
            </div>
          </section>

          {/* Métodos de Pago */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CreditCard className="text-primary w-6 h-6" /> Método de Pago
            </h2>
            
            {/* Tarjetas de selección */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <label className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${
                paymentMethod === 'yape' ? 'border-[#829E80] bg-[#e8ede7]' : 'border-border hover:bg-muted'
              }`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="yape"
                  checked={paymentMethod === 'yape'}
                  onChange={() => setPaymentMethod('yape')}
                  className="mb-3 w-4 h-4 text-[#829E80] accent-[#829E80]" 
                />
                <Wallet className={`w-8 h-8 mb-2 ${paymentMethod === 'yape' ? 'text-[#829E80]' : 'text-muted-foreground'}`} />
                <span className="font-medium text-sm text-foreground">Yape / Plin</span>
              </label>

              <label className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${
                paymentMethod === 'tarjeta' ? 'border-[#829E80] bg-[#e8ede7]' : 'border-border hover:bg-muted'
              }`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="tarjeta"
                  checked={paymentMethod === 'tarjeta'}
                  onChange={() => setPaymentMethod('tarjeta')}
                  className="mb-3 w-4 h-4 text-[#829E80] accent-[#829E80]" 
                />
                <CreditCard className={`w-8 h-8 mb-2 ${paymentMethod === 'tarjeta' ? 'text-[#829E80]' : 'text-muted-foreground'}`} />
                <span className="font-medium text-sm text-foreground">Tarjeta (Web)</span>
              </label>

              <label className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${
                paymentMethod === 'entrega' ? 'border-[#829E80] bg-[#e8ede7]' : 'border-border hover:bg-muted'
              }`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="entrega"
                  checked={paymentMethod === 'entrega'}
                  onChange={() => setPaymentMethod('entrega')}
                  className="mb-3 w-4 h-4 text-[#829E80] accent-[#829E80]" 
                />
                <Truck className={`w-8 h-8 mb-2 ${paymentMethod === 'entrega' ? 'text-[#829E80]' : 'text-muted-foreground'}`} />
                <span className="font-medium text-sm text-foreground">Pago en entrega</span>
              </label>
            </div>

            {/* ZONA DINÁMICA DE DETALLES DEL PAGO */}
            <div className="bg-muted/30 border border-border rounded-xl p-5">
              
              {/* Opción 1: YAPE / PLIN */}
              {paymentMethod === 'yape' && (
                <div className="text-center animate-in fade-in zoom-in duration-300">
                  <p className="font-medium mb-4">Escanea el QR para pagar <strong className="text-primary">S/ {(cartTotal + 5).toFixed(2)}</strong></p>
                  <div className="w-48 h-48 mx-auto bg-white border-2 border-dashed border-border rounded-xl flex items-center justify-center p-2 mb-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=PagoEcoArequipa_${cartTotal+5}`} 
                      alt="QR Code Yape" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Por favor, adjunta tu comprobante a nuestro WhatsApp luego de confirmar el pedido.</p>
                </div>
              )}

              {/* Opción 2: TARJETA */}
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-xs font-medium mb-1">Número de Tarjeta</label>
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">Vencimiento</label>
                      <input type="text" placeholder="MM/AA" maxLength={5} className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">CVV</label>
                      <input type="password" placeholder="123" maxLength={4} className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Nombre del Titular</label>
                    <input type="text" placeholder="Como aparece en la tarjeta" className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              )}

              {/* Opción 3: CONTRA ENTREGA */}
              {paymentMethod === 'entrega' && (
                <div className="text-center py-6 animate-in fade-in duration-300">
                  <Truck className="w-12 h-12 text-[#829E80] mx-auto mb-3 opacity-80" />
                  <h3 className="font-bold text-lg mb-1">Pago fácil en tu puerta</h3>
                  <p className="text-muted-foreground">Solo pagarás el total de <strong className="text-foreground">S/ {(cartTotal + 5).toFixed(2)}</strong> al momento de recibir tus productos ecológicos.</p>
                </div>
              )}
            </div>

          </section>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-foreground">Resumen del Pedido</h2>

            {/* LISTA DE PRODUCTOS */}
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-16 h-16 shrink-0 bg-muted rounded-lg overflow-hidden border border-border">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between h-16 shrink-0">
                      <span className="text-sm font-medium text-foreground">S/ {(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors" title="Eliminar producto">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* TOTALES */}
            <div className="space-y-3 border-t border-border pt-4 mb-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>S/ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#829E80] font-medium">
                <span>Envío (Arequipa)</span>
                <span>{cart.length > 0 ? "S/ 5.00" : "Por calcular"}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-xl font-bold mb-6 text-foreground">
              <span>Total</span>
              <span>S/ {cart.length > 0 ? (cartTotal + 5).toFixed(2) : "0.00"}</span>
            </div>

            <button 
              onClick={handleConfirmOrder}
              disabled={cart.length === 0}
              className="w-full bg-[#829E80] text-white py-4 rounded-xl font-bold hover:bg-[#6b856a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}