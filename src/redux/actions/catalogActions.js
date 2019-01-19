import { helpers } from '../../common/helpers';
import * as catalogConstants from '../constants/catalogConstants';
import { mockCatalogItems } from '../../__mock-data__/mockCatalogItems';

const fetchCatalogItems = params => dispatch => {
  dispatch({
    type: helpers.PENDING_ACTION(catalogConstants.GET_CATLOG_ITEMS)
  });
  setTimeout(
    () =>
      dispatch({
        type: helpers.FULFILLED_ACTION(catalogConstants.GET_CATLOG_ITEMS),
        payload: {
          data: {
            items: mockCatalogItems
          }
        }
      }),
    1500
  );
};

const createCatalogInstance = item => dispatch => {
  dispatch({
    type: helpers.PENDING_ACTION(catalogConstants.CREATE_CATALOG_INSTANCE)
  });
  setTimeout(
    () =>
      dispatch({
        type: helpers.FULFILLED_ACTION(
          catalogConstants.CREATE_CATALOG_INSTANCE
        ),
        payload: {
          data: {
            item
          }
        }
      }),
    1500
  );
};

const showCreateCatalogInstance = item => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.SHOW_CREATE_INSTANCE,
        item
      }),
    10
  );
};

const hideCreateCatalogInstance = () => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.HIDE_CREATE_INSTANCE,
        payload: { item: null }
      }),
    10
  );
};

const showCreateCatalogDialog = item => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.SHOW_CREATE_DIALOG,
        item
      }),
    10
  );
};

const hideCreateCatalogDialog = () => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.HIDE_CREATE_DIALOG,
        payload: { item: null }
      }),
    10
  );
};

const setCreateWizardStepValid = (stepNum, valid) => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.SET_CREATE_WIZARD_STEP_VALID,
        stepNum,
        valid
      }),
    10
  );
};

const navigateRequest = href => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.NAVIGATE_REQUEST,
        navigateTo: href
      }),
    10
  );
};

const navigateRequestClear = () => dispatch => {
  setTimeout(
    () =>
      dispatch({
        type: catalogConstants.NAVIGATE_REQUEST_CLEAR
      }),
    10
  );
};

const catalogActions = {
  fetchCatalogItems,
  createCatalogInstance,
  showCreateCatalogInstance,
  hideCreateCatalogInstance,
  showCreateCatalogDialog,
  hideCreateCatalogDialog,
  navigateRequest,
  navigateRequestClear
};

export {
  catalogActions,
  fetchCatalogItems,
  createCatalogInstance,
  showCreateCatalogInstance,
  hideCreateCatalogInstance,
  showCreateCatalogDialog,
  hideCreateCatalogDialog,
  setCreateWizardStepValid,
  navigateRequest,
  navigateRequestClear
};
