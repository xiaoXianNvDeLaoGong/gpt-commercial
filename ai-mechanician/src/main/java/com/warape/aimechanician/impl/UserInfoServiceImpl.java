package com.warape.aimechanician.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.warape.aimechanician.domain.CommonRespCode;
import com.warape.aimechanician.domain.Constants.ResponseEnum;
import com.warape.aimechanician.entity.MemberCard;
import com.warape.aimechanician.entity.UserInfo;
import com.warape.aimechanician.entity.WechatUserInfo;
import com.warape.aimechanician.exception.ServiceException;
import com.warape.aimechanician.mapper.UserInfoMapper;
import com.warape.aimechanician.service.ExchangeCardDetailService;
import com.warape.aimechanician.service.MemberCardService;
import com.warape.aimechanician.service.UserInfoService;
import com.warape.aimechanician.service.WechatUserInfoService;
import com.warape.aimechanician.utils.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.bean.WxOAuth2UserInfo;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 用户信息表 服务实现类
 * </p>
 *
 * @author warape
 * @since 2023-03-29 08:14:15
 */
@Slf4j
@Service
public class UserInfoServiceImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {

  @Autowired
  private WechatUserInfoService wechatUserInfoService;
  @Autowired
  private ExchangeCardDetailService exchangeCardDetailService;
  @Autowired
  private MemberCardService memberCardService;

  @Override
  @Transactional(rollbackFor = Exception.class)
  public Long getOrCreateWechatUser (WxOAuth2UserInfo wxMpUser) {

    WechatUserInfo wechatUserInfo = wechatUserInfoService.getByOpenId(wxMpUser.getOpenid());

    if (wechatUserInfo != null) {
      return wechatUserInfo.getUserId();
    }

    UserInfo entity = new UserInfo();
    if (!save(entity)) {
      throw new RuntimeException("保存UserInfo失败");
    }
    wechatUserInfo = new WechatUserInfo();
    wechatUserInfo.setUserId(entity.getId());
    wechatUserInfo.setOpenId(wxMpUser.getOpenid());
    wechatUserInfo.setUnionId(wxMpUser.getUnionId());
    wechatUserInfo.setNickName(wxMpUser.getNickname());
    wechatUserInfo.setCity(wxMpUser.getCity());
    wechatUserInfo.setProvince(wxMpUser.getProvince());
    wechatUserInfo.setCountry(wxMpUser.getCountry());
    wechatUserInfo.setHeadImgUrl(wxMpUser.getHeadImgUrl());
    wechatUserInfo.setSex(wxMpUser.getSex());
    wechatUserInfo.setSnapshotUser(wxMpUser.getSnapshotUser());
    if (!wechatUserInfoService.save(wechatUserInfo)) {
      throw new RuntimeException("保存WechatUserInfo失败");
    }
    return entity.getId();
  }

  @Override
  public Long getOrCreateWechatUser (WxMpUser wxMpUser) {
    WechatUserInfo wechatUserInfo = wechatUserInfoService.getByOpenId(wxMpUser.getOpenId());

    if (wechatUserInfo != null) {
      return wechatUserInfo.getUserId();
    }

    UserInfo entity = new UserInfo();
    if (!save(entity)) {
      throw new RuntimeException("保存UserInfo失败");
    }
    wechatUserInfo = new WechatUserInfo();
    wechatUserInfo.setUserId(entity.getId());
    wechatUserInfo.setOpenId(wxMpUser.getOpenId());
    wechatUserInfo.setUnionId(wxMpUser.getUnionId());
    if (!wechatUserInfoService.save(wechatUserInfo)) {
      throw new RuntimeException("保存WechatUserInfo失败");
    }

    return entity.getId();
  }


  @Override
  public Long createUserByPhone (String phone, String password) {

    UserInfo userInfo = getByPhone(phone);
    if (userInfo != null) {
      throw new ServiceException(ResponseEnum.PHONE_EXIST);
    }
    UserInfo entity = new UserInfo();
    entity.setPhone(phone);
    entity.setUserPassword(password);

    if (!save(entity)) {
      throw new RuntimeException("保存UserInfo失败");
    }

    return entity.getId();
  }

  @Override
  public Long createUserByEmail (String email, String password) {

    UserInfo userInfo = getByEmail(email);
    if (userInfo != null) {
      throw new ServiceException(ResponseEnum.PHONE_EXIST);
    }
    UserInfo entity = new UserInfo();
    entity.setEmail(email);
    entity.setUserPassword(password);

    if (!save(entity)) {
      throw new RuntimeException("保存UserInfo失败");
    }

    return entity.getId();
  }

  @Override
  public UserInfo getByPhone (String phone) {
    LambdaQueryWrapper<UserInfo> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(UserInfo::getPhone, phone);
    return baseMapper.selectOne(queryWrapper);
  }

  @Override
  public UserInfo getByEmail (String email) {
    LambdaQueryWrapper<UserInfo> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(UserInfo::getEmail, email);
    return baseMapper.selectOne(queryWrapper);
  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public Long doSmsSignUp (String accountNum, String password, Integer type) {
    Long userId;
    String md5SaltPass = CommonUtils.md5Salt(password);
    if (type == 1) {
      userId = createUserByEmail(accountNum, md5SaltPass);
    } else if (type == 2) {

      userId = createUserByPhone(accountNum, md5SaltPass);

    } else {
      throw new ServiceException(CommonRespCode.VALID_SERVICE_ILLEGAL_ARGUMENT);
    }
    MemberCard memberCard = memberCardService.getByCardCode("register01");
    if (memberCard != null) {
      exchangeCardDetailService.exchange(userId, memberCard);
    } else {
      log.warn("没有注册有礼会员卡");
    }
    return userId;
  }
}
