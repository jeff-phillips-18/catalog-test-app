import Overview from './pages/overview/overview';
import Catalog from './pages/catalog/catalog';
import Marketplace from './pages/marketplace/marketplace';
import Administration from './pages/administration/administration';

const baseName = '/';

const routes = () => [
  {
    iconClass: 'fa fa-dashboard',
    title: 'Overview',
    to: '/',
    component: Overview
  },
  {
    iconClass: 'fa fa-star',
    title: 'Catalog',
    to: '/catalog',
    component: Catalog
  },
  {
    iconClass: 'fa fa-bell',
    title: 'Marketplace',
    to: '/marketplace',
    component: Marketplace
  },
  {
    iconClass: 'fa fa-cog',
    title: 'Administration',
    to: '/admin',
    component: Administration
  }
];

export { baseName, routes };
