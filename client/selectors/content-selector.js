import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

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

export const getAboutContent = createSelector(
  [getAllContentFromState],
  (allContent) => {
    let contentObj = null;

    if (!isEmpty(allContent)) {
      const content = findContentByType(allContent, 'ABOUT');
      if (content) {
        contentObj = new Content();
        contentObj.setValues(content.data);
      }
    }

    return contentObj;
  }
);

export const getContentType = (state) => {
  return state && state.content && state.content.type;
};

const findContentByType = (contentArr, type) => {
  if (!Array.isArray(contentArr)) {
    return null;
  }

  return contentArr.find((content) => {
    return content.data.type === 'ABOUT';
  });
};
