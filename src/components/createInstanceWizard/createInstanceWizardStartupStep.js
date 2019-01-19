import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Grid } from 'patternfly-react';
import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';

class CreateInstanceWizardStartupStep extends React.Component {
  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { startupProject } = createItem;
    this.props.setCreateWizardStepValid(3, !!startupProject);
  };

  onValueChange = (event, field) => {
    const { createItem } = this.props;
    createItem[field] = event.target.value;
    this.validateForm(createItem);
    this.forceUpdate();
  };

  render() {
    const { createItem } = this.props;

    return (
      <Grid.Row className="catalog-modal__form-container">
        <Grid.Col sm={8} md={6}>
          <Form>
            <Form.FormGroup>
              <Form.ControlLabel>Startup Project</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.startupProject}
                onChange={e => this.onValueChange(e, 'startupProject')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>SDK Version</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.sdkVersion}
                onChange={e => this.onValueChange(e, 'sdkVersion')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Startup Assembly</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.startupAssembly}
                onChange={e => this.onValueChange(e, 'startupAssembly')}
              />
            </Form.FormGroup>
          </Form>
        </Grid.Col>
      </Grid.Row>
    );
  }
}

CreateInstanceWizardStartupStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceWizardStartupStep.defaultProps = {
  createItem: {},
  setCreateWizardStepValid: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  setCreateWizardStepValid: (stepNum, valid) =>
    dispatch(setCreateWizardStepValid(stepNum, valid))
});

const mapStateToProps = state => ({
  createItem: state.catalog.createDialog.creatingItem
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInstanceWizardStartupStep);
