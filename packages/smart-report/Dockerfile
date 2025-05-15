FROM hub.smartsteps.com/public/openresty:latest
# RUN mkdir -p /usr/local/bin/scripts
WORKDIR /usr/local/openresty/nginx/html
COPY ./build .
# COPY ./openresty.conf /etc/nginx/conf.d/default.conf
# COPY ./startup.sh /usr/local/bin/scripts/
# RUN chmod +x /usr/local/bin/scripts/startup.sh
# 暴露 80 和 443 端口
EXPOSE 80 443

# 容器启动时执行的命令
CMD ["openresty", "-g", "daemon off;"]
