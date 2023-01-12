# Udacity-storefront-backend

## setup and connect to the database

**connect to default postgres database as the server root user's**
 psql -U postgres

**In psql run To Create user**

CREATE USER store WITH PASSWORD 'store';

**In psql run To Create dev database**

CREATE DATABASE db_store; 

**In psql run To Create test database**

CREATE DATABASE db_store_test; 

**connect database and GRANT ALL privileges**

**Grant for dev DB**

/c db_store

GRANT ALL PRIVILEGES ON DATABASE db_store TO store;

GRANT ALL ON SCHEMA public TO store;


**Grant for test DB**

/c db_store_test

GRANT ALL PRIVILEGES ON DATABASE db_store_test TO store;

GRANT ALL ON SCHEMA public TO store;


## To Run the app

**To install npm packages**

npm install



**To build type script**

npm run build

**To run node app**

npm run start

**To run Jasmine**

npm run test

**To run eslint**

npm run lint

**To run prettier**

npm run prettier

## Example of .env file

```sh
STORFRONT_HOST=localhost
STOREFRONT_DB=db_store
STOREFRONT_DB_TEST=db_store_test
STOREFRONT_USER=store
STOREFRONT_PASSWORD=store
ENV=dev
PEPPER=store_pass
SALT_ROUNDS=10
TOKEN_SECRET=stotesecrettoken2023

```

# End points

# Users API

## Index: Get Users


URL: http://localhost:3000/api/users 

Method: GET


**headers**


|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |

## Show: Get user By Id


URL: http://localhost:3000/api/users/:id

Method: GET


**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` | yes | number  | The user id             |


## Create: Add user

URL: http://localhost:3000/api/users/register 

Method: POST


**Payload:**
```sh
{
    "firstName": "Mai",
    "lastName": "Ashraf",
    "password": "123456",
    "userName": "maiAshraf"
}
```

## Login and authenticate user for login and provide token

Authenticate user for login and return the token

URL: http://localhost:3000/api/users/login/authenticate 

Method: POST

**Payload:**
```sh
{
    "userName": "maiAshraf",
    "password": "123456"
}
```

**Response:**
```sh
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJGhtN05rQmyczIxbEQvdFNHL3c5TXVmRUFhcEFmVzQuazF5UUdBNUdzWXYydWYzZ1ZIUzFXIn0sImlhdCI6MTY3MzE1MjY1N30.HsRUx9REVWoEQbyUunEA2N82R6pfh30BbM0aFYdtkMg"
}
```


## Update: Update user

URL: http://localhost:3000/api/users 

Method: PUT

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "id": 1
    "firstName": "Mai",
    "lastName": "Ashraf",
    "password": "123456",
    "userName": "maiAshraf"
}
```

## Delete: delete user

URL: http://localhost:3000/api/users 

Method: DELETE

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "id": 1
}
```

----------------------

# Products API

## Index: Get Products

URL: http://localhost:3000/api/products

Method: GET

## Show: Get Product By Id

URL: http://localhost:3000/api/products/:id

Method: GET

**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` | yes | number  | The product id             |


## Create: Add Product

URL: http://localhost:3000/api/products 

Method: POST

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "name": "Iphone 13 pro Max",
    "price": "30000",
    "category": "Mobile"
}
```

## get Products By Category

Get all products with same category

URL: http://localhost:3000/api/products/category/:category

Method: GET

**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `category` | yes | number  | The category name             |


## Update: Update Product

URL: http://localhost:3000/api/products 

Method: PUT

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "id": 1
    "name": "Iphone 13 pro Max",
    "price": "30000",
    "category": "Mobile"
}
```

## Delete: delete Product

URL: http://localhost:3000/api/products 

Method: DELETE

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "id": 1
}
```

----------------------

# Orders API

## Get Current active order for user

Get Current active order for user with all products details 

URL: http://localhost:3000/api/orders/active/user/:userId

Method: GET

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `userId` | yes | number  | The user id             |


## Get all complelted orders for user

Get Current complelted ordera for user with all products details 


URL: http://localhost:3000/api/orders/completed/user/:userId

Method: GET

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `userId` | yes | number  | The user id             |


## Get all orders for user

Get Current ordera for user with all products details 


URL: http://localhost:3000/api/orders/user/:userId

Method: GET

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `userId` | yes | number  | The user id             |


----------------------

# order Product API

## Add order_product

URL: http://localhost:3000/api/order_product 

Method: POST

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "order_id": "1",
    "product_id": "2",
    "quantity": "3"
}
```










