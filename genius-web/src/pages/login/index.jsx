/*
 * @Description:
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2023-03-28 12:44:28
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-04-26 13:26:32
 */
import React, { useState, useRef, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./index.module.less";
import { messageFn } from "@/utils";
import { Input, Space } from "antd";
import logo from "../../../public/assets/imgs/logo.svg";
import {
  authorizationUrl,
  wechatTestLogin,
  checkToken,
  userLogin,
} from "@/api/login";
import QRCode from "qrcode.react";
import { setCookie, queryString, getCookie } from "@/utils";
import _ from "lodash";
import "./index.css";
import SharkBtn from "@/components/SharkBtn";
import wxLogo from "../../../public/assets/imgs/wx-logo.svg";
import phoneIcon from "../../../public/assets/imgs/phone.svg";
import UserAgreement from "./components/UserAgreement";
import PrivacyStatement from "./components/PrivacyStatement";
import UserRegister from "./components/UserRegister";
import ChangePwd from "@/components/HeadComponent/components/ChangePwd";
const Login = ({ history }) => {
  const [resultUrl, setResult] = useState("");
  const [wxCode, setWxCode] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // 用户协议 与 隐私声明
  const userAgreementRef = useRef(null);
  const privacyStatementRef = useRef(null);
  // 拉新code
  const inviteCode = useRef("");

  // 用户注册
  const userRegisterRef = useRef(null);

  // 忘记密码
  const changePwdRef = useRef(null);

  // 登录类型  wx or phone
  // 0 首页 1 wx  2账号密码
  const [loginType, setLoginType] = useState(0);
  // 页面加载完毕后 获取url中的拉新code
  useEffect(() => {
    let urlInviteCode = queryString("code");
    if (urlInviteCode) {
      inviteCode.current = urlInviteCode;
    }

    let tokenValue = getCookie("tokenValue");
    if (tokenValue) {
      checkTokenFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 获取微信授权
  const authorizationUrlFn = async () => {
    try {
      setLoginType(1);
      let res = await authorizationUrl();

      if (res.code === 200) {
        setResult(res.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description: 监听页面地址发生变化
   * @return {*}
   * @author: jinglin.gao
   */
  history.listen((path) => {
    console.log("路径变化", path);
  });

  /**
   * @description: 微信登录
   * @return {*}
   * @author: jinglin.gao
   */
  const wechatLoginFn = async () => {
    try {
      let data = {
        code: wxCode,
        inviteCode: inviteCode.current,
      };
      let res = await wechatTestLogin(data);

      if (res.code === 200) {
        const { result } = res;
        setCookie("tokenName", result.tokenName);
        setCookie("tokenValue", result.tokenValue);

        history.replace("/ai/home");
      }
      console.log(res, "222");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description: 用户协议
   * @param {*} e
   * @return {*}
   * @author: jinglin.gao
   */
  const userAgreementClick = () => {
    userAgreementRef.current.getPage();
  };

  const privacyStatementClick = () => {
    privacyStatementRef.current.getPage();
  };

  /**
   * @description: 手机验证码登录
   * @return {*}
   * @author: jinglin.gao
   */
  const accountLogin = () => {
    setLoginType(2);
  };

  /**
   * @description: 校验token是否过期
   * @return {*}
   * @author: jinglin.gao
   */

  const checkTokenFn = async () => {
    try {
      let res = await checkToken();
      if (res.code === 200) {
        history.replace("/ai/home");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // 用户注册
  const phoneRegister = () => {
    userRegisterRef.current.getPage();
  };

  /**
   * @description: 手机号登录
   * @return {*}
   * @author: jinglin.gao
   */
  const phoneLoginFn = async () => {
    if (!phoneNumber) {
      messageFn({
        type: "error",
        content: "请输入邮箱账号",
      });
      return;
    } else if (!password) {
      messageFn({
        type: "error",
        content: "请输入密码",
      });

      return;
    }
    try {
      let data = {
        accountNum: phoneNumber,
        password: password,
        type: 1,
        inviteCode: inviteCode.current,
      };
      let res = await userLogin(data);
      if (res.code === 200) {
        messageFn({
          type: "success",
          content: "验证成功",
        });

        setCookie("tokenName", "satoken");
        setCookie("tokenValue", res.result);

        history.replace("/ai/home");

        // setSessionStorage("userInfo", res.result);
      } else {
        messageFn({
          type: "error",
          content: res.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description: 忘记密码
   * @return {*}
   * @author: jinglin.gao
   */
  const forgotPassword = () => {
    changePwdRef.current.getPage();
  };

  return (
    <div className={styles.loginWarp}>
      <div
        className={`login-content ${loginType !== 0 ? "loginBoxRotaateY" : ""}`}
      >
        <div className="loginBox">
          <img className="logo" src={logo} alt="" />
          <div className="login_content_webName">Genius AI</div>
          <h1 className="title">科技改变生活</h1>

          <div className="login_method-box">
            {/* <SharkBtn
              onClick={authorizationUrlFn}
              icon={wxLogo}
              name={"扫码登录"}
            ></SharkBtn> */}

            <SharkBtn
              onClick={accountLogin}
              icon={phoneIcon}
              name={"账号密码登录"}
            ></SharkBtn>
          </div>

          <div className="userAgreementInfoBox">
            <p className="info_item" onClick={userAgreementClick}>
              用户协议
            </p>
            <p className="info_item" onClick={privacyStatementClick}>
              隐私声明
            </p>
          </div>
        </div>

        <div className="typeLoginBox">
          {/* 微信扫码登录 */}

          {loginType === 1 ? (
            <div className="wxLoginBox">
              <h1 className="title">微信扫码登录</h1>
              {resultUrl ? (
                <QRCode
                  id="qrCode"
                  value={resultUrl}
                  size={200} // 二维码的大小
                  fgColor="#000000" // 二维码的颜色
                />
              ) : (
                ""
              )}
            </div>
          ) : loginType === 2 ? (
            // 账号密码登录
            <div className="phoneLogin">
              <div className="phone_login-warp">
                <div className="title">账号密码登录</div>
                <div className="content-box">
                  <Space direction="vertical">
                    <Input
                      maxLength={30}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="请输入邮箱账号"
                    />
                    <Input.Password
                      maxLength={30}
                      minLength={6}
                      placeholder="请输入密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Space>

                  <div
                    className="submitBtnText"
                    onClick={_.debounce(phoneLoginFn, 500)}
                  >
                    登录
                  </div>
                  <div className="tools_btns">
                    <span onClick={phoneRegister} className="btns-item">
                      邮箱注册
                    </span>
                    <span onClick={forgotPassword} className="btns-item">
                      忘记密码
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* <h1 className="title">内测模式</h1>
          <div className="testContent">
            内测期间，我们为您提供免费服务。如果您有任何意见或建议，欢迎在右上角的反馈中告诉我们。
            内测期间账号共用，为了避免尴尬，请大家注意敏感词语 。
          </div>

          <div
            className="submitBtnText"
            style={{ width: "100px" }}
            onClick={_.debounce(wechatLoginFn, 500)}
          >
            登录
          </div> */}
        </div>
      </div>

      {/* 用户协议 */}
      <UserAgreement ref={userAgreementRef}></UserAgreement>

      {/* 隐私声明 */}

      <PrivacyStatement ref={privacyStatementRef}></PrivacyStatement>

      {/* 用户注册 */}
      <UserRegister ref={userRegisterRef}></UserRegister>

      {/* 忘记密码 */}
      <ChangePwd ref={changePwdRef}></ChangePwd>
    </div>
  );
};

export default Login;
