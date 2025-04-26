import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import Rice from './pages/ProductsPage/Rice';
import Spices from './pages/ProductsPage/Spices';
import Snacks from './pages/ProductsPage/Snacks';
import Flour from './pages/ProductsPage/Flour';
import PoojaProducts from './pages/ProductsPage/PoojaProducts';
import Flower from './pages/ProductsPage/Flower';
import Leaf from './pages/ProductsPage/Leaf';
import Vegetables from './pages/ProductsPage/Vegetables';
import Oil from './pages/ProductsPage/Oil';
import Pickle from './pages/ProductsPage/Pickle';
import PaanBeeda from './pages/ProductsPage/PaanBeeda';
import Masala from './pages/ProductsPage/Masala';
import FlowerGarlands from './pages/Flowers/flowerGarlands';
import FlowerHead from './pages/Flowers/flowerHead';
import FlowerPetals from './pages/Flowers/flowerPetals';
import FlowerString from './pages/Flowers/flowerString';
import AgriculturalAndNatual from './pages/PoojaProducts/agriculturalAndNatural';
import BrassPoojaProducts from './pages/PoojaProducts/brassPoojaProducts';
import MedicinalAndHerbal from './pages/PoojaProducts/medicinalAndHerbal';
import SpecialPoojaKit from './pages/PoojaProducts/specialPoojaKit';
import SpiritualAndReligious from './pages/PoojaProducts/spiritualAndReligious';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products/rice', element: <Rice /> },
        { path: 'products/spices', element: <Spices /> },
        { path: 'products/snacks', element: <Snacks /> },
        { path: 'products/flour', element: <Flour /> },
        { path: 'products/pooja-products', element: <PoojaProducts /> },
        { path: 'products/flower', element: <Flower /> },
        { path: 'products/leaf', element: <Leaf /> },
        { path: 'products/vegetables', element: <Vegetables /> },
        { path: 'products/oil', element: <Oil /> },
        { path: 'products/pickle', element: <Pickle /> },
        { path: 'products/paan-beeda', element: <PaanBeeda /> },
        { path: 'products/masala', element: <Masala /> },
        { path: 'flowers/flower-garlands', element: <FlowerGarlands /> },
        { path: 'flowers/flower-heads', element: <FlowerHead /> },
        { path: 'flowers/flower-petals', element: <FlowerPetals /> },
        { path: 'flowers/flower-strings', element: <FlowerString /> },
        { path: 'pooja-products/agriculture-and-natural', element: <AgriculturalAndNatual />},
        { path: 'pooja-products/brass-pooja-products', element: <BrassPoojaProducts />},
        { path: 'pooja-products/medicinal-and-herbal', element: <MedicinalAndHerbal />},
        { path: 'pooja-products/special-pooja-kit', element: <SpecialPoojaKit />},
        { path: 'pooja-products/spiritual-and-religious', element: <SpiritualAndReligious />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
