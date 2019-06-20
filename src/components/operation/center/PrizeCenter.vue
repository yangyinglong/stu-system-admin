<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">

				<el-form-item label="学号">
					<el-input v-model="queryData.stuId" placeholder="学号" style="width: 150px; margin-right: 20px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="queryData.stuName" placeholder="姓名" style="width: 150px; margin-right: 20px" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="query" :disabled="isDisAble" size="small">查询</el-button>
				</el-form-item>

				<el-form-item style="margin-left: 300px">
					<!-- <el-button type="text"  size="small" style="font-size: 16px">导出数据</el-button> -->
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="allPrizeData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="honorScore" label="荣誉奖励总分" width="110"></el-table-column>
				<el-table-column prop="honorNum" label="荣誉奖励排名" width="110"></el-table-column>
				<el-table-column prop="paperSocre" label="学术论文" width="78"></el-table-column>
				<el-table-column prop="paperNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="patentScore" label="发明专利" width="78"></el-table-column>
				<el-table-column prop="patentNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="competitionScore" label="学科竞赛" width="78"></el-table-column>	
				<el-table-column prop="competitionNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="engiScore" label="项目参与" width="78"></el-table-column>
				<el-table-column prop="engiNum" label="排名" width="78"></el-table-column>			
				<!-- <el-table-column prop="entrScore" label="创业项目" width="78"></el-table-column>
				<el-table-column prop="entrNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="innoScore" label="创新项目" width="78"></el-table-column>
				<el-table-column prop="innoNum" label="排名" width="78"></el-table-column> -->
				<el-table-column prop="exchScore" label="学术交流" width="78"></el-table-column>
				<el-table-column prop="exchNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="workScore" label="就业深造" width="78"></el-table-column>
				<el-table-column prop="workNum" label="排名" width="78"></el-table-column>	
				<el-table-column prop="masterScore" label="硕士论文" width="78"></el-table-column>
				<el-table-column prop="masterNum" label="排名" width="78"></el-table-column>
			<!-- 	<el-table-column fixed="right" label="操作" width="140">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button>
						<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
					</template>
				</el-table-column> -->
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPagePrize"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="prizeTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PrizeCenter',
	data () {
		return {
			currentPagePrize: 1,
			allStuPrize: 1,
			isDisAble: false,
			loading: true,
			allPrizeData: [
				{
					id: '',
					stuId: '',
					name: '',
					honorScore: '', //荣誉总分
					honorNum: '', //荣誉数量
					paperSocre: '', //论文总分
					paperNum: '', //论文数量
					patentScore: '', //专利总分
					patentNum: '', //专利数量
					competitionScore: '',//学科竞赛
					competitionNum: '',
					engiScore: '', //工程项目
					engiNum: '',
					entrScore: '', //创业项目
					entrNum: '',
					innoScore: '',//创新项目
					innoNum: '',
					exchScore: '', //学术交流
					exchNum: '',
					workScore: '',// 就业深造
					workNum: '',
					masterScore: '', //硕士论文
					masterNum: '',
					allScore: '',
					allNum: '',
					totalCount: '',
				}			
			],
			queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state"),
	        	stuId: '',
	        	stuName: '',
	        	page: 1
	        },
		}
	},
	created(){
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		prizeTotal() {
			return this.allStuPrize
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuPrizePage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuPrizePage'))
				this.currentPagePrize = parseInt(sessionStorage.getItem('stuPrizePage'))
			} else {
				this.queryData.page = 1
				this.currentPagePrize = 1
			}
			if (sessionStorage.getItem('allStuPrize') != null) {
				this.allStuPrize = parseInt(sessionStorage.getItem('allStuPrize'))
			} else {
				this.queryAllStuPrizeNum()
			}
			if (sessionStorage.getItem('stuPrizeStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuPrizeStuId')
			}
			if (sessionStorage.getItem('stuPrizeStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuPrizeStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuPrizePage', this.queryData.page),
			sessionStorage.setItem('stuPrizeStuId', this.queryData.stuId),
			sessionStorage.setItem('stuPrizeStuName', this.queryData.stuName)
		},
		queryAllStuPrizeNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuPrizeNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPagePrize = 1
					this.allStuPrize = result.r
					sessionStorage.setItem('allStuPrize' , this.allStuPrize)
				} else {
					this.allStuPrize = 1
					this.currentPagePrize = 1
					this.$message.error(result.r)
				}
			}, (err) => {
	            this.$message.error(err.msg)
	        })
			// todo
		},
		handleSizeChange(val) {
		},
		handleCurrentChange(val) {
			this.queryData.page = val
			this.queryForAdmin()
		},
		query() {
			this.currentPagePrize = '1'
			this.queryAllStuPrizeNum()
			this.queryForAdmin()
		},
		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowPrizesForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.allPrizeData = result.r
					this.setSession()
				} else {
					this.allPrizeData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		showDetails(index, row){
			// sessionStorage.setItem('id', row.id)
			// sessionStorage.setItem('name', row.name)
			// sessionStorage.setItem('stuId', row.stuId)
			// sessionStorage.setItem('companyName', row.companyName)
			// sessionStorage.setItem('companyType', row.companyType)
			// sessionStorage.setItem('workType', row.workType)
			// sessionStorage.setItem('getDate', row.getDate)
			// this.$router.push({name: 'WorkExam', params: {orderId: row.id}})
		},
		
	},
	components: {
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>