import { useCart } from "../context/CartContext";
import { Link } from "react-router";
import { User, Mail, Phone, MapPin, CreditCard, ShieldCheck, Lock, Edit3 } from "lucide-react";

export function Profile() {
  const { user } = useCart();

  // Protección de ruta
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <Lock className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Inicia sesión para ver tu perfil</h2>
        <Link to="/login" className="mt-4 bg-[#829E80] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#6b856a] transition-colors">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Mi Perfil</h1>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Cabecera del perfil */}
        <div className="bg-[#829E80]/10 px-8 py-8 flex flex-col sm:flex-row items-center gap-6 border-b border-border">
          <div className="w-24 h-24 bg-[#829E80] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-foreground">{user.fullName}</h2>
            <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-1 mt-1">
              <ShieldCheck className="w-4 h-4 text-[#829E80]" /> Usuario Verificado
            </p>
          </div>
          <button className="sm:ml-auto flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            <Edit3 className="w-4 h-4" /> Editar
          </button>
        </div>

        {/* Detalles del perfil */}
        <div className="p-8">
          <h3 className="text-lg font-semibold mb-6 text-foreground border-b border-border pb-2">Información Personal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Celular</p>
                  <p className="font-medium text-foreground">{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Documento de Identidad (DNI)</p>
                  <p className="font-medium text-foreground">{user.dni}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Distrito Registrado</p>
                  <p className="font-medium text-foreground">{user.district}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}