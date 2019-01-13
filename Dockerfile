FROM node:alpine

# Create app directory
WORKDIR /developer-challenge

# Install app dependencies
COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
        [ your npm dependencies here ] \
    && apk del .gyp

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start"]