import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Grid } from 'patternfly-react';
import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';

class CreateInstanceWizardToolsStep extends React.Component {
  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { configuration } = createItem;
    this.props.setCreateWizardStepValid(4, !!configuration);
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
              <Form.ControlLabel>Npm Tools</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.npmTools}
                onChange={e => this.onValueChange(e, 'npmTools')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Test Projects</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.testProjects}
                onChange={e => this.onValueChange(e, 'testProjects')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Configuration</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.configuration}
                onChange={e => this.onValueChange(e, 'configuration')}
              />
            </Form.FormGroup>
          </Form>
        </Grid.Col>
      </Grid.Row>
    );
  }
}

CreateInstanceWizardToolsStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceWizardToolsStep.defaultProps = {
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
)(CreateInstanceWizardToolsStep);
