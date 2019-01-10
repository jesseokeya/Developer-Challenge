FROM node:10.12-alpine

# Create app directory
WORKDIR /developer-challenge

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start"]