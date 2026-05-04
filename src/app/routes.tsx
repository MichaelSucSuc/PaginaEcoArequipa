import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { ProductDetail } from "./components/ProductDetail";
import { ProductDetailEnhanced } from "./components/ProductDetailEnhanced";
import { Checkout } from "./components/Checkout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProductList } from './components/ProductList';
// 👇 1. Importamos los nuevos componentes
import { Profile } from "./components/Profile";
import { Orders } from "./components/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "producto/:id",
        Component: ProductDetail,
      },
      {
        path: "productos",
        Component: ProductList,
      },
      {
        path: "producto/:sku", // Nota: Esto podría causar conflicto con :id si no tienes cuidado
        Component: ProductDetailEnhanced,
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register", 
        Component: Register,
      },
      // 👇 2. Agregamos las nuevas rutas del usuario
      {
        path: "perfil",
        Component: Profile,
      },
      {
        path: "pedidos",
        Component: Orders,
      },
    ],
  },
]);