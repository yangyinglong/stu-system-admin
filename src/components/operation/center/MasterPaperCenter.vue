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

				<el-form-item label="学号" style="margin-left: 100px">
					<el-input v-model="queryData.stuId" placeholder="学号" style="width: 150px; margin-right: 20px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="queryData.stuName" placeholder="姓名" style="width: 150px; margin-right: 20px" size="small"></el-input>
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
			<el-table :data="masterPaperData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="paperName" label="题目" width="180"></el-table-column>
				<el-table-column prop="paperAbstract" label="摘要" width="200"></el-table-column>
				<el-table-column prop="score1" label="外审成绩1" width="90"></el-table-column>
				<!-- <el-table-column prop="sugg1" label="外审意见1" width="200"></el-table-column> -->
				<el-table-column prop="score2" label="外审成绩2" width="90"></el-table-column>
				<el-table-column prop="score4" label="加送外审" width="90"></el-table-column>
				<!-- <el-table-column prop="sugg2" label="外审意见2" width="200"></el-table-column> -->
				<el-table-column prop="score3" label="答辩成绩" width="90"></el-table-column>
				<!-- <el-table-column prop="sugg3" label="答辩意见" width="200"></el-table-column> -->
				<el-table-column prop="getDate" label="日期" width="100"></el-table-column>
				<!-- <el-table-column prop="proResult" label="项目成果" width="120"></el-table-column>	 -->
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="examEntrPro(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPageMasterPaper"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="masterPaperTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'EngiProCenter',
	data () {
		return {
			currentPageMasterPaper: 1,
			allStuMasterPaper: 1,
			isDisAble: false,
			loading: true,
			masterPaperData: [
				{
					id:'',
					stuId: '',
					name: '',
					paperName: '大学生工程项目测试数据1',
					paperAbstract: '大学生工程项目测试数据1简介',
					score1: 'A', // 性能指标
					sugg1: '一审意见', // 个人所做的工作
					score2: 'B',
					score4: '',
					sugg2: '二审意见',
					score3: 'A',
					sugg3: '答辩意见',
					getDate: '2018-12-13',
	        		status: '待审核',
	        		score: 0,
	        		proofMaterialId: '',
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
	        	page: ''
	        },
		}
	},
	created(){
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		masterPaperTotal() {
			return this.allStuMasterPaper
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuMasterPaperPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuMasterPaperPage'))
				this.currentPageMasterPaper = parseInt(sessionStorage.getItem('stuMasterPaperPage'))
			} else {
				this.queryData.page = 1
				this.currentPageMasterPaper = 1
			}
			if (sessionStorage.getItem('checkedItermsMasterPaper') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsMasterPaper').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuMasterPaper') != null) {
				this.allStuMasterPaper = parseInt(sessionStorage.getItem('allStuMasterPaper'))
			} else {
				this.queryAllStuMasterPaperNum()
			}
			if (sessionStorage.getItem('stuMasterPaperStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuMasterPaperStuId')
			}
			if (sessionStorage.getItem('stuMasterPaperStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuMasterPaperStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuMasterPaperPage', this.queryData.page),
			sessionStorage.setItem('stuMasterPaperStuId', this.queryData.stuId),
			sessionStorage.setItem('stuMasterPaperStuName', this.queryData.stuName)
		},
		queryAllStuMasterPaperNum() {
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
			this.$http.ShowStuMasterPaperNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPageMasterPaper = 1
					this.allStuMasterPaper = result.r
					sessionStorage.setItem('allStuMasterPaper' , this.allStuMasterPaper)
				} else {
					this.allStuMasterPaper = 1
					this.currentPageMasterPaper = 1
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
			this.currentPageMasterPaper = '1'
			this.queryAllStuMasterPaperNum()
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
			this.$http.ShowMasterPapersForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.masterPaperData = result.r
					this.setSession()
				} else {
					this.masterPaperData = []
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
			sessionStorage.setItem('checkedItermsMasterPaper', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsMasterPaper').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsMasterPaper', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsMasterPaper').split(',')
			this.query()
		},
		examEntrPro(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('paperName', row.paperName)
			sessionStorage.setItem('paperAbstract', row.paperAbstract)
			sessionStorage.setItem('proState', row.proState)
			sessionStorage.setItem('score1', row.score1)
			sessionStorage.setItem('sugg1', row.sugg1)
			sessionStorage.setItem('score2', row.score2)
			sessionStorage.setItem('score4', row.score4)
			sessionStorage.setItem('sugg2', row.sugg2)
			sessionStorage.setItem('score3', row.score3)
			sessionStorage.setItem('sugg3', row.sugg3)			
			sessionStorage.setItem('getDate', row.getDate)
			this.$router.push({name: 'MasterPaperExam', params: {orderId: row.id}})
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
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%'
			}
			this.$http.DownMasterPapersForTeacher(submitData).then((result) => {
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