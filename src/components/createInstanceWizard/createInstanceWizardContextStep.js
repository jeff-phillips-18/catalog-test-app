import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Grid } from 'patternfly-react';
import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';

class CreateInstanceWizardContextStep extends React.Component {
  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { gitRepo, gitRef } = createItem;
    this.props.setCreateWizardStepValid(2, !!gitRepo && !!gitRef);
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
              <Form.ControlLabel>Git Repository URL</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.gitRepo}
                onChange={e => this.onValueChange(e, 'gitRepo')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Git Reference</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.gitRef}
                onChange={e => this.onValueChange(e, 'gitRef')}
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel>Context Directory</Form.ControlLabel>
              <Form.FormControl
                className="catalog-form-control"
                type="text"
                value={createItem.contextDir}
                onChange={e => this.onValueChange(e, 'contextDir')}
              />
            </Form.FormGroup>
          </Form>
        </Grid.Col>
      </Grid.Row>
    );
  }
}

CreateInstanceWizardContextStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceWizardContextStep.defaultProps = {
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
)(CreateInstanceWizardContextStep);
