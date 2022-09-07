<template>
  <!-- 头部 -->
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>

    <!-- 轮播 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in 	banners" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="goGoodsDetial(item.goods_id)" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>

    <!-- 导航 -->
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view @click="goNav(item)" class="nav-item" v-for="(item, i) in navs" :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层 -->

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in foolrs" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image @click="goGoodsList(item.product_list[0].navigator_url)"
              :style="{width:item.product_list[0].image_width + 'rpx'}" :src="item.product_list[0].image_src"
              class="left-img"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2,i2) in item.product_list" v-if="i2 !== 0" :key='i2'>
              <image @click="goGoodsList(item2.navigator_url)" class="image-item"
                :style="{width:item2.image_width + 'rpx'}" :src='item2.image_src'></image>
            </view>
          </view>
        </view>

      </view>
    </view>



  </view>
</template>

<script>
  import {
    getBanners,
    getNavs,
    getfloors
  } from '@/api/home.js'
  export default {
    data() {
      return {
        banners: [],
        navs: [],
        foolrs: []
      };
    },
    methods: {
      // 轮播数据
      // 获取轮播
      async getBanners() {
        const res = await getBanners()
        // console.log(res)
        this.banners = res
      },
      // 轮播跳转
      goGoodsDetial(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id=' + id
        })
      },
      // 导航
      async getNavs() {
        const res = await getNavs()
        this.navs = res
      },
      // 导航跳转
      goNav(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层
      async getfloors() {
        const res = await getfloors()
        this.foolrs = res
      },
      goGoodsList(url) {
        // console.log(url)
        // console.log(url.split('?')[1])
        uni.navigateTo({
          url: '/subpkg/goodsList/goodsList?' + url.split('?')[1]
        })
      }
    },
    onLoad() {
      this.getBanners()
      this.getNavs()
      this.getfloors()
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 175rpx;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .search_btn {
      width: 500rpx;
      height: 70rpx;
      margin-top: 84rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }



  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }


  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image-item {
      height: 192rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
