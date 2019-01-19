import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash-es';

import { connect } from 'react-redux';

import { Dropdown, Form, Grid, MenuItem } from 'patternfly-react';
import { CatalogItemHeader } from 'patternfly-react-extensions';

import { getImageForIconClass } from '../../utils/catalogItemIcon';
import { helpers } from '../../common/helpers';
import { setCreateWizardStepValid } from '../../redux/actions/catalogActions';

class CreateInstanceWizardNameStep extends React.Component {
  state = {
    namespaces: helpers.fakeNamespaces
  };

  componentDidMount() {
    this.validateForm(this.props.createItem);
  }

  validateForm = createItem => {
    const { instanceName, namespace } = createItem;
    this.props.setCreateWizardStepValid(0, !!instanceName && !!namespace);
  };

  updateName = event => {
    const { createItem } = this.props;
    createItem.instanceName = event.target.value;
    this.validateForm(createItem);
    this.forceUpdate();
  };

  setNamespace = newNamespace => {
    const { createItem } = this.props;
    createItem.namespace = newNamespace;
    this.validateForm(createItem);
    this.forceUpdate();
  };

  render() {
    const { createItem } = this.props;
    const { namespaces } = this.state;

    return (
      <React.Fragment>
        <div className="catalog-modal__wizard-description">
          <CatalogItemHeader
            className="catalog-modal__item-header"
            iconImg={getImageForIconClass(createItem.imgUrl)}
            title={createItem.name}
            vendor={`${createItem.version} provided by ${createItem.provider}`}
          />
          <h3>Description</h3>
          {createItem.shortDescription}
        </div>
        <Grid.Row className="catalog-modal__form-container">
          <Grid.Col sm={8} md={6}>
            <Form onSubmit={e => e.preventDefault()}>
              <Form.FormGroup>
                <Form.ControlLabel>Project</Form.ControlLabel>
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
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Form.FormControl
                  className="catalog-form-control"
                  type="text"
                  autoFocus
                  placeholder="Enter a name"
                  value={createItem.instanceName}
                  onChange={e => this.updateName(e)}
                />
              </Form.FormGroup>
            </Form>
          </Grid.Col>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

CreateInstanceWizardNameStep.propTypes = {
  createItem: PropTypes.object,
  setCreateWizardStepValid: PropTypes.func
};

CreateInstanceWizardNameStep.defaultProps = {
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
)(CreateInstanceWizardNameStep);
