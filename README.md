# Udacity-storefront-backend

## To Run the app

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
STOREFRONT_DB=dataBase_name
STOREFRONT_DB_TEST=dataBase_name_test
STOREFRONT_USER=username
STOREFRONT_PASSWORD=password
ENV=dev
PEPPER=store_pass
SALT_ROUNDS=10
TOKEN_SECRET=secrectKey
```

# End points

## Users API

### Get Users


URL: http://localhost:3000/api/users 

Method: GET


**headers**


|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |

### Get user By Id


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


## Add user

URL: http://localhost:3000/api/users 

Method: POST

**headers**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |


**Payload:**
```sh
{
    "firstName": "Mai",
    "lastName": "Ashraf",
    "password": "123456",
    "userName": "maiAshraf"
}
```

### Update user

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

### delete user

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

### Authenticate user for login

Authenticate user for login and return the token

URL: http://localhost:3000/api/users/authenticate 

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

----------------------

## Products API

### Get Products

URL: http://localhost:3000/api/products

Method: GET

### Get Product By Id

URL: http://localhost:3000/api/products/:id

Method: GET

**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` | yes | number  | The product id             |


## Add Product

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

### Update Product

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

### delete Product

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

### get Products By Category

Get all products with same category

URL: http://localhost:3000/api/products/category/:category

Method: GET

**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `category` | yes | number  | The category name             |


----------------------

## Orders API

### Get Current active order for user

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


### Get all complelted orders for user

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


### Get all orders for user

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

## order Product API

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










