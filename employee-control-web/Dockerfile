# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.12.1 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest
COPY --from=build /app/dist/out/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build /app/compose/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t angular-boilerplate:prod .
# docker run -p 80:80 angular-boilerplate:prod
