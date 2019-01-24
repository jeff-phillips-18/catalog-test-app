/* eslint-disable react/no-did-update-set-state,react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { connect } from 'react-redux';
import { Modal, Breadcrumb, Button, Icon } from 'patternfly-react';
import { CatalogItemHeader } from 'patternfly-react-extensions';

import { createInstanceProgressiveSteps } from './createInstanceProgressiveConstants';
import {
  createCatalogInstance,
  hideCreateCatalogDialog,
  showCreateResultsDialog
} from '../../redux/actions/catalogActions';
import { helpers } from '../../common/helpers';
import { getImageForIconClass } from '../../utils/catalogItemIcon';

class CreateInstanceProgressiveDialog extends React.Component {
  state = {
    activeStepIndex: 0
  };

  componentDidUpdate(prevProps) {
    const { instanceCreated, creatingItem } = this.props;

    if (this.props.show && !prevProps.show) {
      this.setState({ activeStepIndex: 0 });
    }

    if (instanceCreated && !prevProps.instanceCreated) {
      this.props.hideCreateCatalogDialog();
      this.props.showCreateResultsDialog(creatingItem);
    }

    if (this.buttonRef && this.movedForward) {
      const node = ReactDOM.findDOMNode(this.buttonRef);
      if (node) {
        this.movedForward = false;
        node.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }
  }

  onCancel = () => {
    this.props.hideCreateCatalogDialog();
  };

  onNext = () => {
    const { activeStepIndex } = this.state;
    const numberSteps = createInstanceProgressiveSteps.length;

    if (activeStepIndex < numberSteps - 1) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
      this.movedForward = true;
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

    return (
      <span className="catalog-create-instance-progressive-breadcrumbs">
        <Breadcrumb>
          <span>Next: </span>
          {createInstanceProgressiveSteps.map((step, stepIndex) => {
            if (stepIndex <= activeStepIndex) {
              return null;
            }

            return (
              <Breadcrumb.Item key={step.title} active className="catalog-create-instance-progressive-step-label">
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
            <Modal.Header>
              <button className="close" onClick={this.onCancel} aria-hidden="true" aria-label="Close">
                <Icon type="pf" name="close" />
              </button>
              <Modal.Title>{`Create Instance of ${creatingItem.name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="catalog-modal__wizard-description">
                <CatalogItemHeader
                  className="catalog-modal__item-header"
                  iconImg={getImageForIconClass(creatingItem.imgUrl)}
                  title={creatingItem.name}
                  vendor={`${creatingItem.version} provided by ${creatingItem.provider}`}
                />
                <h2>Description</h2>
                {creatingItem.shortDescription}
              </div>
              {progressiveSteps.map((step, stepIndex) => {
                if (stepIndex > activeStepIndex) {
                  return null;
                }
                return (
                  <div className="catalog-create-instance-step" key={step.title}>
                    <h2>{step.title}</h2>
                    {progressiveSteps[stepIndex].page}
                  </div>
                );
              })}
              <div
                ref={ref => {
                  this.buttonRef = ref;
                }}
              >
                {activeStepIndex < progressiveSteps.length - 1 && (
                  <Button bsStyle="primary" disabled={!validSteps[activeStepIndex]} onClick={this.onNext}>
                    Continue
                  </Button>
                )}
                {activeStepIndex === progressiveSteps.length - 1 && (
                  <Button
                    className="create-button"
                    bsStyle="success"
                    disabled={!validSteps[activeStepIndex]}
                    onClick={this.onSubmit}
                  >
                    Create
                  </Button>
                )}
                {activeStepIndex < progressiveSteps.length - 1 && this.renderRemainingSteps()}
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
  showCreateResultsDialog: PropTypes.func,
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
  showCreateResultsDialog: helpers.noop,
  instanceCreated: false
};

const mapDispatchToProps = dispatch => ({
  createCatalogInstance: item => dispatch(createCatalogInstance(item)),
  hideCreateCatalogDialog: () => dispatch(hideCreateCatalogDialog()),
  showCreateResultsDialog: item => dispatch(showCreateResultsDialog(item))
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
