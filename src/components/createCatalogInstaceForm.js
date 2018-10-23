/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { Dropdown } from 'patternfly-react/dist/esm/components/Dropdown';
import { Form, Radio } from 'patternfly-react/dist/esm/components/Form';
import { Grid } from 'patternfly-react/dist/esm/components/Grid';
import { MenuItem } from 'patternfly-react/dist/esm/components/MenuItem';

const fakeNamespaces = [
  'default',
  'development',
  'my-project',
  'production',
  'qa',
  'test-project'
];

const defaultItem = {
  instanceName: '',
  namespace: fakeNamespaces[0],
  plan: 'Plan 1'
};

class CatalogItemCreateInstanceDialog extends React.Component {
  state = {
    createItem: null,
    namespaces: fakeNamespaces
  };

  static getDerivedStateFromProps(props, state) {
    const { catalogItem } = props;
    if (!catalogItem || !_.isEqual(catalogItem, state.createItem)) {
      return {
        createItem: {
          ...defaultItem,
          ..._.cloneDeep(catalogItem)
        }
      };
    }

    return null;
  }

  renderFormLabel = label => (
    <Grid.Col componentClass={Form.ControlLabel} sm={5}>
      {label}
    </Grid.Col>
  );

  validateForm = createItem => !!createItem.instanceName;

  updateName = event => {
    const { createItem } = this.state;
    const { onChange } = this.props;
    createItem.instanceName = event.target.value;
    onChange(createItem, this.validateForm(createItem));
  };

  setNamespace = newNamespace => {
    const { createItem } = this.state;
    const { onChange } = this.props;
    createItem.namespace = newNamespace;
    onChange(createItem, this.validateForm(createItem));
  };

  onChangePlan = event => {
    const { createItem } = this.state;
    const { onChange } = this.props;
    createItem.plan = event.target.value;
    onChange(createItem, this.validateForm(createItem));
  };

  renderFormLabel = label => {
    const { horizontal } = this.props;
    if (horizontal) {
      return (
        <Grid.Col componentClass={Form.ControlLabel} sm={5}>
          {label}
        </Grid.Col>
      );
    }
    return <Form.ControlLabel>{label}</Form.ControlLabel>;
  };

  renderFormControl = control => {
    const { horizontal } = this.props;
    if (horizontal) {
      return <Grid.Col sm={7}>{control}</Grid.Col>;
    }
    return control;
  };

  render() {
    const { createItem, namespaces } = this.state;
    const { horizontal } = this.props;

    return (
      <Form horizontal={horizontal} onSubmit={e => e.preventDefault()}>
        <Form.FormGroup>
          {this.renderFormLabel('Project')}
          {this.renderFormControl(
            <div className="catalog-dropdownselect">
              <Dropdown id="projectDropdown">
                <Dropdown.Toggle>
                  <span>{createItem.namespace}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {_.map(namespaces, nextNamespace => (
                    <MenuItem
                      key={nextNamespace}
                      className={{
                        'catalog-dropdownselect-menuitem-selected':
                          createItem.namespace === nextNamespace
                      }}
                      eventKey="1"
                      onClick={() => this.setNamespace(nextNamespace)}
                    >
                      {nextNamespace}
                    </MenuItem>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Name')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              autoFocus
              placeholder="Enter a name"
              value={createItem.instanceName}
              onChange={e => this.updateName(e)}
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Plans')}
          {this.renderFormControl(
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
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Memory Limit')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue="128Mi"
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Volume Capacity')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue="256Mi"
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Git Repository URL')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue="https://github.com/redhat-developer/s2i-aspnet-musicstore-ex.git"
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Git Reference')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue="https://github.com/redhat-developer/s2i-aspnet-musicstore-ex.git"
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Context Directory')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue=""
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Startup Project')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue="samples/MusicStore"
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('SDK Version')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue=""
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Startup Assembly')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue=""
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Npm Tools')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue=""
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Test Projects')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue=""
            />
          )}
        </Form.FormGroup>
        <Form.FormGroup>
          {this.renderFormLabel('Configuration')}
          {this.renderFormControl(
            <Form.FormControl
              className="catalog-form-control"
              type="text"
              defaultValue="Release"
            />
          )}
        </Form.FormGroup>
      </Form>
    );
  }
}

CatalogItemCreateInstanceDialog.propTypes = {
  catalogItem: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  horizontal: PropTypes.bool
};

CatalogItemCreateInstanceDialog.defaultProps = {
  catalogItem: null,
  horizontal: true
};

export default CatalogItemCreateInstanceDialog;
