# Configuration

## .env
Environment variables:
1. _VUE_APP_API_BASE_URL_: The backend base url.
2. _VUE_APP_API_BASE_URL_IMAGES_: The url where are the images retrived from the backend (in the mocked server is the same _VUE_APP_API_BASE_URL_).
3. _VUE_APP_API_BASE_AXIOS_URL_: Base url for all the backend requests using axios.
4. _VUE_APP_API_ANALYTICS_: Your google analytics key.
5. _VUE_APP_MAP_LATITUDE_: Latitude coordinade of Contact map.
6. _VUE_APP_MAP_LONGITUDE_: Longitude coordinade of Contact map.
7. _VUE_APP_GOOGLE_MAPS_KEY_: Your Google Maps key.
8. _VUE_APP_TEST_ENVIRONMENT_: Must be set if you are testing (to avoid using authentication).

There is already a key set used for e2e tests (and debugging with the mocked server) set up, which might help you out: _.env.test_.

## Localization
You can add languages and edit the current texts by editing the files in locales/.