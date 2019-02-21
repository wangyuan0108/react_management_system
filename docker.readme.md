## 开发环境
```
docker login -u admin -p \&UJM9ijn 192.168.85.9:8010
docker build -t 192.168.85.9:8010/docker-dev/oms:latest ./
docker push 192.168.85.9:8010/docker-dev/oms:latest

# 运行测试


docker run -d -p 8080:80 --name oms  -it \
 -v /var/log/nginx/:/var/log/nginx/
 192.168.85.9:8010/docker-dev/oms:latest
```

## 测试环境
```
docker login -u admin -p \&UJM9ijn 192.168.85.9:8011
docker build -t 192.168.85.9:8011/docker-dev/oms:latest ./
docker push 192.168.85.9:8011/docker-dev/oms:latest

# 运行测试


docker run -d -p 8080:80 --name oms  -it \
 -v /var/log/nginx/:/var/log/nginx/
 192.168.85.9:8011/docker-dev/oms:latest
```

## 灰度环境
```
docker login -u admin -p \&UJM9ijn 192.168.85.9:8011
docker build -t 192.168.85.9:8011/docker-dev/oms:latest ./
docker push 192.168.85.9:8011/docker-dev/oms:latest

# 运行测试


docker run -d -p 8080:80 --name oms  -it \
 -v /var/log/nginx/:/var/log/nginx/
 192.168.85.9:8011/docker-dev/oms:latest
```
## 生产环境
```
docker login -u admin -p \&UJM9ijn 192.168.85.9:8011
docker build -t 192.168.85.9:8011/docker-dev/oms:latest ./
docker push 192.168.85.9:8011/docker-dev/oms:latest

# 运行测试


docker run -d -p 8080:80 --name oms  -it \
 -v /var/log/nginx/:/var/log/nginx/
 192.168.85.9:8011/docker-dev/oms:latest
```