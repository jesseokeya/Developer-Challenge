# Developer-Challenge

Shopify Developer Internship Challenge - Summer 2019

**Live Site**: https://shopify-challenge-2019.appspot.com/graphql <br/>

**Challenge**: https://bit.ly/2RRrr26 <br/>

![](/images/design.png?raw=true)

![](/images/graphql.png?raw=true)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
node >=8.0.0 && <11.0.0
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
npm install
```

And

```
npm start
```

End with an example of getting some data out of the system or using it for a little demo

### Running in Docker

```
docker-compose up --build
```

## Explanation
Schema supports 2 user roles `merchant` and `customer`. `merchant` can create products which will be associated with an inventory and a store. The `customer` can only purchase items by adding it to his / her cart this will also decrement the inventory_count for the particular item purchased.

### Security
![](/images/secure.png?raw=true)
I created post endpoints `/api/login` and `/api/signup` to login and create a new user respespectively. when a user logs in a jwt token is generated and sent to the client with a 1 hour ttl. Without a valid jwt token you wont be a make queries or mutations to graphql. But i disabled that so it would be easier to test 🙂.

But to enable and test for security uncomment line 21 in middlewareService 

![](/images/authHeader.png?raw=true)

Send a post request to the `/api/login` endpoint to get a token and add the token to the `authorization` header for graphql

![](/images/postman.png?raw=true)

### Example


## Deployment
Once travis-ci detects a change to the master branch a new build occurs which runs my unit, component and integration tests then the graphql application will be deployed to google's flexible app engine. which is built directly from the Dockerfile

## Built With

* [KoaJs](https://koajs.com) - The Server Framework
* [MongoDB](https://www.mongodb.com) - NoSQL Database
* [Apollo](https://www.apollographql.com) - Graphql Library

## Author

* **Jesse Okeya** - [website](http://jesseokeya.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jesseokeya/Developer-Challenge/blob/master/LICENSE) file for details
