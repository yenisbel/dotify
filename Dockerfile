FROM node:10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ARG NODE_ENV=production
COPY package.json /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN npm run heroku-postbuild
CMD ["npm", "start"]