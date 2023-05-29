/*
 * @Description:
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2022-08-18 13:59:22
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-04-21 08:29:35
 */
import React, { useRef, useEffect, useState } from "react";
import logo from "../../../public/assets/imgs/logo.svg";
import { Layout } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./index.module.less";
import UserDetail from "./components/UserDetail";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "@/api/user";
import { userInfoAction } from "@/store/actions/home_action";
import { useDispatch } from "react-redux";
import Propose from "./components/Propose";
import InviteGiftUrlInfo from "@/components/InviteGiftUrlInfo";
import FreeQuestion from "./components/FreeQuestion";
import userDeafultImg from "../../../public/assets/imgs/userDeafultImg.svg";
import JoinGroup from "./components/JoinGroup";
const { Header } = Layout;

const HeadComponent = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetailRef = useRef(null);
  const proposeRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  const inviteGiftUrlInfoRef = useRef(null);
  const freeQuestionRef = useRef(null);
  const joinGroupRef = useRef(null);
  useEffect(() => {
    getUserInfoFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * @description: 获取用户详情
   * @return {*}
   * @author: jinglin.gao
   */
  const getUserDetail = () => {
    userDetailRef.current.getPage();
  };

  /**
   * @description: 获取用户信息
   * @return {*}
   * @author: jinglin.gao
   */

  const getUserInfoFn = async () => {
    try {
      let res = await getUserInfo();
      if (res.code === 200) {
        let resData = res.result;
        setUserInfo(resData);
        dispatch(userInfoAction(resData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description: 购买vip
   * @return {*}
   * @author: jinglin.gao
   */
  const buyVip = () => {
    history.replace("/ai/commodity");
  };

  /**
   * @description: 反馈与建议
   * @return {*}
   * @author: jinglin.gao
   */
  const propose = () => {
    proposeRef.current.getPage();
  };

  /**
   * @description: 邀请返利
   * @return {*}
   * @author: jinglin.gao
   */

  const inviteUser = () => {
    inviteGiftUrlInfoRef.current.getPage();
  };

  /**
   * @description: 免费领取次数
   * @return {*}
   * @author: jinglin.gao
   */

  const freeQuestion = () => {
    freeQuestionRef.current.getPage();
  };

  /**
   * @description: 加群
   * @return {*}
   * @author: jinglin.gao
   */

  const joinGroup = () => {
    joinGroupRef.current.getPage();
  };
  return (
    <>
      <Header className={styles.header}>
        <div className="logoBox">
          <img className="logo" src={logo} alt="" />
          <p className="title">Genius</p>
        </div>

        <div className="userInfo">
          <div onClick={joinGroup} className="propose">
            加入我们
          </div>

          <div onClick={freeQuestion} className="freeQuestion">
            免费领取次数
          </div>

          <div onClick={buyVip} className="bug_vip">
            购买会员
          </div>
          <div onClick={inviteUser} className="inviteUser">
            邀请有礼
          </div>
          <div onClick={propose} className="propose">
            反馈与建议
          </div>

          {/* <Button size="small" shape="circle" icon={<BellOutlined />} /> */}

          <div className="user_info-box">
            <img
              className="user_avatar"
              src={userInfo?.headImgUrl || userDeafultImg}
              alt=""
            />
            <span onClick={getUserDetail} className="userName">
              {userInfo?.nikeName ||
                `游客 ${(Math.random() * 1000).toFixed(0)}`}
            </span>
          </div>
        </div>

        <div className="mobile_userInfo">
          <div className="mobile_userInfo-warp">
            <div onClick={joinGroup} className="propose">
              加群
            </div>

            <div onClick={freeQuestion} className="freeQuestion">
              领取
            </div>

            <div onClick={buyVip} className="bug_vip">
              购买
            </div>
            <div onClick={inviteUser} className="inviteUser">
              邀请
            </div>
            <div onClick={propose} className="propose">
              反馈
            </div>

            {/* <Button size="small" shape="circle" icon={<BellOutlined />} /> */}

            <div className="user_info-box">
              <img
                onClick={getUserDetail}
                className="user_avatar"
                src={userInfo?.headImgUrl || userDeafultImg}
                alt=""
              />
            </div>
          </div>
        </div>
      </Header>

      {/* 用户信息 */}
      <UserDetail ref={userDetailRef}></UserDetail>

      {/* 反馈与建议 */}
      <Propose ref={proposeRef}></Propose>

      {/* 邀请返利 */}
      <InviteGiftUrlInfo ref={inviteGiftUrlInfoRef}></InviteGiftUrlInfo>

      {/* 免费领取次数 */}
      <FreeQuestion ref={freeQuestionRef}></FreeQuestion>

      {/* 加入我们 */}
      <JoinGroup ref={joinGroupRef} />
    </>
  );
};

export default HeadComponent;
