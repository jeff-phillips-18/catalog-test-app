import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'patternfly-react';

import { CatalogItemHeader } from 'patternfly-react-extensions/dist/esm/components/CatalogItemHeader';
import { Button } from 'patternfly-react/dist/esm/components/Button';
import { Modal } from 'patternfly-react/dist/esm/components/Modal';

import { helpers } from '../common/helpers';
import { hideCreateResultsDialog, navigateRequest } from '../redux/actions/catalogActions';
import { getImageForIconClass } from '../utils/catalogItemIcon';

class CatalogItemCreateResultsDialog extends React.Component {
  navToItem = e => {
    e.preventDefault();
    this.props.hideCreateResultsDialog();
    this.props.navigateRequest('/');
  };

  render() {
    const { createdItem, show } = this.props;

    const navButton = (
      <a href="/" onClick={e => this.navToItem(e)}>
        {' '}
        here{' '}
      </a>
    );

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeDialog}
        className="right-side-modal-pf catalog-create-instance-dialog"
        bsSize="lg"
      >
        {show && (
          <React.Fragment>
            <Modal.Header>
              <button
                className="close"
                onClick={this.props.hideCreateResultsDialog}
                aria-hidden="true"
                aria-label="Close"
              >
                <Icon type="pf" name="close" />
              </button>
              <Modal.Title>{`${createdItem.name} Created`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="catalog-modal__wizard-description">
                <CatalogItemHeader
                  className="catalog-modal__item-header"
                  iconImg={getImageForIconClass(createdItem.imgUrl)}
                  title={createdItem.name}
                  vendor={`${createdItem.version} provided by ${createdItem.provider}`}
                />
              </div>
              <p>
                <Icon type="pf" name="ok" /> Instance {createdItem.instanceName} was created successfully. Click
                {navButton}
                to view it now.
              </p>
            </Modal.Body>
            <Modal.Footer className="catalog-modal__footer">
              <Button bsStyle="primary" className="btn-cancel" onClick={this.props.hideCreateResultsDialog}>
                Close
              </Button>
            </Modal.Footer>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

CatalogItemCreateResultsDialog.propTypes = {
  createdItem: PropTypes.object,
  show: PropTypes.bool,
  hideCreateResultsDialog: PropTypes.func,
  navigateRequest: PropTypes.func
};

CatalogItemCreateResultsDialog.defaultProps = {
  createdItem: {},
  show: false,
  hideCreateResultsDialog: helpers.noop,
  navigateRequest: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  hideCreateResultsDialog: item => dispatch(hideCreateResultsDialog(item)),
  navigateRequest: href => dispatch(navigateRequest(href))
});

const mapStateToProps = state => ({
  createdItem: state.catalog.createResultsDialog.createdItem,
  show: state.catalog.createResultsDialog.shown
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogItemCreateResultsDialog);
