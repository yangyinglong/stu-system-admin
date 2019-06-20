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
				<el-form-item label="专利类别">
					<el-select v-model="queryData.patentType" placeholder="专利类别" size="small" style="width: 125px">
			            <el-option
			              v-for="item in patentTypes"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
		          	</el-select>  
				</el-form-item>
				<el-form-item label="专利状态">
					<el-select v-model="queryData.patentState" placeholder="专利状态" size="small" style="width: 85px">
			            <el-option
			              v-for="item in patentStates"
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
			<el-table :data="patentData" v-loading="isDisAble">
				<el-table-column prop="stuId" label="学号" width="100"></el-table-column>
				<el-table-column prop="name" label="姓名" width="70"></el-table-column>
				<el-table-column prop="patentName" label="名称" width="240"></el-table-column>
				<el-table-column prop="patentType" label="类别" width="120"></el-table-column>
				<el-table-column prop="ranking" label="发明人排名" width="100"></el-table-column>
				<el-table-column prop="totalNumber" label="发明人数" width="100"></el-table-column>
				<el-table-column prop="patentState" label="专利状态" width="100"></el-table-column>
				<el-table-column prop="getDate" label="时间" width="100"></el-table-column>
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="examPatent(scope.$index, scope.row)" v-if="scope.row.status== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPagePatent"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="patentTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'PatentCenter',
	data () {
		return {
			isTutor:'',
			currentPagePatent: 1,
			allStuPatent: 1,
			isDisAble: false,
			loading: true,
			patentData: [
				{
					name: '',
					stuId: '',
					patentName: '一种新型的马达受力分析',
					patentType: "实用新型专利",
					patentState: "申请",
					score: 0,
					ranking: 1,
					totalNumber: 3,
	        		status: '待审核',
	        		getDate: '2019-09-09',
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
	        	patentType: '',
	        	patentState: '',
	        	page: ''
	        },
	        patentTypes: [{
	          value: 1,
	          label: "实用新型专利"
	        },{
	          value: 2,
	          label: "发明专利"
	        }],
	        patentStates: [{
	          value: 1,
	          label: "申请"
	        },{
	          value: 2,
	          label: "受理"
	        },{
	          value: 3,
	          label: "审查中"
	        },{
	          value: 4,
	          label: "一审"
	        },{
	          value: 5,
	          label: "二审"
	        },{
	          value: 6,
	          label: "三审"
	        },{
	          value: 7,
	          label: "授权"
	        }],
		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		patentTotal() {
			return this.allStuPatent
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuPatentPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuPatentPage'))
				this.currentPagePatent = parseInt(sessionStorage.getItem('stuPatentPage'))
			} else {
				this.queryData.page = 1
				this.currentPagePatent = 1
			}
			if (sessionStorage.getItem('checkedItermsPatent') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsPatent').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuPatent') != null) {
				this.allStuPatent = parseInt(sessionStorage.getItem('allStuPatent'))
			} else {
				this.queryAllStuPatentNum()
			}
			if (sessionStorage.getItem('stuPatentStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuPatentStuId')
			}
			if (sessionStorage.getItem('stuPatentStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuPatentStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuPatentPage', this.queryData.page),
			sessionStorage.setItem('stuPatentStuId', this.queryData.stuId),
			sessionStorage.setItem('stuPatentStuName', this.queryData.stuName)
		},
		queryAllStuPatentNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				patentType: this.queryData.patentType == '' ? '%' : this.queryData.patentType,
	        	patentState: this.queryData.patentState == '' ? '%' : this.queryData.patentState,
	        	page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuPatentNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPagePatent = 1
					this.allStuPatent = result.r
					sessionStorage.setItem('allStuPatent' , this.allStuPatent)
				} else {
					this.allStuPatent = 1
					this.currentPagePatent = 1
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
			this.currentPagePatent = '1'
			this.queryAllStuPatentNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				patentType: this.queryData.patentType == '' ? '%' : this.queryData.patentType,
	        	patentState: this.queryData.patentState == '' ? '%' : this.queryData.patentState,
	        	page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowPatentsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.patentData = result.r
					this.setSession()
				} else {
					this.patentData = []
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
			sessionStorage.setItem('checkedItermsPatent', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsPatent').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsPatent', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsPatent').split(',')
			this.query()
		},
		examPatent(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('patentName', row.patentName)
			sessionStorage.setItem('patentType', row.patentType)
			sessionStorage.setItem('patentState', row.patentState)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('getDate', row.getDate)
			this.$router.push({name: 'PatentExam', params: {orderId: row.id}})
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
				patentType: this.queryData.patentType == '' ? '%' : this.queryData.patentType,
	        	patentState: this.queryData.patentState == '' ? '%' : this.queryData.patentState
			}
			this.$http.DownPatentsForTeacher(submitData).then((result) => {
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