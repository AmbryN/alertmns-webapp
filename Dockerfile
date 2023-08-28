FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
