<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`"
      :thumb="item.goods_small_logo || defaultPic" v-for="item in goods" :key="item.goods_id"
      :price="item.goods_price | toFixed" :title="item.goods_name" />

  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        querData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: 0,
        isLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },

    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const {
          goods,
          total
        } = await getGoodsList(this.querData)
        this.isLoading = false
        // console.log(res)
        this.goods = [...this.goods, ...goods]
        this.total = total
        cb && cb()
      }
    },

    onLoad({
      query
    }) {
      this.querData.query = query
      this.getGoodsList()
    },
    // 监听下拉事件
    onPullDownRefresh() {
      // console.log('刷新')
      this.querData = {
        query: this.querData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goods = []
      this.total = 0
      this.getGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },
    // 监听上拉事件

    onReachBottom() {
      if (this.querData.pagenum * this.querData.pagesize >= this.total) return toast('没有更多了')
      if (this.isLoading) return
      this.querData.pagenum++
      this.getGoodsList()
    }
  }
</script>

<style lang=" scss">

</style>
