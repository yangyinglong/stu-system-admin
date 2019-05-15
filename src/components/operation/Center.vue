<template>
	<div class="labcenter-main">
		<el-tabs tab-position="left" type="border-card" style="min-height: 530px; min-width: 11
		00px" :value="tagPage">			
			<el-tab-pane label="学生中心" name="stuBaseCenter"><StuBaseCenter /></el-tab-pane>
			<el-tab-pane label="成绩中心" name="scoreCenter"><ScoreCenter /></el-tab-pane>
			<el-tab-pane label="综合素质" name="prizeCenter"><PrizeCenter /></el-tab-pane>
			<el-tab-pane label="荣誉奖项" name="honorCenter" @tab-click="tabClick"><HonorCenter ref="mychild" /></el-tab-pane>
			<el-tab-pane label="学术论文" name="paperCenter"><PaperCenter /></el-tab-pane>
			<el-tab-pane label="发明专利" name="patentCenter"><PatentCenter /></el-tab-pane>
			<el-tab-pane label="学科竞赛" name="competitionCenter"><CompetitionCenter /></el-tab-pane>
			<!-- <el-tab-pane label="创新项目" name="innoProCenter"><InnoProCenter /></el-tab-pane>
			<el-tab-pane label="创业项目" name="entrProCenter"><EntrProCenter /></el-tab-pane>
			<el-tab-pane label="工程项目" name="engiProCenter"><EngiProCenter /></el-tab-pane> -->
			<el-tab-pane label="参与项目" name="projectCenter"><ProjectCenter /></el-tab-pane>
			<el-tab-pane label="学术交流" name="acadExchCenter"><AcadExchCenter /></el-tab-pane>
			<el-tab-pane label="就业深造" name="workCenter"><WorkCenter /></el-tab-pane>
			<el-tab-pane label="硕士论文" name="masterPaperCenter"><MasterPaperCenter /></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import StuBaseCenter from '@/components/operation/center/StuBaseCenter'
import ScoreCenter from '@/components/operation/center/ScoreCenter'
import HonorCenter from '@/components/operation/center/HonorCenter'
import PrizeCenter from '@/components/operation/center/PrizeCenter'
import PaperCenter from '@/components/operation/center/PaperCenter'
import PatentCenter from '@/components/operation/center/PatentCenter'
import CompetitionCenter from '@/components/operation/center/CompetitionCenter'
import InnoProCenter from '@/components/operation/center/InnoProCenter'
import EntrProCenter from '@/components/operation/center/EntrProCenter'
import EngiProCenter from '@/components/operation/center/EngiProCenter'
import AcadExchCenter from '@/components/operation/center/AcadExchCenter'
import WorkCenter from '@/components/operation/center/WorkCenter'
import MasterPaperCenter from '@/components/operation/center/MasterPaperCenter'
import ProjectCenter from '@/components/operation/center/ProjectCenter'
export default {
	name: 'Center',
	data () {
		return {
			tagPage: 'stuBaseCenter'
		}
	},
	created(){
		if (this.$route.params.tagP) {
			this.tagPage = this.$route.params.tagP
		}
	},
	methods: {
		tabClick() {
			// this.$refs.mychild.queryForAdmin()
		}
	},
	components: {
		StuBaseCenter,
		ScoreCenter,
		HonorCenter,
		PrizeCenter,
		PaperCenter,
		PatentCenter,
		CompetitionCenter,
		InnoProCenter,
		EntrProCenter,
		EngiProCenter,
		AcadExchCenter,
		WorkCenter,
		MasterPaperCenter,
		ProjectCenter
	},
}		
</script>

<style scoped>
	.labcenter-main{
		width: 70%;
		min-width: 1400px;
		margin: 0 auto;
	}
</style>