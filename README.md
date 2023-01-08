# Udacity-storefront-backend

# User API

## Get Users


URL: http://localhost:3000/api/users 

Method: GET


**headers**


|          Name | Mandatory |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `token` | yes | string  | The jwt token ex: Bearer token            |

## Get user By Id


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

## Update user

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

## delete user

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

## Authenticate user for login

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



# To Run the app

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








