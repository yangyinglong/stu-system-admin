<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 90px; margin-left: -70px">全部
             		</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
	                	<el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
	              	</el-checkbox-group>
				</el-form-item>

				<el-form-item label="学号" style="margin-left: 40px">
					<el-input v-model="queryData.stuId" placeholder="学号" style="width: 90px; margin-right: 10px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="queryData.stuName" placeholder="姓名" style="width: 90px; margin-right: 10px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="queryData.competitionType" placeholder="类型" size="small" style="width: 125px">
			            <el-option
			              v-for="item in competitionTypes"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
		          	</el-select>  
				</el-form-item>
				<el-form-item label="级别">
					<el-select v-model="queryData.competitionLevel" placeholder="级别" size="small" style="width: 85px">
			            <el-option
			              v-for="item in competitionLevels"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
		          	</el-select>  
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="query" :disabled="isDisAble" size="small">查询</el-button>
				</el-form-item>
				<el-form-item >
					<el-button type="primary"  size="small"  @click="downloadInfo">导出数据</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="competitionData" v-loading="isDisAble">
				<el-table-column prop="stuId" label="学号" width="100"></el-table-column>
				<el-table-column prop="name" label="姓名" width="70"></el-table-column>
				<el-table-column prop="competitionType" label="类型" width="90"></el-table-column>
				<el-table-column prop="competitionName" label="名称" width="140"></el-table-column>
				<el-table-column prop="competitionState" label="竞赛状态" width="100"></el-table-column>
				<el-table-column prop="competitionLevel" label="级别" width="70"></el-table-column>
				<el-table-column prop="competitionPrize" label="等级" width="70"></el-table-column>
				<el-table-column prop="ranking" label="参赛排名" width="60"></el-table-column>
				<el-table-column prop="totalNumber" label="参赛人数" width="60"></el-table-column>
				<el-table-column prop="teacher" label="指导老师" width="80"></el-table-column>
				<el-table-column prop="getDate" label="获奖日期" width="100"></el-table-column>				
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="examCompetition(scope.$index, scope.row)" v-if="scope.row.status== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPageCompetition"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="competitionTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'CompetitionCenter',
	data () {
		return {
			currentPageCompetition: 1,
			allStuCompetition: 1,
			isTutor: '',
			isDisAble: false,
			loading: true,
			competitionData: [
				{
					id:'',
					name: '',
					stuId: '',
					competitionType: '大学生创新创业',
					competitionName: '竞赛项目名称',
					ranking: 1,
					totalNumber: 3,
					competitionState: '竞赛进行初期',
					competitionPrize: '一等奖',
					competitionLevel: '国家级',
					teacher: '郭倩',
					getDate: '2018-12-13',
	        		status: '待审核',
	        		score: 0,
	        		proofMaterialId: '',
	        		page: ''
				}			
			],
			checkAll: false,
			isIndeterminate: true,
			checkedIterms: ['待审核'],
        	iterms: itermOptions,
        	queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state"),
	        	status: ['待审核'],
	        	stuId: '',
	        	stuName: '',
	        	competitionType: '',
	        	competitionLevel: '',
	        	page: ''
	        },
	        competitionTypes: [{
	          value: "大学生创新创业",
	          label: "大学生创新创业"
	        },{
	          value: "互联网+",
	          label: "互联网+"
	        },{
	          value: "挑战杯",
	          label: "挑战杯"
	        },{
	          value: "创青春",
	          label: "创青春"
	        },{
	          value: "机械设计大赛",
	          label: "机械设计大赛"
	        },{
	          value: "数学建模",
	          label: "数学建模"
	        },{
	          value: "力学竞赛",
	          label: "力学竞赛"
	        },{
	          value: "智慧城市",
	          label: "智慧城市"
	        },{
	          value: "华为杯",
	          label: "华为杯"
	        },{
	          value: "飞行器创新设计大赛",
	          label: "飞行器创新设计大赛"
	        },{
	          value: "企业类竞赛",
	          label: "企业类竞赛"
	        },{
	          value: "其他竞赛",
	          label: "其他竞赛"
	        }],
	        competitionLevels: [{
	          value: "国家级",
	          label: "国家级"
	        },{
	          value: "省级",
	          label: "省级"
	        },{
	          value: "企业",
	          label: "企业"
	        },{
	          value: "校级",
	          label: "校级"
	        }],
		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		competitionTotal() {
			return this.allStuCompetition
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuCompetitionPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuCompetitionPage'))
				this.currentPageCompetition = parseInt(sessionStorage.getItem('stuCompetitionPage'))
			} else {
				this.queryData.page = 1
				this.currentPageCompetition = 1
			}
			if (sessionStorage.getItem('checkedItermsCompetition') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsCompetition').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuCompetition') != null) {
				this.allStuCompetition = parseInt(sessionStorage.getItem('allStuCompetition'))
			} else {
				this.queryAllStuCompetitionNum()
			}
			if (sessionStorage.getItem('stuCompetitionStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuCompetitionStuId')
			}
			if (sessionStorage.getItem('stuCompetitionStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuCompetitionStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuCompetitionPage', this.queryData.page),
			sessionStorage.setItem('stuCompetitionStuId', this.queryData.stuId),
			sessionStorage.setItem('stuCompetitionStuName', this.queryData.stuName)
		},
		queryAllStuCompetitionNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				competitionType: this.queryData.competitionType == '' ? '%' : this.queryData.competitionType,
	        	competitionLevel: this.queryData.competitionLevel == '' ? '%' : this.queryData.competitionLevel,
	        	page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuCompetitionNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPageCompetition = 1
					this.allStuCompetition = result.r
					sessionStorage.setItem('allStuCompetition' , this.allStuCompetition)
				} else {
					this.allStuCompetition = 1
					this.currentPageCompetition = 1
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
			this.currentPageCompetition = '1'
			this.queryAllStuCompetitionNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				competitionType: this.queryData.competitionType == '' ? '%' : this.queryData.competitionType,
	        	competitionLevel: this.queryData.competitionLevel == '' ? '%' : this.queryData.competitionLevel,
	        	page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowCompetitionsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.competitionData = result.r
					this.setSession()
				} else {
					this.competitionData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		handleCheckAllChange(val) {
			this.checkedIterms = val ? itermOptions : []
			this.isIndeterminate = false
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsCompetition', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsCompetition').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsCompetition', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsCompetition').split(',')
			this.query()
		},
		examCompetition(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('competitionType', row.competitionType)
			sessionStorage.setItem('competitionName', row.competitionName)
			sessionStorage.setItem('competitionState', row.competitionState)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('getDate', row.getDate)
			sessionStorage.setItem('competitionPrize', row.competitionPrize)
			sessionStorage.setItem('competitionLevel', row.competitionLevel)
			sessionStorage.setItem('teacher', row.teacher)
			this.$router.push({name: 'CompetitionExam', params: {orderId: row.id}})
		},
		showProofMaterial(index, row){
			window.open('http://129.204.15.161:7070/api/file/downloadFile?fileName=' + row.proofMaterialId)
		},
		downloadInfo() {
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				competitionType: this.queryData.competitionType == '' ? '%' : this.queryData.competitionType,
	        	competitionLevel: this.queryData.competitionLevel == '' ? '%' : this.queryData.competitionLevel
			}
			this.$http.DownCompesForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					window.open('http://129.204.15.161:7070/api/file/downloadExcel?fileName=' + result.r)
					// window.open('http://127.0.0.1:7070/api/file/downloadExcel?fileName=' + result.r)
				} else {
					this.$message.error(result.r)
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })

		}
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