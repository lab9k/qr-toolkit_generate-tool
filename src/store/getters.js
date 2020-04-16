export const getterTypes = {
  URLS: 'urls',
};

export default {
  [getterTypes.URLS]: (state) => state.urlsToGenerate,
};
