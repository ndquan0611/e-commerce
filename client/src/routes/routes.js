import config from '~/config';

import Home from '~/pages/Home';

const publicRoutes = [
    {
        id: 1,
        path: config.routes.home,
        component: Home,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
