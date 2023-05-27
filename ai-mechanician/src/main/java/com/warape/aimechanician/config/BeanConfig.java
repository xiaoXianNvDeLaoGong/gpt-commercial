package com.warape.aimechanician.config;

import cn.hutool.extra.spring.SpringUtil;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author wanmingyu
 * @create 2023/3/27 11:24
 */
@Configuration
public class BeanConfig {

  @Bean
  public SpringUtil springUtil () {
    return new SpringUtil();
  }

  @Bean
  public ConfigurableServletWebServerFactory webServerFactory() {
    TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
    factory.addConnectorCustomizers(connector -> connector.setProperty("relaxedQueryChars", "|{}[]\\"));
    return factory;
  }
}
