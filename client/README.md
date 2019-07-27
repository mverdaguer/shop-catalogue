# shop-catalogue client

This is the Shop Catalogue frontend client done using VueJS.

The main goal of this app is to display a catalogue of images for the products of a shop which you can categorize in your own custom hierarchy.

# Components

## MainPage 
A description of the shop and a carousel of images.

## Contact
A form to send a message (email) to the shop manager and some information regarding the shop:

- GMaps position.
- Address.
- Phone number.
- Contact email.
- Timetable.

## ItemsList
A list of categorized items (products) of the shop. Both the items and their categories can be managed from the admin zone.

## Register
To register a new user.

## Login
Login page.

## Admin zone
### Item
Here you can manage the items. In the top of the page there are some filters to help you out while working with the items.

### Category
Here you can manage the categories.
Be aware that the menu of the page is dynamically created using the categories that you manage here. Also, their hierarchy is constrained to 3 levels.

### Supplier
Here you can manage the suppliers. They are only used to filter the Items on the admin zone.

### Home images
Here you can manage the images displayed on the MainPage carousel.


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

There is already a key set used for e2e tests (and debugging with the mocked server) set up, which might help you out: _.env.test_.

## Localization
You can add languages and edit the current texts by editing the files in locales/.

# Backend REST API
## MainPage
In this page there is a carousel with images which are obtained by calling _VUE_APP_API_BASE_URL/home_images_.

These images must be returned like:

````
{ 
  data: ['img1.png', 'img2.png']
}
````

All of them must be contained in _VUE_APP_API_BASE_URL/images/home/image-name_.

## Contact
Notice that the contact page has a form to send a message to the web owner.

This will send a JSON message (POST) with fields:
````
{
  name: 'name',
  mail: 'aa@gmail.com',
  content: 'content',
  phone: '1234'
}
````

All of which are required but the _phone_.
This message will be sent via a _POST_ call to _VUE_APP_API_BASE_URL/send_.

## ItemsList
Here you can see all the items of the shop filtered by their category.

The categories are obtained from _VUE_APP_API_BASE_URL/categories_

These categories must be returned in a list like:
````
[
  {
    id: int-number, 
    name: "category name", 
    parent_category: int-number or undefined
  }
]
````

The items are obtained from _VUE_APP_API_BASE_URL/items_

These items must be returned in a list like:
````
[
  {
    id: int-number, 
    name: "item name", 
    image: ".jpg" aka image extension, 
    category: {
      id: int-number, 
      name: "category name"
    }, 
    supplier: {
      id: int-number, 
      name: "supplier name"
    }
  }
]
````

If the item has no category or supplier the field must be an empty object ```{}```.

## Admin
### Items
#### Creation
_POST_ to _VUE_APP_API_BASE_URL/items_. The request params must include the created item like:
````
{
  category: int-number,
  image: image in base64 format,
  name: "item name",
  supplier: int-number (Optional parameter)
} 
````

#### Edition
_PATCH_ to _VUE_APP_API_BASE_URL/items/{id-item}_. The request params must include the created item like:
````
{
  category: {
    id: int-number, 
    name: "category name"
  },
  id: int-number,
  image: image in base64 format,
  name: "item name",
  supplier: int-number (Optional parameter)
}
````

#### Removal
_DELETE_ to _VUE_APP_API_BASE_URL/items/{id-item}_. 

### Categories
#### Creation
_POST_ to _VUE_APP_API_BASE_URL/categories_. The request params must include the created category like:
````
{
  name: "category name",
  parent_category: int-number (Optional parameter)
}
````

#### Edition
_PATCH_ to _VUE_APP_API_BASE_URL/categories/{id-category}_. The request params must include the created category like:
````
{
  id: int-number,
  name: "category name",
  parent_category: int-number (Optional parameter)
}
````

### Removal
_DELETE_ to _VUE_APP_API_BASE_URL/categories/{id-category}_. 

## Suppliers
### Load
The suppliers are obtained from _VUE_APP_API_BASE_URL/suppliers_

These suppliers must be returned in a list like:
````
[
  {
    id: int-number, 
    name: "supplier name"
  }
]
````

### Creation
_POST_ to _VUE_APP_API_BASE_URL/suppliers_. The request params must include the created supplier like:
````
{
  name: "supplier name"
}
````

### Edition
_PATCH_ to _VUE_APP_API_BASE_URL/suppliers/{id-supplier}_. The request params must include the created supplier like:
````
{
  id: int-number,
  name: "supplier name"
}
````

### Removal
_DELETE_ to _VUE_APP_API_BASE_URL/suppliers/{id-supplier}_. 

## Home images
### Creation
_POST_ to _VUE_APP_API_BASE_URL/home_images_. The request params must include the created home image like:
````
{
  path: image in base64 format
}
````

### Removal
_DELETE_ to _VUE_APP_API_BASE_URL/home_images/{image name}_.

# Project setup
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
