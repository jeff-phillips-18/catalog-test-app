import Overview from './components/overview';
import Catalog from './components/catalog';
import Marketplace from './components/marketplace';
import Administration from './components/administration';

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
