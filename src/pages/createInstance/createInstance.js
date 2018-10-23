import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from 'lodash-es';

import CatalogItemHeader from 'patternfly-react-extensions/dist/esm/components/CatalogItemHeader/CatalogItemHeader';
import { Grid } from 'patternfly-react/dist/esm/components/Grid';
import { Button } from 'patternfly-react/dist/esm/components/Button';
import Modal from 'patternfly-react/dist/esm/components/Modal/Modal';

import { getImageForIconClass } from '../../utils/catalogItemIcon';
import {
  createCatalogInstance,
  hideCreateCatalogInstance
} from '../../redux/actions/catalogActions';
import CreateCatalogInstanceForm from '../../components/createCatalogInstaceForm';

class CreateInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createItem: _.cloneDeep(props.creatingItem),
      createItemValid: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { instanceCreated } = this.props;

    if (instanceCreated && !prevProps.instanceCreated) {
      this.props.history.push('/');
      this.props.hideCreateCatalogInstance();
    }

    return null;
  }

  createInstance = () => {
    this.props.createCatalogInstance(this.state.createItem);
  };

  updateCreateItem = (item, valid) => {
    this.setState({ createItem: item, createItemValid: valid });
  };

  onCancel = () => {
    this.props.hideCreateCatalogInstance();
  };

  render() {
    const { createItem, createItemValid } = this.state;

    return (
      <Grid.Row className="catalog-create-instance">
        <Modal.Header>
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
              horizontal={false}
            />
          </Grid>
          <div className="catalog-modal__item catalog-modal__description">
            {createItem.description}
          </div>
        </Modal.Body>
        <Modal.Footer className="catalog-modal__footer">
          <Button
            bsStyle="default"
            className="btn-cancel"
            onClick={this.onCancel}
          >
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
        {this.props.creatingInstance && (
          <Modal show bsSize="sm">
            <Modal.Body>Creating...</Modal.Body>
          </Modal>
        )}
      </Grid.Row>
    );
  }
}

CreateInstance.propTypes = {
  creatingItem: PropTypes.object.isRequired,
  creatingInstance: PropTypes.bool,
  instanceCreated: PropTypes.bool,
  createCatalogInstance: PropTypes.func,
  hideCreateCatalogInstance: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

CreateInstance.defaultProps = {
  creatingInstance: false,
  instanceCreated: false,
  createCatalogInstance: null,
  hideCreateCatalogInstance: null
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  createCatalogInstance: item => dispatch(createCatalogInstance(item)),
  hideCreateCatalogInstance: () => dispatch(hideCreateCatalogInstance())
});

const mapStateToProps = function(state) {
  return Object.assign(
    {},
    {
      createItem: state.catalog.creatingItem,
      creatingInstance: state.catalog.catalogInstances.pending,
      instanceCreated: state.catalog.catalogInstances.fulfilled
    }
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInstance);
