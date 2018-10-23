import * as React from 'react';
import PropTypes from 'prop-types';

import CatalogView from '../../components/catalogView';

const Catalog = ({ history }) => (
  <div>
    <div className="page-header">
      <h1>Catalog</h1>
    </div>
    <CatalogView history={history} dialogForm={false} />
  </div>
);

Catalog.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Catalog;
