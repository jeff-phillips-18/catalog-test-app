import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Grid } from 'patternfly-react';
import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';
import CreateInstanceStartupForm from '../createInstanceForms/createInstanceStartupForm';

class CreateInstanceProgressiveStartupStep extends React.Component {
  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { startupProject } = createItem;
    this.props.setCreateWizardStepValid(3, !!startupProject);
    this.forceUpdate();
  };

  render() {
    const { createItem } = this.props;

    return (
      <Grid fluid className="catalog-create-instance-form">
        <Form onSubmit={e => e.preventDefault()} horizontal>
          <CreateInstanceStartupForm
            createItem={createItem}
            validateForm={this.validateForm}
            horizontal
            labelSize={3}
          />
        </Form>
      </Grid>
    );
  }
}

CreateInstanceProgressiveStartupStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceProgressiveStartupStep.defaultProps = {
  createItem: {},
  setCreateWizardStepValid: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  setCreateWizardStepValid: (stepNum, valid) => dispatch(setCreateWizardStepValid(stepNum, valid))
});

const mapStateToProps = state => ({
  createItem: state.catalog.createDialog.creatingItem
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInstanceProgressiveStartupStep);
