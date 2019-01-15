# Developer-Challenge

Shopify Developer Internship Challenge - Summer 2019

**Live Site**: https://developer-intern-challenge.appspot.com/graphql <br/>

**Challenge**: https://docs.google.com/document/d/1J49NAOIoWYOumaoQCKopPfudWI_jsQWVKlXmw1f1r-4/edit?ts=5c2fd489 <br/>

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

## Running in Docker

```
docker-compose up --build
```

### Explanation
```
Give an example
```

## Deployment
Once travis-ci detects a change to the master branch a new build occurs which runs my unit, component and integration tests then the graphql application will be deployed to google's flexible app engine. which is built directly from the Dockerfile

## Built With

* [KoaJs](https://koajs.com) - The Server Framework
* [MongoDB](https://www.mongodb.com) - NoSQL Database
* [Apollo](https://www.apollographql.com) - Graphql Library

## Author

* **Jesse Okeya** - [website](http://jesseokeya.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
