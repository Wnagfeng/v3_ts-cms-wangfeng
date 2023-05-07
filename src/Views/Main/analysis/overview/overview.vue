<template>
  <div class="wrapper">
    <div class="overview">
      <h1 class="title">我们的管理团队</h1>
      <div class="topimg">
        <img src="@/assets/analysis/img/top.jpg" alt="" />
      </div>

      <div class="list">
        <ul>
          <li class="poperlist">
            <div class="inner">
              <div class="cover">
                <img src="@/assets/analysis/img/lei.jpg" alt="" />
              </div>
              <div class="info">
                <span class="name"> 雷军 </span>
                <span class="position">创始人、董事长兼CEO</span>
                <span class="bord"></span>
                <span class="poperinfo">
                  雷军，出生于1969年12月，于1991年7月取得武汉大学计算机科学学士学位。现任小米集团执行董事、创始人、董事长及首席执行官。雷军全面负责本集团策略、公司文化及关键产品，并监管高级管理团队。
                </span>
                <span class="poperinfo">
                  雷军是中国知名的科技创业者，于1992年加入金山软件有限公司，并担任金山软件多个高级职位，包括自2011年7月起担任董事长，自2008年8月起担任非执行董事，自1998年至2007年12月担任首席执行官。
                  自2011年12月起，雷军担任北京金山办公软件股份有限公司董事。自2015年4月起，雷军担任金山云控股有限公司董事长。
                </span>
                <span class="poperinfo">
                  雷军在2000年创办了卓越网，2004年出售给亚马逊。同时，雷军曾作为天使投资人，投资了YY、UC等多家创新型企业。
                </span>
              </div>
            </div>
          </li>

          <li class="poperlist">
            <div class="inner">
              <div class="info">
                <span class="name"> 林斌</span>
                <span class="position">联合创始人、副董事长</span>
                <span class="bord"></span>
                <span class="poperinfo">
                  林斌，出生于1968年2月，于1990年7月取得中山大学无线电电子工程学士学位，再于1992年6月取得Drexel
                  University理学硕士学位。现任小米集团执行董事、联合创始人、副董事长。小米香港基金会理事长
                </span>
                <span class="poperinfo">
                  林斌于2010年和雷军一起共同创办公司，出任公司总裁直至2019年，之后出任副董事长。在公司创立早期，林斌负责公司的招聘、人事、行政、法务、财务等日常运营工作，同时负责核心供应商战略合作，以及包括印度印尼等国际业务拓展。后期林斌还负责国内市场销售、售后服务、以及公司的手机业务。
                </span>
                <span class="poperinfo">
                  加入本集团之前，曾于2006年至2010年在谷歌公司出任工程总监，于1995年至2006年在微软公司任职，历任微软公司的软件设计工程师、软件设计工程师主管、软件设计工程经理、工程总监等职位。在此之前，林斌自1993年5月起担任ADP公司网络工程师
                </span>
              </div>
              <div class="cover">
                <img src="@/assets/analysis/img/lb.jpg" alt="" />
              </div>
            </div>
          </li>

          <li class="poperlist">
            <div class="inner">
              <div class="cover">
                <img src="@/assets/analysis/img/wf.jpg" alt="" />
              </div>
              <div class="info">
                <span class="name"> 汪枫 </span>
                <span class="position">副董事长、小米科技人事管理</span>
                <span class="bord"></span>
                <span class="poperinfo">
                  汪枫，出生于1975年9月，于1998年取得清华大学化学学士学位，再于2009年取得长江商学院高级工商管理硕士学位。现任小米集团合伙人、集团总裁、并兼任国际业务部总裁，分管手机部、生态链部、大家电部、中国区、印度区。
                </span>
                <span class="poperinfo">
                  汪枫于2019年加入本集团，先后负责中国区及国际部的销售管理工作，以及Redmi品牌的打造，产品规划、生产、销售和营销。依靠多年对市场的经验和判断，带领团队梳理战略目标，明确业务方向，取得了优异的成绩
                </span>
                <span class="poperinfo">
                  加入本集团之前，曾于2017年6月至2018年12月担任深圳市诚壹科技有限公司创始人兼CEO。2010年4月至2017年6月，卢伟冰担任深圳市金立通信设备有限公司总裁。此前，卢伟冰于2008年1月至2010年3月担任北京天宇朗通通信设备有限公司海外事业部总经理。1998年7月至2007年12月担任康佳通信科技有限公司销售总经理。
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="overview"></script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;

  .overview {
    margin-top: 10px;
    width: 1226px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    .title {
      text-align: center;
      margin-bottom: 20px;
      color: black;
      font-size: 30px;
      font-weight: 800;
    }
    .topimg {
      background-color: #fff;
      width: 100%;
      height: 450px;
      img {
        width: 100%;
      }
    }
    h2 {
      color: rgb(0, 0, 0);
      font-size: 50px;
    }
    .list {
      width: 845px;
      margin: 0 auto;
      padding-top: 2.5rem;
      .poperlist {
        margin-bottom: 2.5rem;
      }
      .inner {
        display: flex;
        justify-content: space-around;
        .cover {
          margin-top: -30px;
        }
        .info {
          width: 558px;
          .name {
            display: block;
            font-size: 28px;
            font-weight: 500;
            height: 38px;
          }
          .position {
            display: block;
            font-weight: 800;
            font-size: 20px;
            margin-bottom: 13px;
          }
          .bord {
            display: block;
            width: 100%;
            height: 2px;
            background-color: #ff6a00;
            margin-bottom: 12px;
          }
          .poperinfo {
            line-height: 18px;
            display: block;
            letter-spacing: 1px;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
}
</style>
