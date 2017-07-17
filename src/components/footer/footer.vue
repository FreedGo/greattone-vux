<template>
	<div class="footer-warp">
		<tabbar >
			<tabbar-item  selected>
				<img slot="icon" src="../../assets/demo/icon_nav_button.png">
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item  show-dot>
				<img slot="icon" src="../../assets/demo/icon_nav_msg.png">
				<span slot="label">音乐活动</span>
			</tabbar-item>
			<tabbar-item  link="/component/demo">
				<img slot="icon" src="../../assets/demo/icon_nav_article.png">
				<span slot="label">发布</span>
			</tabbar-item>
			<tabbar-item   badge="2">
				<img slot="icon" src="../../assets/demo/icon_nav_cell.png">
				<span slot="label">我的动态</span>
			</tabbar-item>
			<tabbar-item badge="2" link="/login/regular">
				<img slot="icon" src="../../assets/demo/icon_nav_cell.png">
				<span slot="label">个人中心</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
	import {Tabbar, TabbarItem, Group, Cell} from 'vux'
	export default{
		data(){
			return {
				msg: '1'
			}
		},
		components:{
			Tabbar,
			TabbarItem,
			Group,
			Cell
		},
	}
</script>

<style>

</style>