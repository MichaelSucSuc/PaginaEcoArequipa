import { Link, useParams } from "react-router";
import { Leaf, Minus, Plus, ArrowLeft, Recycle, Clock } from "lucide-react"; // 👈 Añadí el ícono Clock
import { useState } from "react";
import { useCart } from "../context/CartContext"; 

// 1. Definimos la regla (Interface) para que TypeScript no marque errores
interface Product {
  name: string;
  inStock: boolean;
  price: number;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  images: string[];
  ecologicalImpact: {
    plastic: number;
    water: string;
    co2: string;
  };
}

// 2. Aplicamos la interfaz a productData
const productData: Record<string, Product> = {
  "COSM-AQ-042": {
    name: "Shampoo Sólido de Romero",
    inStock: true,
    price: 25.0,
    category: "Cosmética Natural",
    description: "Shampoo sólido 100% natural elaborado con romero orgánico de Arequipa. Libre de sulfatos, parabenos y plástico.",
    benefits: ["Estimula el crecimiento", "Fortalece las raíces", "Vegano"],
    ingredients: ["Aceite de coco", "Romero de Arequipa"],
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"],
    ecologicalImpact: { plastic: 2, water: "30L", co2: "0.5kg" },
  },
  "SNK-001": {
    name: "Mix de Frutos Secos Andinos",
    inStock: true,
    price: 15.00,
    category: "Snacks Saludables",
    description: "Una selección premium de frutos secos recolectados en los valles andinos.",
    benefits: ["Alto contenido en fibra", "Energía duradera"],
    ingredients: ["Almendras", "Nueces", "Pasas"],
    images: ["https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600"],
    ecologicalImpact: { plastic: 1, water: "20L", co2: "0.3kg" },
  },
  "SNK-002": {
    name: "Chips de Papas Nativas",
    inStock: true,
    price: 8.50,
    category: "Snacks Saludables",
    description: "Crujientes hojuelas de papas nativas de colores.",
    benefits: ["Libre de octógonos", "100% orgánicas"],
    ingredients: ["Papas nativas", "Sal de Mar"],
    images: ["https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600"],
    ecologicalImpact: { plastic: 1, water: "15L", co2: "0.2kg" },
  },
  "HOG-AQ-201": {
    name: "Detergente Biodegradable de Citronela",
    inStock: true,
    price: 32.0,
    category: "Limpieza Ecológica",
    description: "Detergente líquido concentrado a base de plantas.",
    benefits: ["Rinde 40 lavados", "Seguro para riego"],
    ingredients: ["Saponinas vegetales", "Citronela"],
    images: ["https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600"],
    ecologicalImpact: { plastic: 3, water: "150L", co2: "1.2kg" },
  },
  "BIEN-AQ-412": {
    name: "Vela de Soja de Lavanda",
    inStock: true,
    price: 28.5,
    category: "Bienestar",
    description: "Vela aromática de cera de soja 100% natural.",
    benefits: ["Quema limpia", "Relajante"],
    ingredients: ["Cera de soja", "Lavanda"],
    images: ["https://images.unsplash.com/photo-1602874801006-94c7c937d2d9?w=600"],
    ecologicalImpact: { plastic: 1, water: "5L", co2: "0.2kg" },
  },
  "4": {
    name: "Jabón Artesanal de Eucalipto",
    inStock: false, 
    price: 15.0,
    category: "Cosmética Natural",
    description: "Jabón corporal saponificado en frío con hojas de eucalipto.",
    benefits: ["Antibacteriano", "Refrescante"],
    ingredients: ["Aceite de oliva", "Eucalipto"],
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI6YbRVPsP0DSkSRWIA2lPxG8JXGk_NqHzgg&s"],
    ecologicalImpact: { plastic: 1, water: "10L", co2: "0.1kg" },
  },
  "5": {
    name: "Bolsa de Tela Orgánica (Tote bag)",
    inStock: true,
    price: 20.00,
    category: "Hogar Ecológico",
    description: "Bolsa de tela 100% algodón orgánico, ideal para tus compras diarias y reducir el uso de bolsas plásticas.",
    benefits: ["Reutilizable y duradera", "Soporta gran cantidad de peso", "Fácil de lavar"],
    ingredients: ["100% Algodón orgánico"],
    images: ["https://images.unsplash.com/photo-1597348989645-46b190ce4918?w=600&h=600&fit=crop"],
    ecologicalImpact: { plastic: 50, water: "0L", co2: "0.2kg" },
  },
  "6": {
    name: "Detergente Biodegradable",
    inStock: true,
    price: 32.00,
    category: "Limpieza Ecológica",
    description: "Detergente líquido en presentación de 1 Litro, formulado para limpiar tu ropa mientras protege los ríos y el medio ambiente.",
    benefits: ["Libre de fosfatos y químicos tóxicos", "Agua residual segura para riego", "Suave con tu ropa"],
    ingredients: ["Agua purificada", "Tensioactivos de origen vegetal", "Aroma natural"],
    images: ["https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=600&fit=crop"],
    ecologicalImpact: { plastic: 4, water: "100L", co2: "0.8kg" },
  }
};

export function ProductDetail() {
  const { id } = useParams();
  const product = productData[id as keyof typeof productData];
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQuantity = () => setQuantity(quantity + 1);

  const handleAddToCart = () => {
    if (product && id && product.inStock) {
      addToCart({
        id: id, 
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0]
      });
      alert("¡Producto agregado al carrito exitosamente!"); 
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4 text-foreground">Producto no encontrado</h2>
        <Link to="/" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a la tienda
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border mb-4">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary" : "border-border hover:border-accent"
                  }`}
                >
                  <img src={img} alt={product.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-4xl mb-4 text-foreground">{product.name}</h1>
            <p className="text-4xl text-primary mb-6">S/ {product.price.toFixed(2)}</p>

            <div className="mb-8">
              <h3 className="mb-3 font-medium text-foreground">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 font-medium text-foreground">Beneficios Orgánicos</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <Leaf className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 font-medium text-foreground">Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-3 py-1 bg-accent/30 text-accent-foreground rounded-full text-xs">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Action */}
            <div className="mb-8">
              <h3 className="mb-3 font-medium text-foreground">Compra</h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Selector bloqueado si no hay stock */}
                <div className={`flex items-center border border-border rounded-lg overflow-hidden ${!product.inStock && "opacity-40 pointer-events-none"}`}>
                  <button onClick={decreaseQuantity} className="p-3 hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="px-6 py-3 border-x border-border min-w-[50px] text-center font-medium">{quantity}</span>
                  <button onClick={increaseQuantity} className="p-3 hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 w-full px-8 py-3 rounded-xl font-semibold transition-all shadow-md ${
                    product.inStock 
                      ? "bg-[#829E80] text-white hover:bg-[#6b856a] active:scale-95" 
                      : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                  }`}
                >
                  {product.inStock ? "Agregar al carrito" : "Producto Agotado"}
                </button>
              </div>

              {/* 👈 NUEVO: Mensaje de reabastecimiento */}
              {!product.inStock && (
                <p className="mt-3 text-sm text-amber-600 font-medium flex items-center gap-1.5 animate-in fade-in">
                  <Clock className="w-4 h-4" />
                  Reabastecimiento en 7 días
                </p>
              )}
            </div>

            {/* Eco Impact */}
            <div className="bg-accent/20 border border-accent/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Recycle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Impacto Ecológico</h3>
              </div>
              <ul className="text-sm space-y-2 text-foreground">
                <li>🌊 Ahorro de <b>{product.ecologicalImpact.water}</b> de agua</li>
                <li>♻️ <b>{product.ecologicalImpact.plastic}</b> botellas de plástico menos</li>
                <li>🌱 Reducción de <b>{product.ecologicalImpact.co2}</b> de CO₂</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}