<template>
	<router-view></router-view>
</template>

<script>
	import foot from './components/footer/footer.vue'
	import heads from './components/header/header.vue'
//	import login from './components/login/login.vue'
	import { Drawer,ViewBox } from 'vux'

	export default {
		name: 'app',
		data(){
			return{
				msg:'好琴声',
				titleContent:'好琴声主页'
			}
		},
		components:{
			foot,heads,
			Drawer,
			ViewBox
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@mainColor:#f44b50;
	html,body {
		background-color: #fff;
		height: 100%;
		overflow-x: hidden;
	}
	body {
		background-color: #fff;
		.weui-cell{
			padding-left: 0;
			left: 0!important;
		}
	}
	.main{
		margin: 0 20px;
		.weui-cells:before{
			border-top: none;

		}
		.weui-cells{
			font-size: 16px;
		}

	}
</style>
