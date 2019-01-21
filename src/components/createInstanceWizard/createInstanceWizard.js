/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { connect } from 'react-redux';
import { Modal, Button, Icon, Wizard } from 'patternfly-react';

import { createInstanceWizardSteps } from './createInstanceWizardConstants';
import {
  createCatalogInstance,
  hideCreateCatalogDialog,
  showCreateResultsDialog
} from '../../redux/actions/catalogActions';
import { helpers } from '../../common/helpers';

class CreateInstanceWizard extends React.Component {
  state = {
    activeStepIndex: 0
  };

  static getDerivedStateFromProps = props => {
    if (props.instanceCreated) {
      return { activeStepIndex: createInstanceWizardSteps.length - 1 };
    }
    return null;
  };

  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show) {
      this.setState({ activeStepIndex: 0 });
    }

    if (this.props.instanceCreated && !prevProps.instanceCreated) {
      this.props.hideCreateCatalogDialog();
      this.props.showCreateResultsDialog(this.props.creatingItem);
    }
  }

  onCancel = () => {
    this.props.hideCreateCatalogDialog();
  };

  onStep = stepIndex => {
    // ToDo: wizard step map/breadcrumb/trail click, or leave disabled
  };

  onNext = () => {
    const { activeStepIndex } = this.state;
    const numberSteps = createInstanceWizardSteps.length;

    if (activeStepIndex < numberSteps - 1) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  };

  onBack = () => {
    const { activeStepIndex } = this.state;

    if (activeStepIndex >= 1) {
      this.setState({ activeStepIndex: activeStepIndex - 1 });
    }
  };

  onSubmit = () => {
    const { validSteps } = this.props;

    if (!_.some(validSteps, step => !step)) {
      this.props.createCatalogInstance(this.props.creatingItem);
    }
  };

  renderWizardSteps() {
    const { activeStepIndex } = this.state;
    const wizardSteps = createInstanceWizardSteps;
    const activeStep = wizardSteps[activeStepIndex];

    return wizardSteps.map((step, stepIndex) => (
      <Wizard.Step
        key={stepIndex}
        stepIndex={stepIndex}
        step={step.step}
        label={step.label}
        title={step.title}
        activeStep={activeStep && activeStep.step}
        onClick={e => this.onStep(activeStep && activeStep.step)}
      />
    ));
  }

  render() {
    const { creatingItem, validSteps, show } = this.props;
    const { activeStepIndex } = this.state;
    const wizardSteps = createInstanceWizardSteps;

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
            <Wizard.Header onClose={this.onCancel} title={`Create Instance of ${creatingItem.name}`} />
            <Wizard.Body className="wizard-pf-body clearfix">
              <Wizard.Steps steps={this.renderWizardSteps()} />
              <Wizard.Row>
                <Wizard.Main>
                  {wizardSteps.map((step, stepIndex) => (
                    <Wizard.Contents key={step.title} stepIndex={stepIndex} activeStepIndex={activeStepIndex}>
                      {stepIndex === activeStepIndex && wizardSteps[stepIndex].page}
                    </Wizard.Contents>
                  ))}
                </Wizard.Main>
              </Wizard.Row>
            </Wizard.Body>
            <Wizard.Footer className="wizard-pf-footer">
              <Button bsStyle="default" className="btn-cancel" onClick={this.onCancel}>
                Cancel
              </Button>
              <Button bsStyle="default" disabled={activeStepIndex === 0} onClick={this.onBack}>
                <Icon type="fa" name="angle-left" />
                Back
              </Button>
              {activeStepIndex < wizardSteps.length - 1 && (
                <Button bsStyle="primary" disabled={!validSteps[activeStepIndex]} onClick={this.onNext}>
                  Next
                  <Icon type="fa" name="angle-right" />
                </Button>
              )}
              {activeStepIndex === wizardSteps.length - 1 && (
                <Button bsStyle="primary" disabled={_.some(validSteps, step => !step)} onClick={this.onSubmit}>
                  Save
                </Button>
              )}
            </Wizard.Footer>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

CreateInstanceWizard.propTypes = {
  show: PropTypes.bool,
  creatingItem: PropTypes.object,
  createCatalogInstance: PropTypes.func,
  hideCreateCatalogDialog: PropTypes.func,
  showCreateResultsDialog: PropTypes.func,
  validSteps: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  instanceCreated: PropTypes.bool
};

CreateInstanceWizard.defaultProps = {
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
)(CreateInstanceWizard);
