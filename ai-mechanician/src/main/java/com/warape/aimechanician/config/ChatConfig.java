package com.warape.aimechanician.config;

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.Proxy.Type;
import java.util.List;
import java.util.concurrent.TimeUnit;

import cn.hutool.extra.spring.SpringUtil;
import com.unfbx.chatgpt.OpenAiStreamClient;
import com.unfbx.chatgpt.OpenAiStreamClient.Builder;
import com.unfbx.chatgpt.function.KeyRandomStrategy;
import com.unfbx.chatgpt.interceptor.OpenAILogger;
import com.warape.aimechanician.config.properties.ChatConfigProperties;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author wanmingyu
 * @create 2023/3/31 9:11 下午
 */
@Configuration
public class ChatConfig {

  @Autowired
  private ChatConfigProperties chatConfigProperties;


  @Bean
  public OpenAiStreamClient openAiStreamClient () {

    List<String> apiKeys = chatConfigProperties.getApiKeys();
    String apiHost = chatConfigProperties.getApiHost();
    HttpLoggingInterceptor httpLoggingInterceptor = new HttpLoggingInterceptor(new OpenAILogger());
    httpLoggingInterceptor.setLevel(HttpLoggingInterceptor.Level.HEADERS);
    OkHttpClient.Builder okHttpClientBuilder = new OkHttpClient.Builder()
        .addInterceptor(httpLoggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(600, TimeUnit.SECONDS)
        .readTimeout(600, TimeUnit.SECONDS);

    Builder builder = OpenAiStreamClient.builder().apiHost(apiHost).apiKey(apiKeys).keyStrategy(new KeyRandomStrategy());
    if (SpringUtil.getProperty("spring.profiles.active").equals("local")) {
      // 代理
      Proxy proxy = new Proxy(Type.HTTP, new InetSocketAddress("127.0.0.1", 7890));
      okHttpClientBuilder.proxy(proxy);
    }
    builder.okHttpClient(okHttpClientBuilder.build());
    return builder.build();
  }

}
