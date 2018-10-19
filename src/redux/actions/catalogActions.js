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

const createCatalogInstance = (name, item) => dispatch => {
  const instance = {
    instanceName: name,
    ...item
  };
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
            item: instance
          }
        }
      }),
    1500
  );
};

const catalogActions = {
  fetchCatalogItems
};

export { catalogActions, fetchCatalogItems, createCatalogInstance };
