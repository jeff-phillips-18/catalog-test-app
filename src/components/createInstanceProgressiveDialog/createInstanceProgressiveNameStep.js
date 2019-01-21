import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Form, Grid } from 'patternfly-react';

import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';
import CreateInstanceNameForm from '../createInstanceForms/createInstanceNameForm';

class CreateInstanceProgressiveNameStep extends React.Component {
  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { instanceName, namespace } = createItem;
    this.props.setCreateWizardStepValid(0, !!instanceName && !!namespace);
    this.forceUpdate();
  };

  render() {
    const { createItem } = this.props;

    return (
      <Grid fluid className="catalog-create-instance-form">
        <Form onSubmit={e => e.preventDefault()} horizontal>
          <CreateInstanceNameForm createItem={createItem} validateForm={this.validateForm} horizontal labelSize={3} />
        </Form>
      </Grid>
    );
  }
}

CreateInstanceProgressiveNameStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceProgressiveNameStep.defaultProps = {
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
)(CreateInstanceProgressiveNameStep);
