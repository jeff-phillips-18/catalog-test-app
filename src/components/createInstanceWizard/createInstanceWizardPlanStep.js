import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Grid, Radio } from 'patternfly-react';
import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';

class CreateInstanceWizardPlanStep extends React.Component {
  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { plan, memoryLimit, volumeCapacity } = createItem;
    this.props.setCreateWizardStepValid(
      1,
      !!plan && !!memoryLimit && !!volumeCapacity
    );
  };

  onChangePlan = event => {
    const { createItem } = this.props;
    createItem.plan = event.target.value;
    this.validateForm(createItem);
    this.forceUpdate();
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
              <Form.ControlLabel>Plans</Form.ControlLabel>
              <React.Fragment>
                <Radio
                  name="plans"
                  value="Plan 1"
                  checked={createItem.plan === 'Plan 1'}
                  onChange={this.onChangePlan}
                >
                  Plan 1
                </Radio>
                <Radio
                  name="plans"
                  value="Plan 2"
                  checked={createItem.plan === 'Plan 2'}
                  onChange={this.onChangePlan}
                >
                  Plan 2
                </Radio>
              </React.Fragment>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Memory Limit</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.memoryLimit}
                onChange={e => this.onValueChange(e, 'memoryLimit')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Volume Capacity</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.volumeCapacity}
                onChange={e => this.onValueChange(e, 'volumeCapacity')}
              />
            </Form.FormGroup>
          </Form>
        </Grid.Col>
      </Grid.Row>
    );
  }
}

CreateInstanceWizardPlanStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceWizardPlanStep.defaultProps = {
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
)(CreateInstanceWizardPlanStep);
