import { Link, useNavigate } from "react-router"; // Importamos useNavigate para redirigir
import { Leaf, User, CreditCard, Phone, Lock, MapPin, Mail } from "lucide-react";
import { useState } from "react";

const districts = [
  "Seleccionar distrito",
  "Arequipa (Cercado)",
  "Cayma",
  "Yanahuara",
  "Cerro Colorado",
  "Miraflores",
  "Paucarpata",
  "José Luis Bustamante y Rivero",
  "Sachaca",
  "Socabaya",
  "Alto Selva Alegre",
  "Mariano Melgar",
  "Hunter",
  "Jacobo Hunter",
  "Tiabaya",
];

export function Register() {
  const navigate = useNavigate();

  // 1. Estado para capturar los datos del formulario
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    phone: "",
    email: "",
    district: "Seleccionar distrito",
    password: "",
    confirmPassword: "",
  });

  // 2. Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Función para procesar el registro y guardar en localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (formData.district === "Seleccionar distrito") {
      alert("Por favor, selecciona un distrito");
      return;
    }

    // Guardamos el objeto en el almacenamiento local del navegador
    // Esto permitirá que el componente Login pueda verificar estos datos
    localStorage.setItem("userAccount", JSON.stringify(formData));

    alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
    
    // Redirigimos al Login automáticamente
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Leaf className="w-12 h-12 text-primary" />
            <span className="font-medium text-2xl text-foreground">EcoArequipa</span>
          </Link>
          <p className="text-muted-foreground">Únete a nuestra comunidad ecológica</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl mb-6 text-foreground text-center">Crear Cuenta</h2>

          {/* Agregamos el onSubmit al formulario */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-foreground">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Juan Pérez García"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* DNI */}
            <div>
              <label className="block mb-2 text-foreground">DNI</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="dni"
                  type="text"
                  required
                  maxLength={8}
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="12345678"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-foreground">Número de Celular</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="999 999 999"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block mb-2 text-foreground">Distrito de Residencia</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <select 
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                >
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-foreground">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-foreground">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Crear Cuenta
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}