/*
 * @Description: 
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2023-04-02 10:33:59
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-04-13 12:34:31
 */
import request from "@/request/index.js";
export function authorizationUrl() {
    return request({
        url: "/api/wechat/authorizationUrl",
        method: "get",
    });
}

export function wechatLogin(data) {
    return request({
        url: "/api/wechat/wechatLogin",
        method: "post",
        data
    });
}
export function wechatTestLogin(data) {
    return request({
        url: "/api/test/wechatLogin",
        method: "post",
        data
    });
}

// 退出登录
export function logout() {
    return request({
        url: "/api/user/logout",
        method: "post",
    });
}
// 校验token是否过期
export function checkToken() {
    return request({
        url: "/api/user/checkToken",
        method: "get",
    });
}

// 图片验证码
export function imageVerificationCode(params) {
    return request({
        url: "/api/user/imageVerificationCode",
        method: "get",
        params,
        responseType: 'blob',
    });
}


// 发送短信
export function sendSms(data) {
    return request({
        url: "/api/user/sendSms",
        method: "put",
        data,
    });
}

// 用户注册

export function smsSignUp(data) {
    return request({
        url: "/api/user/smsSignUp",
        method: "put",
        data,
    });
}

// 账号密码登录
export function userLogin(data) {
    return request({
        url: "/api/user/login",
        method: "post",
        data,
    });
}