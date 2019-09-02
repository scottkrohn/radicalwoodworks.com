import { createSelector } from 'reselect';
import { isEmpty, get } from 'lodash';

import Content from 'model/content';

const getAllContentFromState = (state) => state.content.content;
export const getLoading = (state) => state.content.loading;

export const getAllContent = createSelector(
  [getAllContentFromState],
  (allContent) => {
    const contentObjects = [];

    if (!isEmpty(allContent)) {
      for (const content of allContent) {
        const contentObject = new Content();
        contentObject.setValues(content.data);
        contentObjects.push(contentObject);
      }
    }

    return contentObjects;
  }
);

export const getContentType = (state) => {
  return state && state.content && state.content.type;
};
