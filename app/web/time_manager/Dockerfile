FROM node:latest as build

WORKDIR /app

COPY . ./

RUN npm install && npm run build


FROM nginx:alpine as production-build

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]