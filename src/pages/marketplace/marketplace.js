import * as React from 'react';
import PropTypes from 'prop-types';

import CatalogView from '../../components/catalogView';

const Marketplace = ({ history }) => (
  <div>
    <div className="page-header">
      <h1>Marketplace</h1>
    </div>
    <CatalogView history={history} />
  </div>
);

Marketplace.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Marketplace;
