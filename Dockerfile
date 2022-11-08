FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:1.21.5-alpine

COPY ./build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]

