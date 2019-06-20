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
				<el-form-item label="大类">
					<el-select v-model="queryData.proClass" placeholder="大类" size="small" style="width: 125px">
			            <el-option
			              v-for="item in proClasses"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
		          	</el-select>  
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="queryData.proType" placeholder="类别" style="width: 125px" v-if="queryData.proClass === '创新项目'">
			            <el-option
			              v-for="item in proTypes1"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
			          </el-select>
			          <el-select v-model="queryData.proType" placeholder="类别" style="width: 125px" v-else-if="queryData.proClass === '创业项目'">
			            <el-option
			              v-for="item in proTypes2"
			              :key="item.value"
			              :label="item.label"
			              :value="item.value">
			            </el-option>
			          </el-select>
			          <el-select v-model="queryData.proType" placeholder="类别" style="width: 125px"  disabled v-else>
			            <el-option
			              v-for="item in proTypes3"
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
			<el-table :data="projectData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="proClass" label="项目大类" width="130"></el-table-column>
				<el-table-column prop="proType" label="项目类型" width="140"></el-table-column>

				<el-table-column prop="proName" label="项目名称" width="300"></el-table-column>
				
				<<!-- el-table-column prop="proState" label="项目状态" width="80"></el-table-column>
				<el-table-column prop="proLevel" label="项目级别" width="80"></el-table-column>
				<el-table-column prop="ranking" label="参赛排名" width="80"></el-table-column>
				<el-table-column prop="totalNumber" label="参赛人数" width="80"></el-table-column>
				<el-table-column prop="proTeacher" label="指导老师" width="80"></el-table-column>
				<el-table-column prop="proTime" label="日期" width="100"></el-table-column>
				<el-table-column prop="proResult" label="项目成果" width="100"></el-table-column>	 -->
				<el-table-column prop="proState" label="项目状态" width="100"></el-table-column>
				<el-table-column prop="state" label="状态" width="70"></el-table-column>
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="showProject(scope.$index, scope.row)">详情</el-button>
					<el-button type="text" size="small" @click="examProject(scope.$index, scope.row)" v-if="scope.row.state== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPageProject"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="projectTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'InnoProCenter',
	data () {
		return {
			isTutor:'',
			currentPageProject: 1,
			allStuProject: 1,
			isDisAble: false,
			loading: true,
			projectData: [
				{
					id:'',
					name: '',
					stuId: '',
					proClass: '创新项目',
					proName: '大学生创新项目测试数据1',
					proType: '创业孵化项目', //
					proLevel: '国家级',
					ranking: 1,
					totalNumber: 3,
					proState: '竞赛进行初期',
					proResult: '创业成果',					
					proTeacher: '郭倩',
					proTime: '2018-12-13',
	        		state: '待审核',
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
	        	proClass: '',
	        	proType: '',
	        	page: ''
	        },
	        proClasses: [{
	          value: '创新项目',
	          label: '创新项目'
	        },{
	          value: '创业项目',
	          label: '创业项目'
	        },{
	          value: '工程项目',
	          label: '工程项目'
	        }],

	        proTypes2: [{
	          value: "新苗计划",
	          label: "新苗计划"
	        },{
	          value: "创新创业孵化项目",
	          label: "创新创业孵化项目"
	        },{
	          value: "科技成果推广项目",
	          label: "科技成果推广项目"
	        },{
	          value: "科技推广项目",
	          label: "科技推广项目"
	        },{
	          value: "优秀论文资助项目",
	          label: "优秀论文资助项目"
	        },{
	          value: "其他项目",
	          label: "其他项目"
	        }],
	        proTypes1: [{
	          value: "创业孵化项目",
	          label: "创业孵化项目"
	        },{
	          value: "互联网创业项目",
	          label: "互联网创业项目"
	        },{
	          value: "个人创业项目",
	          label: "个人创业项目"
	        },{
	          value: "其他项目",
	          label: "其他项目"
	        }],

		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		projectTotal() {
			return this.allStuProject
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuProjectPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuProjectPage'))
				this.currentPageProject = parseInt(sessionStorage.getItem('stuProjectPage'))
			} else {
				this.queryData.page = 1
				this.currentPageProject = 1
			}
			if (sessionStorage.getItem('checkedItermsProject') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsProject').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuProject') != null) {
				this.allStuProject = parseInt(sessionStorage.getItem('allStuProject'))
			} else {
				this.queryAllStuProjectNum()
			}
			if (sessionStorage.getItem('stuProjectStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuProjectStuId')
			}
			if (sessionStorage.getItem('stuProjectStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuProjectStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuProjectPage', this.queryData.page),
			sessionStorage.setItem('stuProjectStuId', this.queryData.stuId),
			sessionStorage.setItem('stuProjectStuName', this.queryData.stuName)
		},
		queryAllStuProjectNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				proClass: this.queryData.proClass == '' ? '%' : this.queryData.proClass,
	        	proType: this.queryData.proType == '' || this.queryData.proClass == '工程项目' ? '%' : this.queryData.proType,
	        	page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuProjectNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPageProject = 1
					this.allStuProject = result.r
					sessionStorage.setItem('allStuProject' , this.allStuProject)
				} else {
					this.allStuProject = 1
					this.currentPageProject = 1
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
			this.currentPageProject = '1'
			this.queryAllStuProjectNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
	        	proClass: this.queryData.proClass == '' ? '%' : this.queryData.proClass,
	        	proType: this.queryData.proType == '' || this.queryData.proClass == '工程项目' ? '%' : this.queryData.proType,
	        	page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowProjectsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.projectData = result.r
					this.setSession()
				} else {
					this.projectData = []
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
			sessionStorage.setItem('checkedItermsProject', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsProject').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsProject', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsProject').split(',')
			this.query()
		},
		examProject(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('proName', row.proName)
			sessionStorage.setItem('proType', row.proType)
			sessionStorage.setItem('proClass', row.proClass)
			sessionStorage.setItem('proState', row.proState)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('proTime', row.proTime)
			sessionStorage.setItem('proLevel', row.proLevel)
			sessionStorage.setItem('proResult', row.proResult)
			sessionStorage.setItem('proTeacher', row.proTeacher)
			this.$router.push({name: 'ProjectExam', params: {orderId: row.id}})
		},
		showProject(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('proName', row.proName)
			sessionStorage.setItem('proType', row.proType)
			sessionStorage.setItem('proClass', row.proClass)
			sessionStorage.setItem('proState', row.proState)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('proTime', row.proTime)
			sessionStorage.setItem('proLevel', row.proLevel)
			sessionStorage.setItem('proResult', row.proResult)
			sessionStorage.setItem('proTeacher', row.proTeacher)
			this.$router.push({name: 'ProjectShow', params: {orderId: row.id}})
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
				proClass: this.queryData.proClass == '' ? '%' : this.queryData.proClass,
	        	proType: this.queryData.proType == '' || this.queryData.proClass == '工程项目' ? '%' : this.queryData.proType
			}
			this.$http.DownProjectsForTeacher(submitData).then((result) => {
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