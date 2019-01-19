import Overview from './pages/overview/overview';
import CatalogA from './pages/catalogA/catalogA';
import CatalogB from './pages/catalogB/catalogB';
import CatalogC from './pages/catalogC/catalogC';
import CatalogD from './pages/catalogD/catalogD';
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
    title: 'Catalog A',
    to: '/catalog',
    component: CatalogA
  },
  {
    iconClass: 'fa fa-bell',
    title: 'Catalog B',
    to: '/catalog-b',
    component: CatalogB
  },
  {
    iconClass: 'fa fa-bell',
    title: 'Catalog C',
    to: '/catalog-c',
    component: CatalogC
  },
  {
    iconClass: 'fa fa-bell',
    title: 'Catalog D',
    to: '/catalog-d',
    component: CatalogD
  },
  {
    iconClass: 'fa fa-cog',
    title: 'Administration',
    to: '/admin',
    component: Administration
  }
];

export { baseName, routes };
