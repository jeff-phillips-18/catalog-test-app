/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { Form, Grid } from 'patternfly-react';

import { helpers } from '../common/helpers';
import CreateInstanceNameForm from './createInstanceForms/createInstanceNameForm';
import CreateInstancePlanForm from './createInstanceForms/createInstancePlanForm';
import CreateInstanceContextForm from './createInstanceForms/createInstanceContextForm';
import CreateInstanceStartupForm from './createInstanceForms/createInstanceStartupForm';
import CreateInstanceToolsForm from './createInstanceForms/createInstanceToolsForm';

class CatalogInstanceForm extends React.Component {
  state = {
    createItem: null
  };

  static getDerivedStateFromProps(props, state) {
    const { catalogItem } = props;
    if (!catalogItem || !_.isEqual(catalogItem, state.createItem)) {
      const createItem = helpers.createDefaultInstance(catalogItem);
      return {
        createItem,
        initItem: _.cloneDeep(createItem)
      };
    }

    return null;
  }

  renderFormLabel = label => (
    <Grid.Col componentClass={Form.ControlLabel} sm={5}>
      {label}
    </Grid.Col>
  );

  validateForm = createItem => {
    const { onChange } = this.props;
    onChange(createItem, !!createItem.instanceName);
  };

  onValueChange = (event, field) => {
    const { createItem } = this.state;
    const { onChange } = this.props;
    createItem[field] = event.target.value;
    onChange(createItem, this.validateForm(createItem));
  };

  renderFormLabel = label => {
    const { horizontal, labelSize } = this.props;
    if (horizontal) {
      return (
        <Grid.Col componentClass={Form.ControlLabel} sm={labelSize}>
          {label}
        </Grid.Col>
      );
    }
    return <Form.ControlLabel>{label}</Form.ControlLabel>;
  };

  renderFormControl = control => {
    const { horizontal, labelSize } = this.props;
    if (horizontal) {
      return <Grid.Col sm={12 - labelSize}>{control}</Grid.Col>;
    }
    return control;
  };

  render() {
    const { createItem } = this.state;
    const { horizontal, labelSize } = this.props;

    return (
      <Form horizontal={horizontal} onSubmit={e => e.preventDefault()}>
        <CreateInstanceNameForm
          createItem={createItem}
          validateForm={this.validateForm}
          horizontal={horizontal}
          labelSize={labelSize}
        />
        <CreateInstancePlanForm
          createItem={createItem}
          validateForm={this.validateForm}
          horizontal={horizontal}
          labelSize={labelSize}
        />
        <CreateInstanceContextForm
          createItem={createItem}
          validateForm={this.validateForm}
          horizontal={horizontal}
          labelSize={labelSize}
        />
        <CreateInstanceStartupForm
          createItem={createItem}
          validateForm={this.validateForm}
          horizontal={horizontal}
          labelSize={labelSize}
        />
        <CreateInstanceToolsForm
          createItem={createItem}
          validateForm={this.validateForm}
          horizontal={horizontal}
          labelSize={labelSize}
        />
      </Form>
    );
  }
}

CatalogInstanceForm.propTypes = {
  catalogItem: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  labelSize: PropTypes.number
};

CatalogInstanceForm.defaultProps = {
  catalogItem: null,
  horizontal: true,
  labelSize: 5
};

export default CatalogInstanceForm;
