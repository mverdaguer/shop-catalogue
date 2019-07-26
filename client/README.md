# shop-catalogue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

A server running is needed, from the parent folder run:
```
npm run start
```


### Run your unit tests
```
npm run test:unit
```


## Configuration

### .env
Here you must define a set of configuration variables.
1. _VUE_APP_API_BASE_URL_: This is the base url where the backend is setup.
2. _VUE_APP_API_BASE_URL_IMAGES_: This is the base url where the backend is setup to retrieve the images (it should be the same as _VUE_APP_API_BASE_URL_).
3. _VUE_APP_API_BASE_AXIOS_URL_: This is the base url where all the http requests are done to the backend.
4. _VUE_APP_API_ANALYTICS_: Your google analytics key.
5. _VUE_APP_MAP_LATITUDE_: Latitude coordinade of Contact map.
6. _VUE_APP_MAP_LONGITUDE_: Longitude coordinade of Contact map.
7. _VUE_APP_GOOGLE_MAPS_KEY_: Your Google Maps key.

There is already a key set used for e2e tests set up, which might help you out: _.env.test_.

### MainPage
Besides all the texts that are set up in the locales/ files, in this page there is a carousel with images which are obtained by calling _VUE_APP_API_BASE_URL/home_images_.

These images must be returned like:
<code>
{ 
  data: ['img1.png', 'img2.png']
}
</code>
All of them must be contained in _VUE_APP_API_BASE_URL/images/home/image-name_.

### Contact
You can notice that the contact page has a form to send a message to the web owner.

This will send a JSON message (POST) with fields:
<code>
{
  name: 'name',
  mail: 'aa@gmail.com',
  content: 'content',
  phone: '1234'
}
</code>

All of which are required but the _phone_.
This messaged will be send via _POST_ to _VUE_APP_API_BASE_URL/send_.

