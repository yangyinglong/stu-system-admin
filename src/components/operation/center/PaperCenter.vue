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
					<el-input v-model="queryData.stuId" placeholder="学号" style="width: 100px; margin-right: 10px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="queryData.stuName" placeholder="姓名" style="width: 100px; margin-right: 10px" size="small"></el-input>
				</el-form-item>
				<el-form-item label="论文级别">
					<el-select v-model="queryData.paperGrade" placeholder="论文级别" size="small" style="width: 125px">
			            <el-option
			              v-for="item in paperGrades"
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
		<div style="margin-left: 20px; min-height: 465px; width: 1200px">
			<el-table :data="paperData" v-loading="isDisAble">
				<el-table-column prop="stuId" label="学号" width="100"></el-table-column>
				<el-table-column prop="name" label="姓名" width="70"></el-table-column>
				<el-table-column prop="paperTitle" label="题目" width="200"></el-table-column>
				<el-table-column prop="paperGrade" label="级别" width="70"></el-table-column>
				<el-table-column prop="journalTitle" label="期刊名称" width="220"></el-table-column>
				<el-table-column prop="ranking" label="作者排名" width="50"></el-table-column>
				<el-table-column prop="totalNumber" label="作者人数" width="50"></el-table-column>
				<el-table-column prop="paperState" label="论文状态" width="80"></el-table-column>
				<el-table-column prop="getDate" label="时间" width="100"></el-table-column>
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="examPaper(scope.$index, scope.row)" v-if="scope.row.status== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPagePaper"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="paperTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'PaperCenter',
	data () {
		return {
			isTutor:'',
			currentPagePaper: 1,
			allStuPaper: 1,
			isDisAble: false,
			loading: true,
			paperData: [
				{
					stuId: '',
					name: '',
					paperTitle: '一种新型的马达受力分析',
					paperGrade: "SCI一区",
					journalTitle: "Nanoscience＆Nanotechnology",
					ranking: 1,
					totalNumber: 3,
					paperState: "投稿",
	        		status: '待审核',
	        		getDate: '',
	        		score: 0
				}			
			],
			checkAll: false,
			isIndeterminate: true,
			checkedIterms: ['待审核'],
        	iterms: itermOptions,
        	queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	status: ['待审核'],
	        	state: sessionStorage.getItem("state"),
	        	stuId: '',
	        	stuName: '',
	        	paperGrade: '',
	        	page: ''
	        },
	        paperGrades: [{
	          value: 1,
	          label: "一般"
	        },{
	          value: 2,
	          label: "核心"
	        },{
	          value: 3,
	          label: "一级"
	        },{
	          value: 4,
	          label: "EI"
	        },{
	          value: 5,
	          label: "SCI一区"
	        },{
	          value: 6,
	          label: "SCI二区"
	        },{
	          value: 7,
	          label: "SCI三区"
	        },{
	          value: 8,
	          label: "SCI四区"
	        }],
		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		paperTotal() {
			return this.allStuPaper
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuPaperPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuPaperPage'))
				this.currentPagePaper = parseInt(sessionStorage.getItem('stuPaperPage'))
			} else {
				this.queryData.page = 1
				this.currentPagePaper = 1
			}
			if (sessionStorage.getItem('checkedItermsPaper') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsPaper').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuPaper') != null) {
				this.allStuPaper = parseInt(sessionStorage.getItem('allStuPaper'))
			} else {
				this.queryAllStuPaperNum()
			}
			if (sessionStorage.getItem('stuPaperStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuPaperStuId')
			}
			if (sessionStorage.getItem('stuPaperStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuPaperStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuPaperPage', this.queryData.page),
			sessionStorage.setItem('stuPaperStuId', this.queryData.stuId),
			sessionStorage.setItem('stuPaperStuName', this.queryData.stuName)
		},
		queryAllStuPaperNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				paperGrade: this.queryData.paperGrade == '' ? '%' : this.queryData.paperGrade,
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuPaperNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPagePaper = 1
					this.allStuPaper = result.r
					sessionStorage.setItem('allStuPaper' , this.allStuPaper)
				} else {
					this.allStuPaper = 1
					this.currentPagePaper = 1
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
			this.currentPagePaper = '1'
			this.queryAllStuPaperNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				paperGrade: this.queryData.paperGrade == '' ? '%' : this.queryData.paperGrade,
				page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowPapersForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.paperData = result.r
					this.setSession()
				} else {
					this.paperData = []
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
			sessionStorage.setItem('checkedItermsPaper', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsPaper').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsPaper', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsPaper').split(',')
			this.query()
		},
		examPaper(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('paperTitle', row.paperTitle)
			sessionStorage.setItem('paperGrade', row.paperGrade)
			sessionStorage.setItem('journalTitle', row.journalTitle)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('paperState', row.paperState)
			sessionStorage.setItem('getDate', row.getDate)
			sessionStorage.setItem('status', row.status)
			this.$router.push({name: 'PaperExam', params: {orderId: row.id}})
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
				paperGrade: this.queryData.paperGrade == '' ? '%' : this.queryData.paperGrade
			}
			this.$http.DownPapersForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					window.open('http://129.204.15.161:7070/api/file/downloadExcel?fileName=' + result.r)
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