<template>
	<div id="subapp"  style="height: 100%;">
		<drawer
			width="200px;"
			show.sync="false"
			show-mode="push"
			placement="left"
			:drawer-style="{'background-color':'#35495e', width: '200px'}">
			<view-box ref="viewBox">
				<div class="search-wrap">搜索</div>
				<div class="swipe-wrap">
					<swiper :list="swipeList" :show-desc-mask="false" :auto="true" :loop="true"></swiper>
				</div>
				<div class="main-menu">
					<grid :rows="4">
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-xx.png">
							<span slot="label">音乐新星</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-dq.png">
							<span slot="label">斗琴擂台</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-bs.png">
							<span slot="label">各地比赛</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-hx.png">
							<span slot="label">网络海选</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-hd.png">
							<span slot="label">音乐活动</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-mr.png">
							<span slot="label">名人专区</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-qh.png">
							<span slot="label">琴行教室</span>
						</grid-item>
						<grid-item >
							<img slot="icon" src="../../assets/greattone/main-pp.png">
							<span slot="label">乐器品牌</span>
						</grid-item>
					</grid>
				</div>
				<div class="mian-list">
					<tab :line-width="1" custom-bar-width="26px">
						<tab-item @on-item-click="mainMenuPicke" selected>
							<span >音乐广场</span>
							<img src="../../assets/greattone/sanjiao.png">
						</tab-item>
						<tab-item @on-item-click="mainMenuPicke">关注动态</tab-item>
						<tab-item @on-item-click="mainMenuPicke">热门动态</tab-item>
					</tab>
					<div v-transfer-dom>
						<popup class="" v-model="subGuang" position="top" height="60px" :show-mask="true"  :hide-on-blur="true" >
							<div class="position-vertical-demo">
								<checker
									selected-item-class="checker-item-selected">
									<checker-item value="全部动态" @on-item-click="onItemClick">全部动态</checker-item>
									<checker-item value="音乐新闻" @on-item-click="onItemClick">音乐新闻</checker-item>
									<checker-item value="原创新闻" @on-item-click="onItemClick">原创新闻</checker-item>
									<checker-item value="推荐帖"  @on-item-click="onItemClick">推荐帖</checker-item>
								</checker>
							</div>
						</popup>
					</div>
				</div>
				<!--<heads :tit="titleContent"></heads>-->
				<router-view></router-view>
			</view-box>
			<foot ></foot>
		</drawer>
	</div>
	<!--<router-view></router-view>-->
</template>

<script>
	import foot from '@/components/footer/footer.vue'
	import heads from '@/components/header/header.vue'
	//	import login from './components/login/login.vue'
	import { Drawer,ViewBox,Swiper,AjaxPlugin, Grid, GridItem,Tab,TabItem,TransferDom, Popup,Checker,CheckerItem } from 'vux'
	const url = 'http://m.greattone.net/e/appapi/';
	export default {
		name: 'subapp',
		created(){
			this.getSwipeList();
		},
		directives:{
			TransferDom
		},
		data(){
			return{
				msg:'好琴声',
				titleContent:'好琴声主页',
				swipeList:[],//主轮播图列表
				subGuang:false, //音乐广场列表下子列表显示
			}
		},
		components:{
			foot,heads, Drawer, ViewBox,Swiper,AjaxPlugin, Grid, GridItem,Tab,TabItem, Popup,Checker,CheckerItem
		},
		methods:{
			getSwipeList(){
				let params = new URLSearchParams();
				params.append('api','extend/getAdvList');
				params.append('classid',5);

				this.$http.post(url,params).then(res=>{
					let obj = {};
					let _this = this;
					if (res.data.err_msg == 'success'){
						res.data.data.forEach(function (item,index) {
							obj.url = item.url;
							obj.img = item.pic;
//							obj.title = item.title;
							_this.swipeList.push(obj)
						})
					}
				},res=>{

				}).catch(res=>{

				})
			},
			onItemClick (value) {
				console.log(value )
				if (!this.disabled) {
					this.showPopup = false
				}
			},
			mainMenuPicke(index){
				switch(index){
					case 0:this.subGuang = true;
						break;
					case 1:this.subGuang = true;
						break;
					case 2:this.subGuang = true;
						break;
				}
			}
		},

	}
</script>

<style lang="less">
	@import "../../../node_modules/vux/src/styles/variable.less";

	#subapp{
		background-color:#f2f2f5;
		.main-menu{
			background-color: #fff;
			margin-bottom: 10px;
		}

		.weui-grid__icon{
			width:40px;
			height: 40px;
		}
	    .weui-grids:before,.weui-grids:after{
		    border-color:#fff;
	    }
		.weui-grid:before,.weui-grid:after{
			border-color:#fff;
		}
		.weui-grid{
			padding:16px 2px 2px;
		}

	}

	.vux-popup-dialog{
		background-color: #fafafa!important;
	}
	
	.position-vertical-demo{
		.vux-checker-box{
			margin-top: 15px;
			display: flex;
		}
		.vux-checker-item{
			flex: auto;
			text-align: center;
			margin-right: 5px;
			margin-left: 5px;
			height: 30px;
			line-height:30px;
			border-radius: 3px;
			background-color: #F0F0F0;
			/*width:20%;*/
		}
	    .vux-checker-item.checker-item-selected{
		    background-color: @theme-color;
		    color: #fff;
	    }

	}
</style>
