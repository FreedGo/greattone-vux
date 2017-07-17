<template>
	<div id="app">
		<heads :tit="titleContent"></heads>
		<h1>{{msg}}</h1>
	</div>
</template>

<script>
//	import foot from './components/footer/footer.vue'
	import heads from '../header/header.vue'
	export default {
		name: 'app',
		data(){
			return{
				msg:'登录',
				titleContent:'登录'
			}
		},
		components:{
			heads
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';

	body {
		background-color: #fff;
	}
</style>
