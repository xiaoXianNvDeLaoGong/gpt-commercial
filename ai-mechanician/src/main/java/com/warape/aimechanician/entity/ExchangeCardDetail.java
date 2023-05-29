package com.warape.aimechanician.entity;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 兑换卡详情
 * </p>
 *
 * @author warape
 * @since 2023-04-05 04:51:24
 */
@Getter
@Setter
@TableName("exchange_card_detail")
public class ExchangeCardDetail extends BaseEntity {

  private static final long serialVersionUID = 1L;

  /**
   * 用户ID
   */
  @TableField("user_id")
  private Long userId;

  /**
   * 会员卡ID
   */
  @TableField("member_card_id")
  private Long memberCardId;

  @TableField("total_count")
  private Integer totalCount;

  @TableField("surplus_count")
  private Integer surplusCount;
  /**
   * 失效时间
   */
  @TableField("expires_time")
  private Date expiresTime;

  /**
   * 状态 1:已兑换 2:过期
   */
  @TableField("exchange_state")
  private Integer exchangeState;

}
