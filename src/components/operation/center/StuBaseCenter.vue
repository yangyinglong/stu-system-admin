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
					<el-button type="text"  size="small" style="font-size: 16px" @click="downloadInfo">导出数据</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="stuData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="80"></el-table-column>
				<el-table-column prop="sex" label="性别" width="60"></el-table-column>
				<el-table-column prop="masterMajor" label="研究生专业" width="180"></el-table-column>
				<el-table-column prop="phone" label="电话" width="120"></el-table-column>
				<el-table-column prop="eMail" label="邮箱" width="180"></el-table-column>
				<el-table-column prop="politicalOutlook" label="政治面貌" width="120"></el-table-column>
				<!-- <el-table-column prop="uSchool" label="本科学校" width="140"></el-table-column>
				<el-table-column prop="uMajor" label="本科专业" width="150"></el-table-column>
				<el-table-column prop="english" label="英语(入学考试)" width="130"></el-table-column>
				<el-table-column prop="political" label="政治" width="80"></el-table-column>
				<el-table-column prop="math" label="数学" width="80"></el-table-column>	
				<el-table-column prop="specialized" label="专业课" width="80"></el-table-column> -->
				<el-table-column prop="tuturName" label="导师" width="80"></el-table-column>
				<el-table-column prop="counsellorName" label="辅导员" width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<!-- <el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button> -->
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="stuTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StuBaseCenter',
	data () {
		return {			
			currentPage: 1,
			allStuBaseNumber: 1,


			isDisAble: false,
			loading: true,
			stuData: [
				{
					name: '',
					stuId: '',
					phone: '',
					uSchool: '',
					uMajor: '',
					english: '',
					political: '',
					math: '',
					specialized: '',
					tutorId: '',
					counsellorId: '',
					sex: '',
					tuturName: '',
					counsellorName: '',
					languagesTypes: '',
					languagesScore: '',
					idCard: '',
				    masterMajor: '',
				    politicalOutlook: '',
				    biogenicLand: '',  // 生源地
				    masterDirection: '',  // 研究方向
				    eMail: '',
				    emergencyContact: '',
				    emergencyPhone: '',
				    secretary: '',  // 研究生秘书
				    averageScore: '',
 					currNumber: '',
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
		stuTotal() {
			return this.allStuBaseNumber
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuBasePage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuBasePage'))
				this.currentPage = parseInt(sessionStorage.getItem('stuBasePage'))
			} else {
				this.queryData.page = 1
				this.currentPage = 1
			}
			if (sessionStorage.getItem('allStuBaseNumber') != null) {
				this.allStuBaseNumber = parseInt(sessionStorage.getItem('allStuBaseNumber'))
			} else {
				this.queryAllStuBaseNum()
			}
			if (sessionStorage.getItem('stuBaseStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuBaseStuId')
			}
			if (sessionStorage.getItem('stuBaseStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuBaseStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuBasePage', this.queryData.page),
			sessionStorage.setItem('stuBaseStuId', this.queryData.stuId),
			sessionStorage.setItem('stuBaseStuName', this.queryData.stuName)
		},
		queryAllStuBaseNum() {
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
			this.$http.ShowStuBaseNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPage = 1
					this.allStuBaseNumber = result.r
					sessionStorage.setItem('allStuBaseNumber' , this.allStuBaseNumber)
				} else {
					this.allStuBaseNumber = 1
					this.currentPage = 1
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
			this.$http.ShowStusForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.stuData = result.r
					this.setSession()
				} else {
					this.stuData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		query() {
			this.queryData.status = this.checkedIterms
			this.currentPage = '1'
			this.queryAllStuBaseNum()
			this.queryForAdmin()
		},
		showDetails(index, row){
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('phone', row.phone)
			sessionStorage.setItem('uSchool', row.uSchool)
			sessionStorage.setItem('uMajor', row.uMajor)
			sessionStorage.setItem('english', row.english)
			sessionStorage.setItem('political', row.political)
			sessionStorage.setItem('math', row.math)
			sessionStorage.setItem('specialized', row.specialized)
			sessionStorage.setItem('sex', row.sex)
			sessionStorage.setItem('tuturName', row.tuturName)
			sessionStorage.setItem('counsellorName', row.counsellorName)
			sessionStorage.setItem('idCard', row.idCard)
			sessionStorage.setItem('masterMajor', row.masterMajor)
			sessionStorage.setItem('politicalOutlook', row.politicalOutlook)
			sessionStorage.setItem('biogenicLand', row.biogenicLand)
			sessionStorage.setItem('masterDirection', row.masterDirection)
			sessionStorage.setItem('eMail', row.eMail)
			sessionStorage.setItem('emergencyContact', row.emergencyContact)
			sessionStorage.setItem('emergencyPhone', row.emergencyPhone)
			sessionStorage.setItem('secretary', row.secretary)
			sessionStorage.setItem('averageScore', row.averageScore)
			sessionStorage.setItem('currNumber', row.currNumber)
			sessionStorage.setItem('languagesTypes', row.languagesTypes)
			sessionStorage.setItem('languagesScore', row.languagesScore)
			this.$router.push({name: 'BaseInfoShow', params: {orderId: row.id}})
		},
		downloadInfo() {
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%'
			}
			this.$http.DownStusForTeacher(submitData).then((result) => {
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