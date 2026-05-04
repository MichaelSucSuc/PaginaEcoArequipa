import { Link } from "react-router";
import { MessageCircle, Leaf } from "lucide-react";

// 1. Arreglo de categorías actualizado con sus respectivos "id"
const categories = [
  { id: "snacks", name: "Snacks Saludables", icon: "🥜", color: "bg-[#A8C5A0]" },
  { id: "cosmetica", name: "Cosmética Natural", icon: "🌿", color: "bg-[#D4C5B0]" },
  { id: "hogar", name: "Hogar Reutilizable", icon: "♻️", color: "bg-[#8BA888]" },
];

const featuredProducts = [
  {
    sku: "COSM-AQ-042",
    name: "Shampoo Sólido de Romero",
    price: 25.0,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    category: "Cosmética Natural",
  },
  {
    sku: "HOG-AQ-201",
    name: "Detergente Biodegradable de Citronela",
    price: 32.0,
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop",
    category: "Limpieza Ecológica",
  },
  {
    sku: "BIEN-AQ-412",
    name: "Vela de Soja de Lavanda",
    price: 28.5,
    image: "https://rocigarcia.com/wp-content/uploads/2023/10/LAVANDA2.jpg",
    category: "Bienestar",
  },
  {
    id: 4,
    name: "Jabón Artesanal de Eucalipto",
    price: 15.0,
    image: "https://http2.mlstatic.com/D_Q_NP_607586-MLM47549078576_092021-O.webp",
    category: "Cosmética Natural",
  },
];

export function Home() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl mb-4 text-foreground">
              De la naturaleza de Arequipa a tu hogar
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Productos 100% orgánicos y ecológicos cultivados en nuestra tierra volcánica
            </p>
            <Link 
              to="/productos" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop"
            alt="Naturaleza Arequipa"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl mb-8 text-foreground">Categorías</h2>
        {/* 2. Sección de categorías actualizada con Link y state */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/productos"
              state={{ categoryId: category.id }} 
              className={`${category.color} text-foreground p-8 rounded-xl hover:scale-105 transition-transform shadow-md block text-center`}
            >
              <div className="text-5xl mb-3">{category.icon}</div>
              <h3 className="text-xl">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8 text-foreground">Productos Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.sku || product.id}
                to={product.sku ? `/producto/${product.sku}` : `/producto/${product.id}`}
                className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="mb-2 text-foreground">{product.name}</h3>
                  <p className="text-2xl text-primary">S/ {product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Footer */}
      <footer className="bg-[#2C3E2E] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="font-medium text-lg">EcoArequipa</span>
              </div>
              <p className="text-sm text-white/80">
                Productos ecológicos de Arequipa para un estilo de vida sostenible
              </p>
            </div>
            <div>
              <h4 className="mb-4">Contacto</h4>
              <p className="text-sm text-white/80">Email: hola@ecoarequipa.pe</p>
              <p className="text-sm text-white/80">WhatsApp: +51 999 999 999</p>
            </div>
            <div>
              <h4 className="mb-4">Síguenos</h4>
              <p className="text-sm text-white/80">@ecoarequipa en redes sociales</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
