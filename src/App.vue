<template>
	<div id="app">
		<!--<heads :tit="titleContent"></heads>-->
		<router-view></router-view>
		<foot ></foot>
	</div>
</template>

<script>
	import foot from './components/footer/footer.vue'
	import heads from './components/header/header.vue'
//	import login from './components/login/login.vue'

	export default {
		name: 'app',
		data(){
			return{
				msg:'好琴声',
				titleContent:'好琴声主页'
			}
		},
		components:{
			foot,heads
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';

	body {
		background-color: #fff;
	}
</style>
