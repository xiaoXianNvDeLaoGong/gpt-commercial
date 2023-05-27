package com.warape.aimechanician.config;

import cn.dev33.satoken.SaManager;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author wanmingyu
 * @create 2023/4/2 10:50 下午
 */
@Configuration
public class MySaTokenConfig {

  @Bean
  public ApplicationRunner saTokenInit () {
    return args -> SaManager.getConfig();
  }

}
