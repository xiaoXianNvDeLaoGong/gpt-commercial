package com.warape.aimechanician.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.warape.aimechanician.entity.UserInfo;
import me.chanjar.weixin.common.bean.WxOAuth2UserInfo;
import me.chanjar.weixin.mp.bean.result.WxMpUser;

/**
 * <p>
 * 用户信息表 服务类
 * </p>
 *
 * @author warape
 * @since 2023-03-29 08:14:15
 */
public interface UserInfoService extends IService<UserInfo> {

  Long getOrCreateWechatUser (WxOAuth2UserInfo wxMpUser);
  Long getOrCreateWechatUser (WxMpUser wxMpUser);

  Long createUserByPhone (String phone,String password);

  Long createUserByEmail (String email, String password);

  UserInfo getByPhone (String phone);

  UserInfo getByEmail (String email);

  Long doSmsSignUp (String accountNum, String password, Integer type);
}
