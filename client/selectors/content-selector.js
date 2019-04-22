import { createSelector } from "reselect";
import { isEmpty, get } from "lodash";

import Content from "model/content";

const getAllContentFromState = (state) => state.content.content;
export const getLoading = (state) => state.content.loading;

export const getAllContent = createSelector(
  [getAllContentFromState],
  (allContent) => {
    const contentObjects = [];

    const contentArr = get(allContent, "data", []);
    if (!isEmpty(contentArr)) {
      for (const content of contentArr) {
        const contentObject = new Content();
        contentObject.setValues(content.data);
        contentObjects.push(contentObject);
      }
    }

    return contentObjects;
  },
);
