package com.warape.aimechanician.handler.wechat;

import java.util.Map;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.warape.aimechanician.config.properties.MemberConfigProperties;
import com.warape.aimechanician.domain.SystemConstants.RedisKeyEnum;
import com.warape.aimechanician.entity.MemberCard;
import com.warape.aimechanician.entity.UserInfo;
import com.warape.aimechanician.service.ExchangeCardDetailService;
import com.warape.aimechanician.service.MemberCardService;
import com.warape.aimechanician.service.UserInfoService;
import com.warape.aimechanician.utils.RedissonUtils;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.builder.outxml.TextBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author <a href="https://github.com/binarywang">Binary Wang</a>
 */
@Component
public class LogHandler extends AbstractHandler {

  @Autowired
  private UserInfoService userInfoService;
  @Autowired
  private ExchangeCardDetailService exchangeCardDetailService;
  @Autowired
  private MemberCardService memberCardService;
  @Autowired
  private MemberConfigProperties memberConfigProperties;

  @Override
  public WxMpXmlOutMessage handle (WxMpXmlMessage wxMessage,
      Map<String, Object> context, WxMpService wxMpService,
      WxSessionManager sessionManager) {
    this.logger.info("\n接收到请求消息，内容：{}", JSONUtil.toJsonStr(wxMessage));

    // 领取ChatGPT次数:GeniusAi@gmail.com
    String content = wxMessage.getContent();
    if (StrUtil.contains(content, "领取ChatGPT次数")) {
      String[] split = content.split(":");
      if (split.length > 1) {
        String accountNum = split[1];
        UserInfo userInfo = userInfoService.getByEmail(accountNum);
        if (userInfo != null) {
          Long userId = userInfo.getId();
          String giveLockKey = RedisKeyEnum.WECHAT_GIVE_LOCK.getKey(userId);
          if (!RedissonUtils.tryLockBoolean(giveLockKey, 5, 10)) {
            return null;
          }
          TextBuilder textBuilder = WxMpXmlOutMessage.TEXT().fromUser(wxMessage.getToUser()).toUser(wxMessage.getFromUser());
          try {
            MemberCard memberCard = memberCardService.getByCardCode("mp_give01");
            if (exchangeCardDetailService.checkGive(userInfo, memberCard)) {
              return textBuilder.content("您今天已经领取过了哦~请明天再来叭。").build();
            }

            exchangeCardDetailService.exchange(userId, memberCard);
            logger.info("领取次数成功: 会员编码:{}", memberCard.getCardCode());
            Integer integer = memberConfigProperties.getRights().get(memberCard.getCardCode());
            return textBuilder.content(StrUtil.format("领取成功 次数:{} 天数:{}", integer, memberCard.getCardDay())).build();
          } finally {
            RedissonUtils.unlock(giveLockKey);
          }

        }
      }
    }
    return null;
  }

}
