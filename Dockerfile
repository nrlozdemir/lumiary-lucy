# base
FROM node:8.11.1 AS base
WORKDIR /application
COPY package*.json /application/

# developmentDependencies
FROM base AS developmentDependencies
WORKDIR /application
RUN npm install --loglevel=error

# development
FROM developmentDependencies AS development
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ARG PORT=9000
ENV PORT $PORT
COPY . /application/
COPY --from=developmentDependencies /application/node_modules /application/node_modules
WORKDIR /application
RUN npm rebuild node-sass
CMD [ "npm", "run", "local"]

# releaseDependencies
FROM base AS releaseDependencies
WORKDIR /application
RUN npm install --loglevel=error --only=production

# release
FROM node:8.11.1-alpine as release
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=8080
ENV PORT $PORT
COPY . /application
WORKDIR /application
COPY --from=releaseDependencies /application/node_modules /application/node_modules
# RUN npm install node-sass@latest
#RUN npm rebuild node-sass
CMD [ "npm", "run", "start" ]
EXPOSE 80
