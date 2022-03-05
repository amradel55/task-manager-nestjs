FROM node:17.3.0


#create app directory, this is our container/in our image
WORKDIR /usr/src/docker-nest-sample


# Install app dependencies
# A wildcard is used to ensure both package.json AND
# package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm run migration:run

RUN npm install -g npm@8.5.3

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .



EXPOSE 8000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]