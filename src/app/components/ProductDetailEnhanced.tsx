import { Link, useParams } from "react-router";
import { MessageCircle, Leaf, Minus, Plus, ArrowLeft, Recycle, Award, ShoppingBag, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const productsDatabase = {
  "COSM-AQ-042": {
    sku: "COSM-AQ-042",
    name: "Shampoo Sólido de Romero",
    price: 25.0,
    category: "Cosmética Natural",
    description: "Shampoo sólido 100% natural elaborado con romero orgánico de Arequipa. Libre de sulfatos, parabenos y plástico. Perfecto para todo tipo de cabello.",
    technicalDetails: {
      weight: "75g",
      origin: "Valle del Colca, Arequipa",
      skinType: "Todo tipo de cabello",
      certification: "Cruelty-free certificado",
    },
    ingredients: ["Aceite de coco orgánico", "Romero fresco de Arequipa", "Arcilla verde", "Aceite esencial de romero", "Manteca de karité"],
    benefits: [
      "Estimula el crecimiento del cabello",
      "Fortalece las raíces",
      "Sin químicos agresivos",
      "Libre de crueldad animal",
      "Vegano y biodegradable",
    ],
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600857062241-98e5e6b9e136?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=800&fit=crop",
    ],
    ecoBadges: ["100% Orgánico", "Zero Waste", "Producto Local"],
    ecologicalImpact: {
      plastic: "2 botellas",
      water: "30L",
      co2: "0.5kg",
    },
  },
  "HOG-AQ-201": {
    sku: "HOG-AQ-201",
    name: "Detergente Biodegradable de Citronela",
    price: 32.0,
    category: "Limpieza Ecológica",
    description: "Detergente líquido biodegradable con aroma natural de citronela. Envase retornable de vidrio. Formulado para ser efectivo y respetuoso con el medio ambiente.",
    technicalDetails: {
      weight: "500ml",
      origin: "Majes, Arequipa",
      container: "Envase de vidrio retornable",
      certification: "Biodegradable 100%",
    },
    ingredients: ["Aceite de citronela", "Bicarbonato de sodio", "Aceite de coco saponificado", "Extracto de limón", "Agua purificada"],
    benefits: [
      "Limpieza profunda sin químicos tóxicos",
      "Aroma natural repelente de insectos",
      "Envase reutilizable",
      "No contamina el agua",
      "Concentrado de alto rendimiento",
    ],
    images: [
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=800&h=800&fit=crop",
    ],
    ecoBadges: ["Zero Waste", "Producto Local", "Biodegradable"],
    ecologicalImpact: {
      plastic: "3 botellas",
      water: "50L",
      co2: "0.8kg",
    },
  },
  "BIEN-AQ-412": {
    sku: "BIEN-AQ-412",
    name: "Vela de Soja de Lavanda",
    price: 28.5,
    category: "Bienestar",
    description: "Vela artesanal de cera de soja pura con aceite esencial de lavanda. Elaborada a mano en Arequipa. Promueve la relajación y purifica el ambiente.",
    technicalDetails: {
      weight: "180g",
      origin: "Arequipa (Cercado)",
      burnTime: "35-40 horas",
      certification: "Cera 100% vegetal",
    },
    ingredients: ["Cera de soja orgánica", "Aceite esencial de lavanda", "Mecha de algodón trenzado", "Envase de vidrio reciclado"],
    benefits: [
      "Aroma relajante natural",
      "Sin parafina ni tóxicos",
      "Combustión limpia",
      "Larga duración",
      "Envase reutilizable",
    ],
    images: [
      "https://images.unsplash.com/photo-1602874801006-94c7c937d2d9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop",
    ],
    ecoBadges: ["100% Orgánico", "Producto Local", "Zero Waste"],
    ecologicalImpact: {
      plastic: "1 envase",
      water: "10L",
      co2: "0.3kg",
    },
  },
};

const relatedProducts = [
  {
    sku: "KIT-AQ-001",
    name: "Kit de Regalo Cuidado Personal",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    tag: "Kit",
  },
  {
    sku: "COSM-AQ-043",
    name: "Acondicionador Sólido de Menta",
    price: 25.0,
    image: "https://images.unsplash.com/photo-1582693250829-4838f96b2d3e?w=400&h=400&fit=crop",
  },
  {
    sku: "COSM-AQ-015",
    name: "Jabón de Eucalipto",
    price: 15.0,
    image: "https://images.unsplash.com/photo-1600857062241-98e5e6b9e136?w=400&h=400&fit=crop",
  },
  {
    sku: "BIEN-AQ-413",
    name: "Vela de Soja de Romero",
    price: 28.5,
    image: "https://images.unsplash.com/photo-1602874801006-94c7c937d2d9?w=400&h=400&fit=crop",
  },
];

export function ProductDetailEnhanced() {
  const { sku } = useParams();
  const product = productsDatabase[sku as keyof typeof productsDatabase] || productsDatabase["COSM-AQ-042"];
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQuantity = () => setQuantity(quantity + 1);

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery with Carousel */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-card border border-border mb-4 group">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />

              {/* Zoom Button */}
              <button
                onClick={() => setShowZoom(true)}
                className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="w-5 h-5 text-foreground" />
              </button>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-border hover:border-accent"
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Eco Badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.ecoBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <Award className="w-4 h-4" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-4xl mb-2 text-foreground">{product.name}</h1>
            <p className="text-sm text-muted-foreground mb-4">SKU: {product.sku}</p>
            <p className="text-4xl text-primary mb-6">S/ {product.price.toFixed(2)}</p>

            <div className="mb-8">
              <h3 className="mb-3 text-foreground">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Technical Details Table */}
            <div className="mb-8 bg-muted/30 rounded-xl p-6">
              <h3 className="mb-4 text-foreground">Ficha Técnica</h3>
              <div className="space-y-3">
                {Object.entries(product.technicalDetails).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                    <span className="text-muted-foreground capitalize">
                      {key === "weight"
                        ? "Peso/Volumen"
                        : key === "origin"
                        ? "Origen"
                        : key === "skinType"
                        ? "Tipo de piel"
                        : key === "certification"
                        ? "Certificación"
                        : key === "container"
                        ? "Envase"
                        : key === "burnTime"
                        ? "Duración"
                        : key}
                    </span>
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="mb-3 text-foreground">Ingredientes / Materiales</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span key={idx} className="px-3 py-1 bg-accent/30 text-accent-foreground rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="mb-3 text-foreground">Beneficios</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="mb-8 p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={decreaseQuantity} className="p-3 hover:bg-muted transition-colors">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 border-x border-border min-w-[60px] text-center">{quantity}</span>
                  <button onClick={increaseQuantity} className="p-3 hover:bg-muted transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <Link
                  to="/checkout"
                  className="flex-1 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Añadir al Carrito
                </Link>
              </div>
              <p className="text-xs text-muted-foreground text-center">Envío gratis en compras mayores a S/ 50 en Arequipa</p>
            </div>

            {/* Ecological Impact */}
            <div className="bg-accent/20 border border-accent rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="w-6 h-6 text-primary" />
                <h3 className="text-foreground">Impacto Ecológico de tu Compra</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Plástico ahorrado</span>
                  <span className="text-foreground">{product.ecologicalImpact.plastic}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-card rounded-lg">
                    <p className="text-2xl text-primary mb-1">💧 {product.ecologicalImpact.water}</p>
                    <p className="text-xs text-muted-foreground">Agua ahorrada</p>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg">
                    <p className="text-2xl text-primary mb-1">🌱 {product.ecologicalImpact.co2}</p>
                    <p className="text-xs text-muted-foreground">CO₂ reducido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-16 border-t border-border pt-16">
          <h2 className="text-3xl mb-8 text-foreground">Productos Relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.sku}
                to={`/producto/${relatedProduct.sku}`}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group relative"
              >
                {relatedProduct.tag && (
                  <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs z-10">
                    {relatedProduct.tag}
                  </span>
                )}
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-foreground text-sm">{relatedProduct.name}</h3>
                  <p className="text-xl text-primary">S/ {relatedProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/51999999999?text=Hola, tengo una consulta sobre el producto ${product.name} (${product.sku})`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform z-50 flex items-center gap-3"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline pr-2">Consultar stock</span>
      </a>

      {/* Footer */}
      <footer className="bg-[#2C3E2E] text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="font-medium text-lg">EcoArequipa</span>
              </div>
              <p className="text-sm text-white/80">Productos ecológicos de Arequipa para un estilo de vida sostenible</p>
            </div>
            <div>
              <h4 className="mb-4">Métodos de Pago</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#722C8F] rounded flex items-center justify-center text-sm">💜</div>
                  <span className="text-sm text-white/80">Yape / Plin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-sm">🏦</div>
                  <span className="text-sm text-white/80">Transferencia bancaria</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-sm">💳</div>
                  <span className="text-sm text-white/80">Tarjetas Visa/Mastercard</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Política de Envíos</h4>
              <p className="text-sm text-white/80 mb-2">Entregas en toda la ciudad de Arequipa</p>
              <ul className="text-xs text-white/70 space-y-1">
                <li>• Cayma, Yanahuara, Cercado: 24-48h</li>
                <li>• Otros distritos: 2-3 días</li>
                <li>• Envío gratis en compras &gt; S/50</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center text-sm text-white/60">
            <p>© 2026 EcoArequipa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setShowZoom(false)}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
