import PageNotFound from '../pages/404';
import Login from '../pages/Login';
import Brands from '../pages/Brands';
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
        component: PageNotFound,
    },
];
