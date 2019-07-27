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

## Authentication
It is done using JSON Web Token Authentication, in this case I use [Vue Auth](https://github.com/websanova/vue-auth). If you need info about it check its documentation.