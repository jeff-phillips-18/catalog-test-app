/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { connect } from 'react-redux';

import { CatalogItemHeader } from 'patternfly-react-extensions/dist/esm/components/CatalogItemHeader';
import { Button } from 'patternfly-react/dist/esm/components/Button';
import { Grid } from 'patternfly-react/dist/esm/components/Grid';
import { Modal } from 'patternfly-react/dist/esm/components/Modal';

import { helpers } from '../common/helpers';
import { createCatalogInstance } from '../redux/actions/catalogActions';
import { getImageForIconClass } from '../utils/catalogItemIcon';
import CreateCatalogInstanceForm from './createCatalogInstaceForm';

class CatalogItemCreateInstanceDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createItem: null,
      createItemValid: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.detailsItem, state.detailsItem)) {
      return {
        detailsItem: props.detailsItem,
        createItem: _.cloneDeep(props.detailsItem)
      };
    }

    return null;
  }

  createInstance = () => {
    this.props.createCatalogInstance(this.state.createItem);
  };

  updateCreateItem = (item, valid) => {
    this.setState({ createItem: item, createItemValid: valid });
  };

  render() {
    const { onClose } = this.props;
    const { createItem, createItemValid } = this.state;

    return (
      <Modal show className="right-side-modal-pf" bsSize="lg">
        <Modal.Header>
          <Modal.CloseButton onClick={onClose} />
          <CatalogItemHeader
            className="catalog-modal__item-header"
            iconImg={getImageForIconClass(createItem.imgUrl)}
            title={createItem.name}
            vendor={<span> {createItem.provider}</span>}
          />
        </Modal.Header>
        <Modal.Body className="catalog-modal__body">
          <Grid fluid className="catalog-create-instance-form">
            <CreateCatalogInstanceForm
              catalogItem={createItem}
              onChange={this.updateCreateItem}
              horizontal
            />
          </Grid>
          <div className="catalog-modal__item catalog-modal__description">
            {createItem.description}
          </div>
        </Modal.Body>
        <Modal.Footer className="catalog-modal__footer">
          <Button bsStyle="default" className="btn-cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.createInstance}
            disabled={!createItemValid}
          >
            Create Instance
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CatalogItemCreateInstanceDialog.propTypes = {
  detailsItem: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  createCatalogInstance: PropTypes.func
};

CatalogItemCreateInstanceDialog.defaultProps = {
  createCatalogInstance: helpers.noop
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createCatalogInstance: item => dispatch(createCatalogInstance(item))
});

const mapStateToProps = function(state) {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogItemCreateInstanceDialog);