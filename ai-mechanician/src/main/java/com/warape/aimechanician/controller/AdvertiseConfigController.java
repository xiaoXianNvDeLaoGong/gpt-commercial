package com.warape.aimechanician.controller;

import java.util.List;

import com.warape.aimechanician.domain.ResponseResult;
import com.warape.aimechanician.domain.ResponseResultGenerator;
import com.warape.aimechanician.entity.AdvertiseConfig;
import com.warape.aimechanician.service.AdvertiseConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 广告配置表 前端控制器
 * </p>
 *
 * @author warape
 * @since 2023-04-22 02:12:30
 */
@Tag(name = "广告相关")
@RestController
@RequestMapping("/api/advertise")
public class AdvertiseConfigController {

  @Autowired
  private AdvertiseConfigService advertiseConfigService;

  @Operation(description = "广告列表")
  @GetMapping("/list")
  public ResponseResult<List<AdvertiseConfig>> list () {
    List<AdvertiseConfig> list = advertiseConfigService.list();
    return ResponseResultGenerator.success(list);
  }
}
