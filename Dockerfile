# 使用官方 Node.js 镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

RUN apt-get update && \
    apt-get install -y ffmpeg

# 复制当前目录下的所有文件到工作目录
COPY . .

# 暴露应用程序端口
EXPOSE 3000

# 启动应用程序 
CMD ["node", "app.js"]
