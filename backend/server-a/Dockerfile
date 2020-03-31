# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# from Docker Hub.
# This line fetches the Node Docker image with tag "10"
FROM node:10


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
