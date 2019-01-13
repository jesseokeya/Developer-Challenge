FROM node:alpine

# Create app directory
WORKDIR /developer-challenge

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start"]