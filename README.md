# :smirk: gpt-commercial

> 本项目是一个商用版服务平台，基于Java语言实现服务端功能，前端使用React框架，底层使用官方的ChatGPT API。用户可以通过一键部署方便地使用本平台。除了支持chat对话模型外，还支持openai官方所有api，包括余额查询、模型检索、Completions chatgpt对话、Images 图片模型、模型自定义训练、文件上传自定义模型、微调、文本审核和敏感词鉴别，以及GPT 3.5、4.0和4.0-32k等功能。

## :raised_hands: 为何开源?
1. 补缺java语言的商业版ChatGPT
2. 加速创新,提高软件质量
3. 共同学习


## 功能
1. openai所有接口的对接
2. 超长token优化及网络速度优化
3. 支付宝当面付对接，可用来支付会员卡
4. 微信公众号对接，包括公众号关注监听，取关监听，地理位置监听，扫码事件监听，菜单监听
5. 登录方式： 微信授权登录/邮箱登录/短信登录(阿里云短信服务)
6. AI角色赋能
7. 会员卡功能
8. 反馈与建议
9. 后台管理仪表盘/用户信息/gpt配置/会员卡及权益配置/站点logo配置/网站名称配置....省略~




## C端 前端示例

> 公众号交互

<img src="https://github.com/apeto2/gpt-commercial/assets/131843341/73e87373-e707-4079-8a8e-8a3518450ef4?raw=true" alt="图片替换文本" width="200" height="450" align="bottom" />

>登录页面
![image](https://github.com/apeto2/gpt-commercial/assets/33257808/de03e629-cee3-4f1d-90cf-76a3bf435651)

> 旅游攻略

[![旅游攻略](http://be.apeto.cn/upload/image-qslc.png "Shiprock")](https://be.apeto.cn/archives/shang-ye-ban-chatgpt)

> 产品经理

[![产品经理](http://be.apeto.cn/upload/c%E7%AB%AF.png "Shiprock")](https://be.apeto.cn/archives/shang-ye-ban-chatgpt)
> 会员购买

[![会员购买](http://be.apeto.cn/upload/image-eksc.png "Shiprock")](https://be.apeto.cn/archives/shang-ye-ban-chatgpt)
> 个人信息

[![个人信息](http://be.apeto.cn/upload/image-qumb.png "Shiprock")](https://be.apeto.cn/archives/shang-ye-ban-chatgpt)


### B端前端示例

![image](https://github.com/apeto2/gpt-commercial/assets/33257808/5fce67db-ce55-4e3e-abce-7b82538d53f3)

![image](https://github.com/apeto2/gpt-commercial/assets/33257808/abaf110e-e964-4209-a58a-ed2d04d3eb03)

![image](https://github.com/apeto2/gpt-commercial/assets/33257808/ecdbdb6a-2e88-4f6f-95a1-1592e5f95537)

![image](https://github.com/apeto2/gpt-commercial/assets/33257808/a0fd2bd9-4810-4192-a436-77e9f229c39e)

![image](https://github.com/apeto2/gpt-commercial/assets/33257808/4b6c027e-c9a7-4a7f-868c-0a83dfb01d2c)

![image](https://github.com/apeto2/gpt-commercial/assets/33257808/0bddd712-911a-44af-82f2-033bd41e3a44)

## 集成框架

| 框架             |   版本   | 
|:---------------|:------:|
| springboot     | 2.7.0  | 
| redisson       | 3.17.0 | 
| mybatis-plus   | 3.5.2  | 
| IJPay          | 2.9.6  | 
| knife4j        | 4.1.0  | 
| sa-token       | 1.34.0 | 
| weixin-java-mp | 4.4.0  | 



## 模块说明

|   C 端页面源码    |  服务端     | B端后台管理页面源码 |
| :---        |    :----:   |:------:| 
|    [genius-web](genius-web)   |  [ai-mechanician](ai-mechanician)   |   [genius-admin](genius-admin)     |


## 部署教程

### 1.环境安装(新手建议宝塔安装)
1. mysql >=5.7
2. redis >=6
3. Nginx >=2.0

### 2.初始化SQL
将ai-mechanician/sql/ai-mechanician.sql导入到mysql中

### 3.页面部署
:link: https://be.apeto.cn/archives/ye-mian-bu-shu

### 4.服务端部署

#### 1.执行命令:
```shell
mkdir -p /www/wwwroot/docker/gpt-commercial/{config,logs} &&  cd /www/wwwroot/docker/gpt-commercial/config
```
#### 2.将配置文件application-dev.yaml放到当前目录下

#### 3.创建docker-compose.yaml
```yaml
version: '3'
services:
  gpt-commercial:
    container_name: gpt-commercial
    network_mode: "host"
    image: registry.cn-hangzhou.aliyuncs.com/warape/gpt-commercial:v1.3.1
    volumes:
      - /www/wwwroot/docker/gpt-commercial/config:/home/spring/config  #config映射目录
      - /www/wwwroot/docker/gpt-commercial/logs:/home/spring/logs     #logs映射目录
    environment:
      - JAVA_OPTS=-Xmx1024m -Djava.awt.headless=true -XX:+HeapDumpOnOutOfMemoryError -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -Xloggc:/home/spring/logs/gc.log -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9876 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Dlogging.file.path=/home/spring/logs -Duser.timezone=Asia/Shanghai -Dfile.encoding=UTF-8
      - SPRING_PROFILES_ACTIVE=dev # 环境变量 默认dev 可手动修改
      - SPRING_CONFIG_LOCATION=file:/home/spring/config/
      - SERVER_PORT=8080 # 端口号 如果冲突可修改 修改后要和Nginx的反向代理做适配 
```

#### 4.启动docker
```shell
docker-compose  -f docker-compose.yaml up -d
```
#### 5.查看日志
```shell
docker-compose -f docker-compose.yaml logs
```

## 前端项目说明
:link: https://www.gaojinglin.vip/archives/genius-web%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E8%AF%B4%E6%98%8E



## 💬 加入我们

### ⭐️ 不要吝啬你的star 会持续更新 为了方便找到此项目 可以点一下小星星

|  GPT商业版开源讨论群    | 作者微信 如果二维码过期请加我好友 |
| :---        |    :----:  |
|  <img src="https://github.com/apeto2/gpt-commercial/assets/131843341/6d0115e2-0d26-4609-b279-f4e3af3d8eca?raw=true" alt="图片替换文本" width="200" height="250" align="bottom" />     |  <img src="https://github.com/apeto2/gpt-commercial/assets/131843341/b6a8b5e2-4448-4e03-9335-9252eb55467b" alt="图片替换文本" width="210" height="250" align="bottom" />     | 



## :100: 以下为plus收费版

> 如果以上开源代码不满足你的要求,可以看一下我们的收费版本 一次购买 持续更新 随着功能的完善后面会涨价哦~ 现在还是优惠阶段
> 现在卖源码的泛滥，有些直接发你源码。不管你是否有部署能力，也没有售后和运营帮助。更没有持续更新。但我们不一样~~~

1. 私有化部署AI并且永久免费持续更新

2. VIP会员群，答疑解惑，分享成功案例

3. 一个月1次行业整合线上分享会，讨论AI行业方向，提高知识面和生产力

4. 一个月1次技术线上分享会，讨论行业最新技术

## :link: 演示地址 https://chat.apeto.cn

## :link: 后台管理演示地址:  http://chatadmin1.warape.top/  
账号: admin  密码: 111222

## :link: 说明文档 https://be.apeto.cn/archives/shang-ye-ban-chatgpt
> 项目快到飞起~可自行体验

