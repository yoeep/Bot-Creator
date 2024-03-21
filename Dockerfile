# 使用一个基础的 Nginx 镜像
FROM nginx:alpine

# 将 HTML 文件和配置文件复制到容器中
COPY ./* /usr/share/nginx/html/

# 暴露 Nginx 默认的 HTTP 端口
EXPOSE 80
