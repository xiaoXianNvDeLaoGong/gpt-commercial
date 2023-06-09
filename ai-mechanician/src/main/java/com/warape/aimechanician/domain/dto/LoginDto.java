package com.warape.aimechanician.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @author wanmingyu
 * @create 2023/4/11 21:25
 */
@Data
public class LoginDto {

  @Schema(description = "账号")
  @NotBlank
  private String accountNum;

  @Schema(description = "类型 1: 邮箱 2: 手机号")
  @NotNull
  private Integer type = 1;

  @Schema(description = "密码")
  @NotBlank
  private String password;


}
