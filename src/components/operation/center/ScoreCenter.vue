<template>
	<div style="margin: 0 auto; height: 550px">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">

				<el-form-item label="学号">
					<el-input v-model="queryData.stuId" placeholder="学号" style="width: 150px; margin-right: 20px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="queryData.stuName" placeholder="姓名" style="width: 150px; margin-right: 20px" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryForAdmin" :disabled="isDisAble" size="small">查询</el-button>
				</el-form-item>

				<el-form-item style="margin-left: 300px">
					<!-- <el-button type="text"  size="small" style="font-size: 16px">导出数据</el-button> -->
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="scoresFrom" v-loading="isDisAble">
				<el-table-column prop="stuId" label="学号" width="150"></el-table-column>
				<el-table-column prop="name" label="姓名" width="150"></el-table-column>
				<el-table-column prop="currNumber" label="已修课程数" width="150"></el-table-column>
				<el-table-column prop="averageScore" label="平均分" width="150"></el-table-column>
				<el-table-column prop="weightedAverageScore" label="加权平均分" width="150"></el-table-column>
				<el-table-column prop="hadCredit" label="已修学分" width="150"></el-table-column>
				<!-- <el-table-column prop="engineeringMathematics" label="工程数学" width="149"></el-table-column>
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
				<el-table-column prop="xiandaililun" label="现代控制理论" width="149"></el-table-column> -->
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<!-- <el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button> -->
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
				</el-table-column>
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
				    weightedAverageScore: '',
				    hadCredit: '',
				}
			],
			queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state"),
	        	stuId: '',
	        	stuName: ''
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
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%'
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
		showDetails(index, row){
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('currNumber', row.currNumber)
			sessionStorage.setItem('averageScore', row.averageScore)
			sessionStorage.setItem('engineeringMathematics', row.engineeringMathematics)
			sessionStorage.setItem('firstForeignLanguage', row.firstForeignLanguage)
			sessionStorage.setItem('characteristicSocialism', row.characteristicSocialism)
			sessionStorage.setItem('numericalAnalysis', row.numericalAnalysis)
			sessionStorage.setItem('jixiejiaozuo', row.jixiejiaozuo)
			sessionStorage.setItem('jisuanyingyong', row.jisuanyingyong)
			sessionStorage.setItem('jidianxue', row.jidianxue)
			sessionStorage.setItem('nami', row.nami)
			sessionStorage.setItem('jixiejiagong', row.jixiejiagong)
			sessionStorage.setItem('jixiezhizao', row.jixiezhizao)
			sessionStorage.setItem('dianyingyantao', row.dianyingyantao)
			sessionStorage.setItem('jisuanjichu', row.jisuanjichu)
			sessionStorage.setItem('xiandaililun', row.xiandaililun)
			sessionStorage.setItem('weightedAverageScore', row.weightedAverageScore)
			sessionStorage.setItem('hadCredit', row.hadCredit)
			this.$router.push({name: 'ScoreShow', params: {orderId: row.id}})
		}
		
		
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