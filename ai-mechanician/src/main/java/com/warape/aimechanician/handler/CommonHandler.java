package com.warape.aimechanician.handler;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.extra.mail.MailAccount;
import cn.hutool.extra.mail.MailUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.warape.aimechanician.config.properties.EmailConfigProperties;
import com.warape.aimechanician.domain.SystemConstants.RedisKeyEnum;
import com.warape.aimechanician.utils.SmsUtils;
import com.warape.aimechanician.utils.StringRedisUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/**
 * @author wanmingyu
 * @create 2023/4/17 14:22
 */
@Slf4j
@Component
public class CommonHandler {

  @Async("chat")
  public void sendCode (String code, String from, String type, Integer sendType) {

    String smsCodeKey = RedisKeyEnum.SMS_CODE.getKey(from, type);
    String smsCodeCountLimitKey = RedisKeyEnum.SMS_CODE_COUNT_LIMIT.getKey(from, type);
    try {
      if (sendType == 1) {
        EmailConfigProperties emailConfigProperties = SpringUtil.getBean(EmailConfigProperties.class);
        MailAccount account = new MailAccount();
        account.setHost(emailConfigProperties.getHost());
        account.setPort(emailConfigProperties.getPort());
        account.setAuth(emailConfigProperties.getAuth());
        account.setFrom(emailConfigProperties.getFrom());
        account.setUser(emailConfigProperties.getUser());
        account.setPass(emailConfigProperties.getPass());
        account.setSslEnable(true);
        MailUtil.send(account, CollUtil.newArrayList(from), "验证码", "您好,您的验证码为: " + code, false);
      } else if (sendType == 2) {
        SmsUtils.sendSms(code, from);
      } else {
        throw new RuntimeException("sendType无此类型");
      }

      StringRedisUtils.setForTimeMIN(smsCodeKey, code, 5);
      StringRedisUtils.setForTimeMIN(smsCodeCountLimitKey, code, 1);
    } catch (Exception e) {
      log.error("验证码发送异常", e);
      StringRedisUtils.delete(smsCodeKey);
      StringRedisUtils.delete(smsCodeCountLimitKey);
    }
  }


}
