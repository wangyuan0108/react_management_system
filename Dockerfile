FROM nginx:latest
ENV NGINX_CONF_PATH /etc/nginx
ENV NGINX_HTML_PATH /usr/share/nginx/html
ENV NGINX_SUB_CONF_PATH /etc/nginx/conf.d
RUN mkdir ${NGINX_HTML_PATH}/oms
ADD dist ${NGINX_HTML_PATH}/oms
ADD nginx/nginx.conf ${NGINX_CONF_PATH}
ADD nginx/default.conf ${NGINX_SUB_CONF_PATH}
#EXPOSE 8080
#ENTRYPOINT /usr/sbin/nginx