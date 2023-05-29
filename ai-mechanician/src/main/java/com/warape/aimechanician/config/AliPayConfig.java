package com.warape.aimechanician.config;

import com.alipay.api.AlipayClient;
import com.ijpay.alipay.AliPayApiConfig;
import com.warape.aimechanician.config.properties.AliPayProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author wanmingyu
 * @create 2023/4/13 16:48
 */
@Configuration
public class AliPayConfig {

  @Autowired
  private AliPayProperties aliPayProperties;

  @Bean
  public AlipayClient aliPayApiConfig () {

    return AliPayApiConfig.builder()
        .setAppId(aliPayProperties.getAppId())
        .setAliPayPublicKey(aliPayProperties.getAliPublicKey())
        .setCharset("UTF-8")
        .setPrivateKey(aliPayProperties.getAppPrivateKey())
        .setServiceUrl(aliPayProperties.getServerUrl())
        .setSignType("RSA2")
        .build().getAliPayClient();
  }

}
