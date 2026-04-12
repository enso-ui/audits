import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter.fromGlob(import.meta.glob('./audit/*.js', { eager: true }));
const Router = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'audit',
    component: Router,
    meta: {
        breadcrumb: 'audit',
        route: 'system.audit.index',
        keepAlive: false,
    },
    children: routes,
};
