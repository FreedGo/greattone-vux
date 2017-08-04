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
							<x-input :max="16" :min="6" :is-type="rep.repName" novalidate :iconType="userComfirm.Namecfm" :class="{'area-num-picker':true,}" placeholder="用户名6~16位汉字，字符及数字" required show-clear v-model="user.username"  @on-blur="checkname" ></x-input>
							<!--<popup-picker  :data="list1" v-model="areaNum" ></popup-picker >-->
							<flexbox :gutter="0" class="phone-warp">
								<flexbox-item span="110px">
									<popup-picker value-text-align="center"  :data="areaList" v-model="areanum" @on-change="completePhone" ></popup-picker >
								</flexbox-item>
								<flexbox-item >
									<x-input :max="20" :min="6" type="tel" novalidate :iconType="userComfirm.Phonecfm" :areanum="getAreaNum" class="weui-vcode" placeholder="手机号" v-model="user.phonenum" @on-blur="completePhone" @on-change="disableSendBtn"></x-input>
								</flexbox-item>
							</flexbox>
							<x-input class="weui-vcode" :max="6"  :min="6" novalidate :icon-type="userComfirm.Testcfm" placeholder="请输入验证码" v-model="user.smscode" @on-blur="checkSmsCode">
								<x-button   :disabled="sendDisabled"  action-type="button" slot="right"  @click.native="sendMsgCode"   type="primary" mini>{{sendBtnTitle}}</x-button>
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
	import {XInput, Group,PopupPicker ,Picker,XButton, Flexbox, FlexboxItem, Divider,CheckIcon,AjaxPlugin,AlertPlugin  } from 'vux'
	Vue.use(AlertPlugin  );
	const list = ['注册', '手机快捷注册'];
	export default {
		name      : 'subapp',
		computed:{
			getAreaNum:{
				get: function () {
					console.log(this)
					return this.areanum[0].match(/\d+/g)[0];
				},
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
				user        : {
					username: '', password: '', repassword: '', areanum: '86', phonenum: '', smscode: '',
					groupid : this.$route.params.groupid || 1

				},
				userComfirm:{
					Namecfm  : '',
					Phonecfm : '',
					Testcfm  : '',
					Passcfm  : '',
					RePasscfm: '',
				},
				rep:{
					repName:function (value) {
						console.log(1);
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
				sendDisabled: true,             //发送验证码按钮是否变暗
				sendBtnTitle: '发送验证码',       //发送验证码按钮文字内容
				sendBtnTimer: '',               //发送验证码按钮文字内容
				agree       : false,            //是否同意注册协议
				areanum     : ['大陆+86'],
				areaList    : [                 //区域列表
					['大陆+86', '台湾+886', '香港+852', '澳门+853', '新加坡+65', '美国+1']
				],
				apiurl:'http://m.greattone.net/e/appapi/'
			}
		},
		components: {
			heads, XInput, Group, XButton, Flexbox, FlexboxItem, Divider, PopupPicker , Picker, CheckIcon, AjaxPlugin, AlertPlugin,
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
				}
				if (!re){
					this.userComfirm.Phonecfm = 'error';
					this.sendDisabled  = true ;
					this.$vux.alert.show({
						title: '提示',
						content: '请输入正确格式的手机号',
					});
				}else{

					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/checkphone');
					params.append('phone',this.user.phonenum);
					this.$http.post(this.apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							this.userComfirm.Phonecfm = 'error';
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							});
							this.sendDisabled  = true;
						}else{
							this.userComfirm.Phonecfm = 'success';
							this.sendDisabled  = false;
						}
					}, res => {
						this.userComfirm.Phonecfm = 'error';
						tips = res;
						this.sendDisabled  = true;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						})
					})
				}
			},//检测手机号是否可以用
			disableSendBtn(){
				this.sendDisabled  = true ;
			},//让发送验证码按钮禁用
			checkname(){
				let tips ;
				let username = this.user.username;                                                             //获取用户名
				let length1 = username.match(/[\u4E00-\u9FFF]/g)?username.match(/[\u4E00-\u9FFF]/g).length*2:0;//用户名中，中文长度
				let length2 = username.match(/[a-zA-Z0-9]/g)? username.match(/[a-zA-Z0-9]/g).length:0;         //用户名中英文长度
				let re = /[\u4E00-\u9FFFa-zA-Z0-9]/g.test(username);                                           //检测用户名中有没有非法字符

				if (length1+length2<6||length1+length2>16){
					tips = '用户名必须为6-16位';
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					});
					this.userComfirm.Namecfm = 'error';
				}else if (!re){
					tips='用户名必须汉字,字母和数字，不能出现特殊符号';
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					});
					this.userComfirm.Namecfm = 'error';
				}else{
					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/checkuser');
					params.append('username',this.user.username);
					this.$http.post(this.apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							this.userComfirm.Namecfm = 'error';
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}else{
							this.userComfirm.Namecfm = 'success';
						}
					}, res => {
						this.userComfirm.Namecfm = 'error';
						tips = res;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						})
					});
				}
			},//检查用户名是否可用
			sendMsgCode(){

				let Namecfm = this.userComfirm.Namecfm;
				if (Namecfm == 'success'){
					this.disableSendBtn();
					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/sendSms');
					params.append('username',this.user.username);
					params.append('Area','00'+this.getAreaNum);
					params.append('phone',this.user.phonenum);

					this.$http.post(this.apiurl,params).then(res => {
						if (false && res.status === 200&&res.data.err_msg !== 'success'){
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							})
						}else{
							let sendTime = 60;
							let timer_this = this;
							function changeSendBtn () {
								if (sendTime<0){
									timer_this.sendBtnTitle = '发送验证码';
									clearInterval(timer_this.sendBtnTimer);
									return false;
								}
								timer_this.sendBtnTitle = sendTime+'s';
								sendTime--;
							}
							this.sendBtnTimer = setInterval(changeSendBtn,1000);
						}
						this.sendDisabled = false ; //让发送按钮重新可以点击
					}, res => {
						this.userComfirm.Namecfm = 'error';
						tips = res;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						});
						this.sendDisabled = false ; //让发送按钮重新可以点击
					});
				}else{
					this.$vux.alert.show({
						title: '提示',
						content: '请先填写正确的用户名',
					});
				}
			},
			checkSmsCode(){
				let smsCode = this.user.smscode;
				let re = /^\d{6}$/.test(smsCode);
				let tips = '验证码为6位数字，请重新输入';
				if (!re){
					this.$vux.alert.show({
						title: '提示',
						content: tips,
					});
				}else{

					//拼接参数及
					let params = new URLSearchParams();
					params.append('api','user/checkcode');
					params.append('phone',this.user.phonenum);
					params.append('smscode',smsCode);

					this.$http.post(this.apiurl,params).then(res => {
						if (res.status === 200&&res.data.err_msg !== 'success'){
							this.userComfirm.Testcfm = 'error';
							tips = res.data.info;
							this.$vux.alert.show({
								title: '提示',
								content: tips,
							});
						}else{
							this.userComfirm.Testcfm = 'success';
						}
					}, res => {
						this.userComfirm.Phonecfm = 'error';
						tips = res;
						this.sendDisabled  = true;
						this.$vux.alert.show({
							title: '提示',
							content: tips,
						})
					})
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
