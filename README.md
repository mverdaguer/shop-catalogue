# shop-catalogue
A web page for a shop containing an image catalogue and an admin zone developed with VueJS.

## Frontend
All the frontend is done in [client](https://github.com/mverdaguer/shop-catalogue/tree/master/client) where you can find a nice [Readme](https://github.com/mverdaguer/shop-catalogue/tree/master/client) with a deep explanation about its configuration.


## Backend
The [index.js](https://github.com/mverdaguer/shop-catalogue/blob/master/index.js) has a mocked-backend which must be started with:
````
npm run start
````
This backend contains a sample catalog. All the endpoints to modify the data are disabled, thus if you want to use this in a real world scenario you must create your own backend.

## Example
This whole example is deployed in heroku as it is. To take a look at the results visit [shop catalogue](https://shop-catalogue.herokuapp.com/).
Notice that in this case the web is hacked in order to be always logged in. In order to be able to see the admin zone.


## Real case scenario
This whole project has been done with the main goal of creating a real case scenario which you can see in [Il·luminació Ginestera](https://www.illuminacioginestera.com/).

In that case the backend server has been developed using Laravel.