package com.warape.aimechanician.utils;

import java.nio.charset.StandardCharsets;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.symmetric.SymmetricAlgorithm;
import cn.hutool.crypto.symmetric.SymmetricCrypto;
import cn.hutool.extra.spring.SpringUtil;

/**
 * @author wanmingyu
 * @create 2023/4/9 3:39 下午
 */
public class CommonUtils {

  public static SymmetricCrypto inviteSymmetricCrypto () {

    String key = SpringUtil.getProperty("activity.invite-config.key");
    return new SymmetricCrypto(SymmetricAlgorithm.AES, key.getBytes(StandardCharsets.UTF_8));
  }

  public static String md5Salt (String password) {
    return SecureUtil.md5(password + "ai");
  }
}
