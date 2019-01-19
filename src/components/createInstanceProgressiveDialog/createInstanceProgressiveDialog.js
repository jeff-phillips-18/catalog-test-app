/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { connect } from 'react-redux';
import { Modal, Breadcrumb, Button } from 'patternfly-react';
import { CatalogItemHeader } from 'patternfly-react-extensions';

import { createInstanceProgressiveSteps } from './createInstanceProgressiveConstants';
import {
  createCatalogInstance,
  hideCreateCatalogDialog
} from '../../redux/actions/catalogActions';
import { helpers } from '../../common/helpers';
import { getImageForIconClass } from '../../utils/catalogItemIcon';

class CreateInstanceProgressiveDialog extends React.Component {
  state = {
    activeStepIndex: 0
  };

  static getDerivedStateFromProps = props => {
    if (props.instanceCreated) {
      return { activeStepIndex: createInstanceProgressiveSteps.length - 1 };
    }
    return null;
  };

  onCancel = () => {
    this.props.hideCreateCatalogDialog();
  };

  onStep = stepIndex => {
    // ToDo: wizard step map/breadcrumb/trail click, or leave disabled
  };

  onNext = () => {
    const { activeStepIndex } = this.state;
    const numberSteps = createInstanceProgressiveSteps.length;

    if (activeStepIndex < numberSteps - 1) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  };

  onSubmit = () => {
    const { validSteps } = this.props;

    if (!_.some(validSteps, step => !step)) {
      this.props.createCatalogInstance(this.props.creatingItem);
    }
  };

  renderRemainingSteps() {
    const { activeStepIndex } = this.state;
    const progressiveSteps = createInstanceProgressiveSteps;

    return (
      <span className="catalog-create-instance-progressive-breadcrumbs">
        <Breadcrumb>
          <span>Next: </span>
          {progressiveSteps.map((step, stepIndex) => {
            if (stepIndex <= activeStepIndex) {
              return null;
            }

            return (
              <Breadcrumb.Item
                key={step.title}
                active
                className="catalog-create-instance-progressive-step-label"
              >
                {step.title}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </span>
    );
  }

  render() {
    const { creatingItem, validSteps, show } = this.props;
    const { activeStepIndex } = this.state;
    const progressiveSteps = createInstanceProgressiveSteps;

    return (
      <Modal
        show={show}
        backdrop="static"
        onHide={this.onCancel}
        className="right-side-modal-pf catalog-create-instance-dialog"
        dialogClassName="modal-lg wizard-pf"
        bsSize="lg"
      >
        {show && (
          <React.Fragment>
            <Modal.Header
              onClose={this.onCancel}
              title={`Create Instance of ${creatingItem.name}`}
            />
            <Modal.Body>
              <div className="catalog-modal__wizard-description">
                <CatalogItemHeader
                  className="catalog-modal__item-header"
                  iconImg={getImageForIconClass(creatingItem.imgUrl)}
                  title={creatingItem.name}
                  vendor={`${creatingItem.version} provided by ${
                    creatingItem.provider
                  }`}
                />
                <h3>Description</h3>
                {creatingItem.shortDescription}
              </div>
              {progressiveSteps.map((step, stepIndex) => {
                if (stepIndex > activeStepIndex) {
                  return null;
                }
                return (
                  <div key={step.title}>
                    <h3>{step.title}</h3>
                    {progressiveSteps[stepIndex].page}
                  </div>
                );
              })}
              <div>
                {activeStepIndex < progressiveSteps.length - 2 && (
                  <Button
                    bsStyle="primary"
                    disabled={!validSteps[activeStepIndex]}
                    onClick={this.onNext}
                  >
                    Continue
                  </Button>
                )}
                {activeStepIndex === progressiveSteps.length - 2 && (
                  <Button
                    bsStyle="success"
                    disabled={!validSteps[activeStepIndex]}
                    onClick={this.onSubmit}
                  >
                    Create
                  </Button>
                )}
                {activeStepIndex === progressiveSteps.length - 1 && (
                  <Button bsStyle="primary" onClick={this.onCancel}>
                    Close
                  </Button>
                )}
                {activeStepIndex < progressiveSteps.length - 2 &&
                  this.renderRemainingSteps()}
              </div>
            </Modal.Body>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

CreateInstanceProgressiveDialog.propTypes = {
  show: PropTypes.bool,
  creatingItem: PropTypes.object,
  createCatalogInstance: PropTypes.func,
  hideCreateCatalogDialog: PropTypes.func,
  validSteps: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  instanceCreated: PropTypes.bool
};

CreateInstanceProgressiveDialog.defaultProps = {
  show: false,
  creatingItem: {},
  validSteps: [],
  createCatalogInstance: helpers.noop,
  hideCreateCatalogDialog: helpers.noop,
  instanceCreated: false
};

const mapDispatchToProps = dispatch => ({
  createCatalogInstance: item => dispatch(createCatalogInstance(item)),
  hideCreateCatalogDialog: () => dispatch(hideCreateCatalogDialog())
});

const mapStateToProps = state => ({
  creatingItem: state.catalog.createDialog.creatingItem,
  validSteps: state.catalog.createDialog.validSteps,
  instanceCreated: state.catalog.catalogInstances.fulfilled
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInstanceProgressiveDialog);
