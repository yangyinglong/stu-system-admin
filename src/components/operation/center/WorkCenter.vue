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
				<el-form-item label="类型">
					<el-select v-model="queryData.workType" placeholder="类型" size="small" style="width: 125px">
			            <el-option
			              v-for="item in workTypes"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
		          	</el-select>  
				</el-form-item>
				<!-- <el-form-item label="">
					<el-select v-model="queryData.honorLevel" placeholder="荣誉级别"  size="small" style="width: 100px; font-size: 10px">
			            <el-option
			              v-for="item in honorLevels"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
			          </el-select>  
			        </el-form-item>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="query" :disabled="isDisAble"  size="small">查询</el-button>
				</el-form-item>
				<el-form-item >
					<el-button type="primary"  size="small"  @click="downloadInfo">导出数据</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="workData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="workType" fixed label="就业深造类型" width="120"></el-table-column>
				<el-table-column prop="companyName" fixed label="单位/学校名称" width="220"></el-table-column>
				<el-table-column prop="isCmp" label="是否专业对口" width="105"></el-table-column>
				<el-table-column prop="workClass" label="职位类别/专业名称" width="180"></el-table-column>
				<el-table-column prop="companyType" label="单位性质/创业内容" width="220"></el-table-column>
				<el-table-column prop="address" label="具体省市" width="140"></el-table-column>
				<el-table-column prop="getDate" label="日期" width="100"></el-table-column>

				<el-table-column prop="score" label="得分" width="60"></el-table-column>
				<el-table-column prop="status" label="状态" width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="70">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)" v-if="scope.row.status== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPageWork"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="workTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'WorkCenter',
	data () {
		return {
			isTutor: '',
			currentPageWork: 1,
			allStuWork: 1,
			isDisAble: false,
			loading: true,
			workData: [
				{
					id:'',
					name: '',
					stuId: '',
					workType: '',
					companyName: '',
					isCmp: '',
					companyType: '',
					workClass: '',
					address: '',
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
	        	workType: '',
	        	page: ''
	        },
	        workTypes: [{
	          value: '就业',
	          label: '就业'
	        },{
	          value: '国内升学',
	          label: '国内升学'
	        },{
	          value: '出国(境)留学',
	          label: '出国(境)留学'
	        },{
	          value: '自主创业',
	          label: '自主创业'
	        }],
		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		workTotal() {
			return this.allStuWork
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuWorkPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuWorkPage'))
				this.currentPageWork = parseInt(sessionStorage.getItem('stuWorkPage'))
			} else {
				this.queryData.page = 1
				this.currentPageWork = 1
			}
			if (sessionStorage.getItem('checkedItermsWork') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsWork').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuWork') != null) {
				this.allStuWork = parseInt(sessionStorage.getItem('allStuWork'))
			} else {
				this.queryAllStuWorkNum()
			}
			if (sessionStorage.getItem('stuWorkStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuWorkStuId')
			}
			if (sessionStorage.getItem('stuWorkStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuWorkStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuWorkPage', this.queryData.page),
			sessionStorage.setItem('stuWorkStuId', this.queryData.stuId),
			sessionStorage.setItem('stuWorkStuName', this.queryData.stuName)
		},
		queryAllStuWorkNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				workType: this.queryData.workType == '' ? '%' : this.queryData.workType,
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuWorkNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPageWork = 1
					this.allStuWork = result.r
					sessionStorage.setItem('allStuWork' , this.allStuWork)
				} else {
					this.allStuWork = 1
					this.currentPageWork = 1
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
			this.currentPageWork = '1'
			this.queryAllStuWorkNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				workType: this.queryData.workType == '' ? '%' : this.queryData.workType,
				page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowWorksForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.workData = result.r
					this.setSession()
				} else {
					this.workData = []
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
			sessionStorage.setItem('checkedItermsWork', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsWork').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsWork', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsWork').split(',')
			this.query()
		},
		showDetails(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('workType', row.workType)
			sessionStorage.setItem('companyName', row.companyName)
			sessionStorage.setItem('isCmp', row.isCmp)
			sessionStorage.setItem('companyType', row.companyType)
			sessionStorage.setItem('workClass', row.workClass)
			sessionStorage.setItem('address', row.address)
			sessionStorage.setItem('getDate', row.getDate)
			this.$router.push({name: 'WorkExam', params: {orderId: row.id}})
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
				workType: this.queryData.workType == '' ? '%' : this.queryData.workType
			}
			this.$http.DownWorksForTeacher(submitData).then((result) => {
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