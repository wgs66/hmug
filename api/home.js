import fly from '@/utils/request.js'
// 轮播
export const getBanners = () => fly.get('/home/swiperdata')
// 导航
export const getNavs = () => fly.get('/home/catitems')
// 楼层
export const getfloors = () => fly.get('/home/floordata')
