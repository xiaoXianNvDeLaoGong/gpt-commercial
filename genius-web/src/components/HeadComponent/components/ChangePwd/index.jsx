/*
 * @Description:
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2023-04-08 10:06:25
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-04-23 21:38:08
 */
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Input } from "antd";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import styles from "./index.module.less";
import { CloseOutlined } from "@ant-design/icons";
import UserAttestation from "@/pages/login/components/UserAttestation";
import { messageFn, removeCookie } from "@/utils";
import { sendSms } from "@/api/login";
import { updatePassword } from "@/api/user";
// import { getSessionStorage } from "@/utils";
const ChangePwd = forwardRef((props, ref) => {
  const history = useHistory();
  const [pageState, setPageState] = useState(false);
  // 手机号
  const [phoneNumber, setPhoneNumber] = useState("");
  // 密码
  const [password, setPassword] = useState("");
  // 短信验证码
  const [smsVerificationCode, setSmsVerificationCode] = useState("");

  // 验证码状态
  const [smsState, setSmsState] = useState(false);

  // 验证码倒计时
  const [countdownSmsTimer, setCountdownSmsTimer] = useState(60);

  const countdownSmsTimerRef = useRef(null);
  // 图片验证码
  const [imgVerificationCode, setImgVerificationCode] = useState("");

  const userAttestationRef = useRef(null);

  // 监听图片验证码变化后 调用短信发送
  useEffect(() => {
    if (imgVerificationCode) {
      getSmsCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgVerificationCode]);
  useImperativeHandle(ref, () => {
    return {
      getPage,
    };
  });

  /**
   * @description: 弹框展示
   * @return {*}
   * @author: jinglin.gao
   */
  const getPage = () => {
    setPageState(true);
  };

  /**
   * @description: 弹框隐藏
   * @return {*}
   * @author: jinglin.gao
   */

  const hidePage = () => {
    setPageState(false);
  };

  /**
   * @description: 校验人机操作
   * @return {*}
   * @author: jinglin.gao
   */
  const getVerificationCode = () => {
    if (!phoneNumber) {
      messageFn({
        type: "error",
        content: "请输入手机号",
      });

      return;
    }
    userAttestationRef.current.getPage();
  };

  /**
   * @description: 获取短信验证码
   * @return {*}
   * @author: jinglin.gao
   */
  const getSmsCode = async () => {
    try {
      let data = {
        sendAccount: phoneNumber,
        type: "1",
        sendType: 1,
      };
      let res = await sendSms(data);
      if (res.code === 200) {
        messageFn({
          type: "success",
          content: "验证码发送成功,请查收",
        });
        setSmsState(true);
        // 60S打倒计时
        countdownSmsTimerFn();
      } else {
        messageFn({
          type: "error",
          content: res.message,
        });
        setSmsState(false);
      }
      console.log(res, "11111");
    } catch (error) {
      console.log(error);
    }
  };

  // 倒计时开始
  const countdownSmsTimerFn = () => {
    if (countdownSmsTimerRef.current) {
      clearInterval(countdownSmsTimerRef.current);
    }
    let count = 60;
    countdownSmsTimerRef.current = setInterval(() => {
      count--;

      if (count <= 0) {
        setSmsState(false);
      }
      setCountdownSmsTimer(count);
    }, 1000);
  };

  const submit = async () => {
    if (!phoneNumber) {
      messageFn({
        type: "error",
        content: "请输入邮箱账号",
      });
      return;
    } else if (!imgVerificationCode) {
      messageFn({
        type: "error",
        content: "请输入图形验证码",
      });
      return;
    } else if (!smsVerificationCode) {
      messageFn({
        type: "error",
        content: "请输入短信验证码",
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
        type: 1,
        password: password,
        code: smsVerificationCode,
      };
      let res = await updatePassword(data);
      if (res.code === 200) {
        hidePage();
        history.replace("/");
        removeCookie("satoken");
        removeCookie("tokenName");
        removeCookie("tokenValue");
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

  return (
    <>
      {pageState ? (
        <div className={styles.custom_dialog}>
          <div className="custom_dialog-warp">
            <div className="custom_dialog-head">
              <span className="title">修改密码</span>
              <CloseOutlined
                onClick={hidePage}
                className="closeBtn"
                twoToneColor="#fff"
              ></CloseOutlined>
            </div>

            <div className="custom_dialog-content">
              <div className="content-item">
                <Input
                  maxLength={30}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="请输入邮箱账号"
                />
              </div>

              <div className="verification_code-item">
                <Input
                  maxLength={30}
                  minLength={6}
                  autoComplete="new-password"
                  value={smsVerificationCode}
                  onChange={(e) => setSmsVerificationCode(e.target.value)}
                  placeholder="请输入验证码"
                />
                {!smsState ? (
                  <span className="code-item" onClick={getVerificationCode}>
                    获取验证码
                  </span>
                ) : (
                  <span className="code-item">{countdownSmsTimer}s</span>
                )}
              </div>
              <div className="content-item">
                <Input.Password
                  autoComplete="new-password"
                  maxLength={30}
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入6~30位密码"
                />
              </div>

              <div className="vcerification_code-img-box">
                <div className="user_detail_bottom">
                  <div
                    onClick={_.debounce(submit, 500)}
                    className="submitBtnText"
                  >
                    确定
                  </div>
                </div>
              </div>
            </div>
          </div>

          <UserAttestation
            setImgVerificationCode={setImgVerificationCode}
            phoneNumber={phoneNumber}
            ref={userAttestationRef}
          ></UserAttestation>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default ChangePwd;
