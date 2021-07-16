import PageNotFound from '../pages/404';
import Login from '../pages/Login';
import Brands from '../pages/Brands';
import Autos from '../pages/Autos';
import EditAuto from '../pages/AutosEdit'
import BrandsAuto from '../pages/BrandsEdit'
import Summary from '../pages/Summary';
import { RouteTypes } from '../types/routes';

export const routes: RouteTypes[] = [
    {
        exact: true,
        path: "/",
        component: Login,
    },
    {
        exact: true,
        path: "/marcas",
        isPrivate: true,
        component: Brands,
    },
    {
        exact: true,
        path: "/veiculos",
        isPrivate: true,
        component: Autos,
    },
    {
        exact: true,
        path: `/editar-veiculo/:id`,
        isPrivate: true,
        component: EditAuto,
    },
    {
        exact: true,
        path: `/editar-marca/:id`,
        isPrivate: true,
        component: BrandsAuto,
    },
    {
        exact: true,
        path: "/dashboard",
        isPrivate: true,
        component: Summary,
    },
    {
        component: PageNotFound,
    },
];
