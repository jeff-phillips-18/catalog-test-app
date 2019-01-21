import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

import Modal from 'patternfly-react/dist/esm/components/Modal/Modal';
import EmptyState from 'patternfly-react/dist/esm/components/EmptyState/EmptyState';
import { Alert } from 'patternfly-react/dist/esm/components/Alert';

import CatalogView from '../../components/catalogView';
import { fetchCatalogItems, navigateRequestClear } from '../../redux/actions/catalogActions';
import { helpers } from '../../common/helpers';
import CreateInstanceProgressiveDialog from '../../components/createInstanceProgressiveDialog/createInstanceProgressiveDialog';
import CatalogItemCreateResultsDialog from '../../components/catalogItemCreateResultsDialog';

class CatalogE extends React.Component {
  componentDidMount() {
    this.refresh();
    this.props.navigateRequestClear();
  }

  componentDidUpdate(prevProps) {
    const { navigateTo, history } = this.props;
    if (navigateTo && navigateTo !== prevProps.navigateTo) {
      this.props.navigateRequestClear();
      history.push(navigateTo);
    }
  }
  refresh() {
    this.props.fetchCatalogItems();
  }

  renderPendingMessage = () => {
    const { pending } = this.props;
    if (pending) {
      return (
        <Modal bsSize="lg" backdrop={false} show animation={false}>
          <Modal.Body>
            <div className="spinner spinner-xl" />
            <div className="text-center">Loading catalog items...</div>
          </Modal.Body>
        </Modal>
      );
    }

    return null;
  };

  renderError = () => {
    const { errorMessage } = this.props;

    return (
      <EmptyState>
        <Alert type="error">
          <span>Error retrieving catalog items: {errorMessage}</span>
        </Alert>
        {this.renderPendingMessage()}
      </EmptyState>
    );
  };

  renderView = () => {
    const { error, pending, history, catalogItems, createDialogShown } = this.props;

    if (error) {
      return this.renderError();
    }

    if (pending) {
      return this.renderPendingMessage();
    }

    return (
      <React.Fragment>
        <CatalogView history={history} wizardForm catalogItems={catalogItems} />
        <CreateInstanceProgressiveDialog show={createDialogShown} />
        <CatalogItemCreateResultsDialog />
      </React.Fragment>
    );
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Catalog C</h1>
        </div>
        {this.renderView()}
      </div>
    );
  }
}

CatalogE.propTypes = {
  catalogItems: PropTypes.array,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  pending: PropTypes.bool,
  createDialogShown: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchCatalogItems: PropTypes.func,
  navigateRequestClear: PropTypes.func,
  navigateTo: PropTypes.string
};

CatalogE.defaultProps = {
  catalogItems: [],
  error: false,
  errorMessage: '',
  pending: false,
  createDialogShown: false,
  fetchCatalogItems: helpers.noop,
  navigateRequestClear: helpers.noop,
  navigateTo: null
};

const mapDispatchToProps = dispatch => ({
  fetchCatalogItems: () => dispatch(fetchCatalogItems()),
  navigateRequestClear: () => dispatch(navigateRequestClear())
});

const mapStateToProps = state => ({
  ...state.catalog.catalogItems,
  createDialogShown: state.catalog.createDialog.shown,
  navigateTo: state.catalog.navigateRequest.navigateTo
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogE);
