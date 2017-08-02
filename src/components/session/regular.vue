<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main">

			<div class="login-warp">

			</div>
			<div>
				<!--<tab :line-width=2  v-model="index" custom-bar-width="50px">-->
					<!--<tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">-->
						<!--{{item}}-->
					<!--</tab-item>-->
				<!--</tab>-->
				<swiper v-model="index" height="400px" :show-dots="false">
					<swiper-item  :key="0">
						<div class="tab-swiper vux-center">
							<form @submit.prevent="register">
								<group>
									<x-input :max="16" :min="6" :is-type="rep.repName" placeholder="用户名6~16位汉字，字符及数字" required show-clear v-model="user.username"></x-input>
									<!--<popup-picker  :data="list1" v-model="areaNum" ></popup-picker >-->
									<flexbox :gutter="0" class="phone-warp">
										<flexbox-item span="110px">
											<popup-picker value-text-align="center" class="area-num-picker" :data="areaList" v-model="areanum" ></popup-picker >
										</flexbox-item>
										<flexbox-item >
											<x-input :max="20" :min="6" type="tel" :is-type="rep.repPhone" :areanum="getAreaNum" class="weui-vcode" placeholder="手机号" v-model="user.phonenum" @on-change="completePhone"></x-input>
										</flexbox-item>
									</flexbox>
									<x-input class="weui-vcode" :max="6"  :min="6" placeholder="请输入验证码" v-model="user.testnum">
										<x-button  :disabled="isSend"  action-type="button" slot="right"   type="primary" mini>发送验证码</x-button>
									</x-input>
									<x-input :max="16"  :min="6" type="password" title="" placeholder="密码6~16位英文，符号和数字" required show-clear v-model="user.password"></x-input>
									<x-input :max="16"  :min="6" type="password" title="" placeholder="确认密码" required show-clear :equal-with="user.password" v-model="user.repassword"></x-input>
									<x-input type="hidden" title=""   show-clear disabled v-model="show_regmsg"></x-input>
									<check-icon :value.sync="agree">我已阅读 <router-link to="/agreement/index">《注册协议》</router-link></check-icon>
									<br>
									<br>
									<x-button action-type="submit" type="primary">注册</x-button>
									<p>{{getAreaNum}}</p>
								</group>
							</form>
						</div>
					</swiper-item>
					<!--<swiper-item  :key="1">-->
						<!--<div class="tab-swiper vux-center">-->
							<!--<form action="">-->
								<!--<group>-->
									<!--<flexbox :gutter="0" >-->
										<!--<flexbox-item span="110px">-->
											<!--<popup-picker value-text-align="center" class="area-num-picker" :data="list1" v-model="areaNum" ></popup-picker >-->
										<!--</flexbox-item>-->
										<!--<flexbox-item >-->
											<!--<x-input class="weui-vcode" placeholder="手机号"></x-input>-->
										<!--</flexbox-item>-->
									<!--</flexbox>-->
									<!--<x-input class="weui-vcode" placeholder="请输入验证码">-->
										<!--<x-button slot="right" type="primary" mini>发送验证码</x-button>-->
									<!--</x-input>-->
									<!--<x-input type="hidden" title="" placeholder="确认密码" required show-clear></x-input>-->
									<!--<check-icon :value.sync="agree">我已阅读 <router-link to="/agreement/index">《注册协议》</router-link></check-icon>-->
									<!--<br>-->
									<!--<br>-->
									<!--<x-button type="primary">注册</x-button>-->
								<!--</group>-->
							<!--</form>-->
						<!--</div>-->
					<!--</swiper-item>-->
				</swiper>
			</div>
		</div>
	</div>
</template>
<script>
	//	import foot from './components/footer/footer.vue'
	import Vue from 'vue';
	import heads from '../header/header.vue';
	import {XInput, Group,PopupPicker ,Picker,XButton, Flexbox, FlexboxItem, Divider,XSwitch,CheckIcon  } from 'vux'
	import {Tab, TabItem, Sticky, Swiper, SwiperItem,AjaxPlugin,AlertPlugin   } from 'vux'
	Vue.use(AlertPlugin   );
	const list = ['注册', '手机快捷注册']
	export default {
		name      : 'subapp',
		computed:{
			getAreaNum:{
//				this.user.areanum = this.areanum[0].match(/\d+/g)[0]
//				return this.areanum[0].match(/\d+/g)[0];
				get: function () {
					console.log(this.areanum[0])
					return this.areanum[0].match(/\d+/g)[0];
				},
				// setter
				set: function (value) {
					this.user.areanum = this.areanum[0].match(/\d+/g)[0];
				}

			}
		},
		data(){
			return {
				msg         : '登录',
				titleContent: '注册',
				list2       : list,
				isSend      : true,
				user        : {                //用户信息
					username  : '',
					password  : '',
					repassword: '',
					areanum   : '86',
					phonenum  : '',
					testnum   : '',

				},
				rep:{
					repName:function (value) {
						let tips = '用户名必须为6-16位汉字,字母和数字，不能出现特殊符号';
						let re = /^[\u4E00-\u9FFFa-zA-Z0-9]+$/g.test(value);
						if (!re){
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						};
						return{
							valid: re,
							msg: tips
						}
					}
				},
				show_regmsg : '',               //错误提示
				index       : 0,
				agree       : false,            //是否同意注册协议
				areanum     : ['大陆+86'],
				areaList    : [                 //区域列表
					['大陆+86', '台湾+886', '香港+852', '澳门+853', '新加坡+65', '美国+1']
				],
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
			CheckIcon,
			AjaxPlugin,
			AlertPlugin
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
			},
			register(){
				if (!this.agree){
					this.showPluginAuto();
					return false;
				};
				this.show_regmsg="正在登录";
				let params = new URLSearchParams();
				console.log(this.user);
				params.append('username',this.user.username);
				params.append('password',this.user.password);
				params.append('api','user/login');
				this.$http.post('http://m.greattone.net/e/appapi/',params).then(res => {
					console.log(res)
					if (res.status === 200&&res.data.err_msg === 'error'){
						this.login_showmessage = res.data.info
					}else{
						this.login_showmessage = res.data.info;
						router.replace('/')
					}
				}, res => {
					this.login_showmessage = "网络错误，请稍后重试";
				});
			},
			showPlugin () {
				this.$vux.alert.show({
					title: '提示',
					content: '请阅读注册协议并点击同意',
					onShow () {
						console.log('showing')
					},
					onHide () {
						console.log('hiding now')
					}
				})
			},
			showPluginAuto () {
				this.showPlugin();
				setTimeout(() => {
					this.$vux.alert.hide()
				}, 3000)
			},
			completePhone() {
				let area = this.user.areanum;//区号
				let re;
				let tips = '请输入正确的手机号';
				if (area == 86){ //大陆手机号
					re = /^1[0-9]\d{9}$/g.test(this.user.phonenum);
				}else {//大陆外手机号
					re = /^\d+$/g.test(this.user.phonenum);
				}
				if (!re){
					this.isSend = true;
				}else{
					this.isSend = false;
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
	.weui-btn_disabled.weui-btn_primary{
		background-color: #ccc;
	}
</style>
