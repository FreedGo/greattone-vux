<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main">

			<div class="login-warp">

			</div>
			<div>
				<tab :line-width=2  v-model="index" custom-bar-width="50px">
					<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">
						{{item}}
					</tab-item>
				</tab>
				<swiper v-model="index" height="400px" :show-dots="false">
					<swiper-item  :key="0">
						<div class="tab-swiper vux-center">
							<form action="">
								<group>
									<x-input title="" placeholder="用户名6~16位英文字符及数字" required show-clear></x-input>
									<!--<popup-picker  :data="list1" v-model="areaNum" ></popup-picker >-->
									<flexbox :gutter="0" class="phone-warp">
										<flexbox-item span="110px">
											<popup-picker value-text-align="center" class="area-num-picker" :data="list1" v-model="areaNum" ></popup-picker >
										</flexbox-item>
										<flexbox-item >
											<x-input class="weui-vcode" placeholder="手机号"></x-input>
										</flexbox-item>
									</flexbox>
									<x-input class="weui-vcode" placeholder="请输入验证码">
										<x-button slot="right" type="primary" mini>发送验证码</x-button>
									</x-input>
									<x-input type="password" title="" placeholder="密码6~16位英文，符号喝数字" required show-clear></x-input>
									<x-input type="password" title="" placeholder="确认密码" required show-clear></x-input>
									<x-input type="hidden" title="" placeholder="确认密码" required show-clear></x-input>
									<check-icon :value.sync="agree">我已阅读 <router-link to="/agreement/index">《注册协议》</router-link></check-icon>
									<br>
									<br>
									<x-button type="primary">注册</x-button>
								</group>
							</form>
						</div>
					</swiper-item>
					<swiper-item  :key="1">
						<div class="tab-swiper vux-center">
							<form action="">
								<group>
									<flexbox :gutter="0" >
										<flexbox-item span="110px">
											<popup-picker value-text-align="center" class="area-num-picker" :data="list1" v-model="areaNum" ></popup-picker >
										</flexbox-item>
										<flexbox-item >
											<x-input class="weui-vcode" placeholder="手机号"></x-input>
										</flexbox-item>
									</flexbox>
									<x-input class="weui-vcode" placeholder="请输入验证码">
										<x-button slot="right" type="primary" mini>发送验证码</x-button>
									</x-input>
									<x-input type="hidden" title="" placeholder="确认密码" required show-clear></x-input>
									<check-icon :value.sync="agree">我已阅读 <router-link to="/agreement/index">《注册协议》</router-link></check-icon>
									<br>
									<br>
									<x-button type="primary">注册</x-button>
								</group>
							</form>
						</div>
					</swiper-item>
				</swiper>
			</div>
		</div>
	</div>
</template>
<script>
	//	import foot from './components/footer/footer.vue'
	import heads from '../header/header.vue'
	import {XInput, Group,PopupPicker ,Picker,XButton, Flexbox, FlexboxItem, Divider,XSwitch,CheckIcon  } from 'vux'
	import {Tab, TabItem, Sticky, Swiper, SwiperItem} from 'vux'

	const list = ['注册', '手机快捷注册']
	export default {
		name      : 'subapp',
		data(){
			return {
				msg         : '登录',
				titleContent: '注册',
				list2       : list,
				demo2       : '美食',
				index       : 0,
				areaNum     : ['大陆+86'],
				agree       : false,//是否同意注册协议
				list1: [['大陆+86', '台湾+886','香港+852','澳门+853', '新加坡+65', '美国+1']],
				getBarWidth : function (index) {
					return (index + 1) * 22 + 'px'
				}
			}
		},
		components: {
			heads,
			XInput,
			Group,
			XButton,
			Flexbox,
			FlexboxItem,
			Divider,
			PopupPicker ,
			Picker,
			Tab,
			TabItem,
			Sticky,
			Swiper,
			SwiperItem,
			XSwitch,
			CheckIcon
		},
		methods   : {
			onItemClick (index) {
				console.log('on item click:', index)
			},
			addTab () {
				if (this.list2.length < 5) {
					this.list2 = list().slice(0, this.list2.length + 1)
				}
			},
			removeTab () {
				if (this.list2.length > 1) {
					this.list2 = list().slice(0, this.list2.length - 1)
				}
			},
			next () {
				if (this.index === this.list2.length - 1) {
					this.index = 0
				} else {
					++this.index
				}
			},
			prev () {
				if (this.index === 0) {
					this.index = this.list2.length - 1
				} else {
					--this.index
				}
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';

	.area-num-picker:before{
		border-top:1px solid #fff!important;
	}

	.area-num-picker .weui-cell{
		padding: 0;
	}

	.phone-warp{
		/*margin-left:15px;*/
		border-top: #ECECEC solid 1px;
	}
	.weui-cell:before{
		left: 0;
	}
</style>
