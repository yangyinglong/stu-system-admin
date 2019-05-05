<template>
	<div style="margin: 0 auto; height: 550px">
		<div style="text-align:center; margin-top: 20px;">
			<el-table :data="scoresFrom" v-loading="isDisAble">
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="stuId" fixed label="学号" width="90"></el-table-column>
				<el-table-column prop="currNumber" fixed label="已修课程数" width="110"></el-table-column>
				<el-table-column prop="averageScore" fixed label="平均分" width="110"></el-table-column>
				<el-table-column prop="engineeringMathematics" label="工程数学" width="149"></el-table-column>
				<el-table-column prop="firstForeignLanguage" label="第一外国语" width="149"></el-table-column>
				<el-table-column prop="characteristicSocialism" label="中国特色社会主义理论与实践研究" width="149"></el-table-column>
				<el-table-column prop="numericalAnalysis" label="数值分析" width="149"></el-table-column>
				<el-table-column prop="jixiejiaozuo" label="机械工程学科发展前沿专题讲座" width="149"></el-table-column>	
				<el-table-column prop="jisuanyingyong" label="计算流体力学软件及工程应用" width="149"></el-table-column>
				<el-table-column prop="jidianxue" label="机电系统动力学" width="149"></el-table-column>
				<el-table-column prop="nami" label="纳米技术与应用" width="149"></el-table-column>			
				<el-table-column prop="jixiejiagong" label="机械加工精度理论与机械制造装备技术" width="149"></el-table-column>
				<el-table-column prop="jixiezhizao" label="机械制造方法理论与技术" width="149"></el-table-column>
				<el-table-column prop="dianyingyantao" label="典型企业制造案例研讨" width="149"></el-table-column>
				<el-table-column prop="jisuanjichu" label="计算流体力学基础" width="149"></el-table-column>
				<el-table-column prop="xiandaililun" label="现代控制理论" width="149"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ScoreCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			scoresFrom: [
				{
					stuId: '',
					name: '',
					currNumber: '',
					averageScore: '',
					
					engineeringMathematics: '',  // 工程数学
				    firstForeignLanguage: '',  // 第一外国语
				    characteristicSocialism: '',  // 中国特色社会主义理论与实践研究
				    numericalAnalysis: '',  // 数值分析

					jixiejiaozuo: '',  // 机械工程学科发展前沿专题讲座
				    jisuanyingyong: '',  // 计算流体力学软件及工程应用
				    jidianxue: '',  // 机电系统动力学
				    nami: '',  // 纳米技术与应用
				    jixiejiagong: '',  // 机械加工精度理论与机械制造装备技术
				    jixiezhizao: '',  // 机械制造方法理论与技术
				    dianyingyantao: '',  // 典型企业制造案例研讨
				    jisuanjichu: '',  // 计算流体力学基础
				    xiandaililun: '',  // 现代控制理论
				}
			],
			queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state")
	        },
		}
	},
	created(){
		this.queryForAdmin()
	},
	computed: {
    },
	methods: {
		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
			}
			this.isDisAble = true
			this.$http.ShowScoresForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					for (var i = result.r.length - 1; i >= 0; i--) {
						if (result.r[i].engineeringMathematics == -1) {
							result.r[i].engineeringMathematics = '未修'
						}
						if (result.r[i].firstForeignLanguage == -1) {
							result.r[i].firstForeignLanguage = '未修'	
						}
						if (result.r[i].characteristicSocialism == -1) {
							result.r[i].characteristicSocialism = '未修'
						}
						if (result.r[i].numericalAnalysis == -1) {
							result.r[i].numericalAnalysis = '未修'	
						}
						if (result.r[i].jixiejiaozuo == -1) {
							result.r[i].jixiejiaozuo = '未修'
						}
						if (result.r[i].jisuanyingyong == -1) {
							result.r[i].jisuanyingyong = '未修'	
						}
						if (result.r[i].jidianxue == -1) {
							result.r[i].jidianxue = '未修'
						}
						if (result.r[i].nami == -1) {
							result.r[i].nami = '未修'	
						}
						if (result.r[i].jixiejiagong == -1) {
							result.r[i].jixiejiagong = '未修'
						}
						if (result.r[i].jixiezhizao == -1) {
							result.r[i].jixiezhizao = '未修'	
						}
						if (result.r[i].dianyingyantao == -1) {
							result.r[i].dianyingyantao = '未修'
						}
						if (result.r[i].jisuanjichu == -1) {
							result.r[i].jisuanjichu = '未修'	
						}
						if (result.r[i].xiandaililun == -1) {
							result.r[i].xiandaililun = '未修'
						}
					}
					this.scoresFrom = result.r
				} else {
					this.scoresFrom = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		
		
	},
	components: {
	},
}		
</script>

<style scoped>
	.labcenter-main{
		width: 70%;
		margin: 0 auto;
	}
</style>