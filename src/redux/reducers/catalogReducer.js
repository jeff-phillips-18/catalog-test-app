import { helpers } from '../../common/helpers';
import { catalogConstants } from '../constants';

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
    creatingItem: null
  }
};

const catalogReducer = function(state = initialState, action) {
  switch (action.type) {
    case catalogConstants.SHOW_CREATE_INSTANCE:
      return helpers.setStateProp(
        'creatingInstance',
        {
          shown: true,
          creatingItem: action.payload.item
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
          creatingItem: null
        },
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

    default:
      return state;
  }
};

catalogReducer.initialState = initialState;

export { initialState, catalogReducer };

export default catalogReducer;
