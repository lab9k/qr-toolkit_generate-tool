export const mutationTypes = {
  UPDATE_URLS_TO_GENERATE: 'UPDATE_URLS_TO_GENERATE',
};
export default {
  [mutationTypes.UPDATE_URLS_TO_GENERATE](state, urls) {
    state.urlsToGenerate = urls;
  },
};
