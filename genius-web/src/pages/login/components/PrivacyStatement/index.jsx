/*
 * @Description:
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2023-04-08 10:06:25
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-04-09 11:09:12
 */
import React, { useState, forwardRef, useImperativeHandle } from "react";

import styles from "./index.module.less";
import { CloseOutlined } from "@ant-design/icons";
const PrivacyStatement = forwardRef((props, ref) => {
  const [pageState, setPageState] = useState(false);
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

  return (
    <>
      {pageState ? (
        <div className={styles.custom_dialog}>
          <div className="custom_dialog-warp">
            <div className="custom_dialog-head">
              <span className="title">隐私声明</span>
              <CloseOutlined
                onClick={hidePage}
                className="closeBtn"
                twoToneColor="#fff"
              ></CloseOutlined>
            </div>

            <div className="custom_dialog-content">
              <p>
                尊敬的用户，我们十分重视您的隐私保护，我们将严格按照法律法规的要求，采取必要措施，保护您提供给我们的个人信息。本隐私声明将帮助您了解我们如何收集、使用、共享和保护您的个人信息。
              </p>
              <p>1.信息的收集和使用</p>
              （1）当您访问我们的网站时，我们会收集您的IP地址、浏览器类型、语言、访问日期和时间等基本信息，以对网站流量进行统计和网站性能进行优化。
              <br />
              （2）当您注册或登录时，我们需要您提供一些必要的个人信息，如用户名、邮箱等。这些信息只用于网站内部的用户管理和数据统计，我们不会将这些信息分享给第三方。
              <br />
              （3）当您使用我们的服务时，我们会收集您的访问记录、搜索记录、购买记录等用于进行数据分析，以提高服务质量，但我们不会将这些信息用于商业营销。
              <br />
              （4）我们只会在法律法规允许的情况下，使用您的个人信息。
              <br />
              <p>
                2.信息的保护我们将采取符合业界标准的安全措施来保护您的个人信息。我们会使用各种安全技术和程序来保障您的个人信息不丢失、被泄露、被滥用、被篡改、被毁损和被盗用。
              </p>
              <p>
                3.信息的共享我们不会将您的个人信息出售给第三方。但在以下情况下，我们仍可能会将您的个人信息与合作伙伴共享：
              </p>
              （1）经过您的同意，我们可与合作伙伴共享您的个人信息；
              <br />
              （2）为了提供更好的服务，我们必须与第三方共享您的信息；
              <br />
              （3）在涉及司法调查、追究法律责任等情况下，我们可能会根据法律法规，向相关机构提供您的个人信息。
              <br />
              如有疑问或建议，请联系我们的客服。
              <br />
              本隐私声明自2023年1月1日起生效。
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
});

export default PrivacyStatement;
