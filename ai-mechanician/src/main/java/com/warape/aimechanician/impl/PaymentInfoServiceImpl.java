package com.warape.aimechanician.impl;

import java.math.BigDecimal;
import java.util.Date;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.warape.aimechanician.domain.Constants.PayStateEnum;
import com.warape.aimechanician.entity.MemberCard;
import com.warape.aimechanician.entity.PaymentInfo;
import com.warape.aimechanician.mapper.PaymentInfoMapper;
import com.warape.aimechanician.service.ExchangeCardDetailService;
import com.warape.aimechanician.service.MemberCardService;
import com.warape.aimechanician.service.PaymentInfoService;
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
@Service
public class PaymentInfoServiceImpl extends ServiceImpl<PaymentInfoMapper, PaymentInfo> implements PaymentInfoService {

  @Autowired
  private MemberCardService memberCardService;
  @Autowired
  private ExchangeCardDetailService exchangeCardDetailService;

  @Override
  public PaymentInfo getByOrderNo (String orderNo) {
    LambdaQueryWrapper<PaymentInfo> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(PaymentInfo::getPaySn, orderNo);
    return baseMapper.selectOne(queryWrapper);
  }

  @Override
  @Transactional(rollbackFor = Exception.class)
  public void callbackHandler (BigDecimal payAmount, String outPaySn, String paySn, PayStateEnum sysPayStateEnum, Date payTime) {
    LambdaQueryWrapper<PaymentInfo> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(PaymentInfo::getPaySn, paySn);
    PaymentInfo paymentInfo = baseMapper.selectOne(queryWrapper);
    paymentInfo.setPayState(sysPayStateEnum.getState());
    paymentInfo.setPayTime(payTime);
    paymentInfo.setOutPaySn(outPaySn);
    if (!updateById(paymentInfo)) {
      throw new RuntimeException("修改订单状态失败:" + paySn);
    }
    MemberCard memberCard = memberCardService.getByCardCode(paymentInfo.getGoodsCode());
    exchangeCardDetailService.exchange(paymentInfo.getUserId(), memberCard);

  }
}
