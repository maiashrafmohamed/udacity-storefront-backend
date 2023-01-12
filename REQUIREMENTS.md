# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 

URL: http://localhost:3000/api/products

Method: GET

- Show (args: product id)

URL: http://localhost:3000/api/products/:id

Method: GET

**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` | yes | number  | The product id             |



- Create (args: Product)[token required]

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

- [OPTIONAL] Products by category (args: product category)

URL: http://localhost:3000/api/products/category/:category

Method: GET

**Parameters**

|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `category` | yes | number  | The category name             |


#### Users
- Index [token required]

URL: http://localhost:3000/api/users

Method: GET

- Show (args: id)[token required]

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


- Create register (args: User)

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

-Login and authenticate user for login and provide token

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


#### Orders
- Current Order by user (args: user id)[token required]

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


- [OPTIONAL] Completed Orders by user (args: user id)[token required]

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


-Get all orders for user

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


## Data Shapes
#### Product
-  id --> SERIAL PRIMARY  KEY
- name --> VARCHAR(150)
- price --> integer
- [OPTIONAL] category VARCHAR(150)

#### User
- id --> SERIAL PRIMARY  KEY
- firstname --> VARCHAR(100)
- lastname --> VARCHAR(100)
- username --> VARCHAR(150)
- password --> VARCHAR

#### Orders
- id --> SERIAL PRIMARY  KEY
- user_id --> INTEGER REFERENCES "users"(id)
- status of order (active or complete) --> VARCHAR(100)

#### Order_product
- product_id --> 
- order_id --> INTEGER REFERENCES "products"(id),
- quantity --> integer

