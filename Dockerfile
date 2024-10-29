FROM hub.smartsteps.com/public/openresty:latest
WORKDIR /usr/share/nginx/html
COPY ./build .
