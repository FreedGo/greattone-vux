<template>
	<div id="subapp">
		<heads :tit="titleContent"></heads>
		<div class="main">
			<div class="login-warp">
			</div>
			<div>
				<div class="tab-swiper vux-center">
					<form @submit.prevent="register">
						<group>
							<x-input :max="16" :min="6" :is-type="rep.repname"  :class="{'area-num-picker':true,'weui-cell_warn':!userComfirm.isNamecfm}" placeholder="用户名6~16位汉字，字符及数字" required show-clear v-model="user.username" @on-blur="checkname"></x-input>
							<!--<popup-picker  :data="list1" v-model="areaNum" ></popup-picker >-->
							<flexbox :gutter="0" class="phone-warp">
								<flexbox-item span="110px">
									<popup-picker value-text-align="center"  :data="areaList" v-model="areanum" @on-change="completePhone" ></popup-picker >
								</flexbox-item>
								<flexbox-item >
									<x-input :max="20" :min="6" type="tel" :is-type="rep.repPhone" :areanum="getAreaNum" class="weui-vcode" placeholder="手机号" v-model="user.phonenum" @on-change="completePhone"></x-input>
								</flexbox-item>
							</flexbox>
							<x-input class="weui-vcode" :max="6"  :min="6" :is-type="rep.repTestNum" placeholder="请输入验证码" v-model="user.smscode">
								<x-button  :disabled="isSend"  action-type="button" slot="right"   type="primary" mini>发送验证码</x-button>
							</x-input>
							<x-input :max="16"  :min="6" type="password" title="" placeholder="密码6~16位英文，符号和数字" required show-clear v-model="user.password"></x-input>
							<x-input :max="16"  :min="6" type="password" title="" placeholder="确认密码" required show-clear :equal-with="user.password" v-model="user.repassword"></x-input>
							<x-input type="hidden" title=""   show-clear disabled v-model="show_regmsg"></x-input>
							<check-icon :value.sync="agree">我已阅读 <router-link to="/agreement/index">《注册协议》</router-link></check-icon>
							<br>
							<br>
							<x-button action-type="submit" type="primary">注册</x-button>
							<p>{{user.groupid}}</p>
						</group>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//	import foot from './components/footer/footer.vue'
	import Vue from 'vue';
	import heads from '../header/header.vue';
	import router from '../../router/index.js';
	import {XInput, Group,PopupPicker ,Picker,XButton, Flexbox, FlexboxItem, Divider,CheckIcon  } from 'vux'
	import { Sticky ,AjaxPlugin,AlertPlugin   } from 'vux'
	Vue.use(AlertPlugin  );
	const list = ['注册', '手机快捷注册'];
	export default {
		name      : 'subapp',
		computed:{
			getAreaNum:{
//				this.user.areanum = this.areanum[0].match(/\d+/g)[0]
//				return this.areanum[0].match(/\d+/g)[0];
				get: function () {
					console.log(this)
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
					smscode   : '',
					groupid   : this.$route.params.groupid||1

				},
				userComfirm:{
					isNamecfm:false,
					isPhonecfm:false,
					isTestcfm:false,
					isPasscfm:false,
					isRePasscfm:false,
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
						}
						return{
							valid: re,
							msg: tips
						}
					},
					repTestNum:function (value) {
						let tips = '验证码为6位数字';
						let re = /^[0-9]{1,6}$/g.test(value);
						if (!re){
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}
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
				apiurl:'http://m.greattone.net/e/appapi/'
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
			Sticky,
			CheckIcon,
			AjaxPlugin,
			AlertPlugin
		},
		methods   : {
			register(){
				if (!this.agree){
					this.showPluginAuto();
					return false;
				};
				this.show_regmsg="正在提交";
				let params = new URLSearchParams();
				params.append('api','user/createUser');
				params.append('username',this.user.username);
				params.append('password',this.user.password);
				params.append('phone',this.user.phonenum);
				params.append('smscode',this.user.smscode);
				params.append('groupid',this.user.groupid);

				this.$http.post('apiurl',params).then(res => {
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
				let area = this.getAreaNum;//区号
				let re;
				let tips = '请输入正确的手机号';
				if (area == 86){ //大陆手机号
					re = /^1[0-9]\d{9}$/g.test(this.user.phonenum);
				}else {//大陆外手机号
					re = /^\d+$/g.test(this.user.phonenum);
					console.log(1)
				}
				if (!re){
					this.isSend = true;
				}else{
					this.isSend = false;
				}
			},
			checkname(){
				let tips = '用户名必须为6-16位汉字,字母和数字，不能出现特殊符号';
				let re = /^[\u4E00-\u9FFFa-zA-Z0-9]{6,16}$/g.test(this.user.username);
				if (!re){
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					})
				}else{
					let params = new URLSearchParams();
					params.append('api','user/checkuser');
					params.append('username',this.user.username);

					this.$http.post(this.apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg === 'error'){
							this.userComfirm.isNamecfm = false;
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}else{
							this.userComfirm.isNamecfm = true;
							console.log('right')
						}
					}, res => {
						this.login_showmessage = "网络错误，请稍后重试";
					});
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
