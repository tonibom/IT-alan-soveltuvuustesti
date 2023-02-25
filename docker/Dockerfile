# Build environment (for setting up React)
FROM node:19-bullseye as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ../package.json ./
COPY ../package-lock.json ./
RUN npm install -g npm@9.4.1 --silent
RUN npm install --silent
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# Production environment (to run the server)
FROM ubuntu/apache2:2.4-22.04_beta
COPY --from=build /app/build /var/www/html
EXPOSE 80

