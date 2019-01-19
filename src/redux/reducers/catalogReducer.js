import * as _ from 'lodash-es';
import { helpers } from '../../common/helpers';
import { catalogConstants } from '../constants';
import { createInstanceWizardSteps } from '../../components/createInstanceWizard/createInstanceWizardConstants';

const initialState = {
  catalogItems: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    catalogItems: []
  },
  catalogInstances: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    catalogInstances: []
  },
  creatingInstance: {
    shown: false,
    creatingItem: null,
    navigateOnHide: ''
  },
  createDialog: {
    shown: false,
    creatingItem: null,
    wizard: true,
    validSteps: []
  },
  navigateRequest: {
    navigateTo: ''
  }
};

const getInitialWizardValidSteps = () => {
  const validSteps = [];
  for (let i = 0; i < createInstanceWizardSteps.length - 1; i++) {
    validSteps.push(false);
  }
  return validSteps;
};

const getWizardStepUpdateState = (state, stepNum, valid) => {
  const validSteps = _.clone(state.createDialog.validSteps);
  validSteps[stepNum] = valid;
  return { ...state.createDialog, validSteps };
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case catalogConstants.NAVIGATE_REQUEST:
      return helpers.setStateProp(
        'navigateRequest',
        {
          navigateTo: action.navigateTo
        },
        {
          state,
          initialState
        }
      );

    case catalogConstants.NAVIGATE_REQUEST_CLEAR:
      return helpers.setStateProp(
        'navigateRequest',
        {
          navigateTo: ''
        },
        {
          state,
          initialState
        }
      );

    case catalogConstants.SHOW_CREATE_INSTANCE:
      return helpers.setStateProp(
        'creatingInstance',
        {
          shown: true,
          creatingItem: action.item
        },
        {
          state,
          initialState
        }
      );

    case catalogConstants.HIDE_CREATE_INSTANCE:
      return helpers.setStateProp(
        'creatingInstance',
        {
          shown: false,
          creatingItem: null,
          navigateOnHide: action.navigateTo
        },
        {
          state,
          initialState
        }
      );

    case catalogConstants.SHOW_CREATE_DIALOG:
      return helpers.setStateProp(
        'createDialog',
        {
          shown: true,
          creatingItem: helpers.createDefaultInstance(action.item),
          wizard: action.wizard,
          validSteps: getInitialWizardValidSteps()
        },
        {
          state: {
            ...helpers.setStateProp(
              'catalogInstances',
              {
                fullfilled: false
              },
              {
                state,
                initialState,
                reset: true
              }
            )
          },
          initialState
        }
      );

    case catalogConstants.HIDE_CREATE_DIALOG:
      return helpers.setStateProp(
        'createDialog',
        {
          shown: false,
          creatingItem: null,
          navigateOnHide: action.navigateTo
        },
        {
          state,
          initialState
        }
      );

    case catalogConstants.SET_CREATE_WIZARD_STEP_VALID:
      return helpers.setStateProp(
        'createDialog',
        getWizardStepUpdateState(state, action.stepNum, action.valid),
        {
          state,
          initialState
        }
      );

    case helpers.REJECTED_ACTION(catalogConstants.GET_CATLOG_ITEMS):
      return helpers.setStateProp(
        'calalogItems',
        {
          pending: false,
          error: action.error,
          errorMessage: helpers.getErrorMessageFromResults(action.payload)
        },
        {
          state,
          initialState
        }
      );

    case helpers.PENDING_ACTION(catalogConstants.GET_CATLOG_ITEMS):
      return helpers.setStateProp(
        'catalogItems',
        {
          pending: true,
          catalogItems: state.catalogItems.catalogItems
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(catalogConstants.GET_CATLOG_ITEMS):
      return helpers.setStateProp(
        'catalogItems',
        {
          catalogItems: action.payload.data.items,
          pending: false,
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.REJECTED_ACTION(catalogConstants.CREATE_CATALOG_INSTANCE):
      return helpers.setStateProp(
        'catalogInstances',
        {
          pending: false,
          error: action.error,
          errorMessage: helpers.getErrorMessageFromResults(action.payload)
        },
        {
          state,
          initialState
        }
      );

    case helpers.PENDING_ACTION(catalogConstants.CREATE_CATALOG_INSTANCE):
      return helpers.setStateProp(
        'catalogInstances',
        {
          pending: true,
          catalogInstances: state.catalogInstances.catalogInstances
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(catalogConstants.CREATE_CATALOG_INSTANCE):
      return helpers.setStateProp(
        'catalogInstances',
        {
          catalogInstances: [
            ...state.catalogInstances.catalogInstances,
            action.payload.data.item
          ],
          pending: false,
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    case catalogConstants.CLEAR_CATALOG_INSTANCE:
      return helpers.setStateProp(
        'catalogInstances',
        {},
        {
          state,
          initialState
        },
        true
      );

    default:
      return state;
  }
};

catalogReducer.initialState = initialState;

export { initialState, catalogReducer };

export default catalogReducer;
