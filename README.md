## L2-assignment-2
- install package : npm i
- run: npm run start:prod
- build : npm run build
-  chech linting error : npm run lint
-  fix linting error : npm run lint:fix
- check prettie : npm run prettier
- fix prettie : npm run prettier:fix

  #technologies
  - Express
  - TypeScript
  - Mongoose
  - Cors
  - Dotenv
  - Bcrypt
  - Eslint
  - Prettier
  - Zod
  
  # Api End points :
  -Create new User:
  - post/api/users
  - req :
  {
    "user":{
  "userId": 2,
  "username": "sophie_miller",
  "password": "sophie_pass789",
  "fullName": {
    "firstName": "sophie",
    "lastName": "Miller"
  },
  "age": 26,
  "email": "sophie.miller@example.com",
  "isActive": true,
  "hobbies": ["Painting", "Hiking"],
  "address": {
    "street": "456 Canvas Lane",
    "city": "Artistic Town",
    "country": "Countryland"
  },
  "isDeleted": false
}



}

- res :
  {
    "success": true,
    "massage": "user is created successfully",
    "data": {
        "userId": 2,
        "username": "sophie_miller",
        "fullName": {
            "firstName": "sophie",
            "lastName": "Miller"
        },
        "age": 26,
        "email": "sophie.miller@example.com",
        "isActive": true,
        "hobbies": [
            "Painting",
            "Hiking"
        ],
        "address": {
            "street": "456 Canvas Lane",
            "city": "Artistic Town",
            "country": "Countryland"
        },
        "__v": 0
    }
}

- Get All Users :
- get/api/users
  {
    "success": true,
    "massage": "users are retrive successfully",
    "data": [
        {
            "username": "sophie_miller",
            "fullName": {
                "firstName": "sophie",
                "lastName": "Miller"
            },
            "age": 26,
            "email": "sophie.miller@example.com",
            "address": {
                "street": "456 Canvas Lane",
                "city": "Artistic Town",
                "country": "Countryland"
            }
        },
        {
            "username": "sophie_miller",
            "fullName": {
                "firstName": "sophie",
                "lastName": "Miller"
            },
            "age": 26,
            "email": "sophie.miller@example.com",
            "address": {
                "street": "456 Canvas Lane",
                "city": "Artistic Town",
                "country": "Countryland"
            }
        }
    ]

}

-Get Single User By userId :
- get/api/users/:userId

{
    "success": true,
    "message": "User fetched successfully",
    "data": {
        "userId": 8,
        "username": "sophie_miller",
        "fullName": {
            "firstName": "sophie",
            "lastName": "Miller"
        },
        "age": 26,
        "email": "sophie.miller@example.com",
        "isActive": true,
        "hobbies": [
            "Painting",
            "Hiking"
        ],
        "address": {
            "street": "456 Canvas Lane",
            "city": "Artistic Town",
            "country": "Countryland"
        }
    }
}

-Update Single User By userId :
- put/api/users/:userId

{
    "success": true,
    "message": "User updated successfully!",
    "data": {
        "userId": 8,
        "username": "sophie_miller",
        "fullName": {
            "firstName": "sophie",
            "lastName": "Miller"
        },
        "age": 26,
        "email": "sophie.miller@example.com",
        "isActive": true,
        "hobbies": [
            "Painting",
            "Hiking"
        ],
        "address": {
            "street": "456 Canvas Lane",
            "city": "Artistic Town",
            "country": "Countryland"
        }
    }
}

-Delete User with userId :
- delete/api/users/:userId

{
    "success": true,
    "message": "User deleted successfully!",
    "data": null
}

  ##vercel deploy link : https://assignment-2-weld.vercel.app/

