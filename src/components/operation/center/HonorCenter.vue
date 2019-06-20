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
				<el-form-item label="荣誉类型">
					<el-select v-model="queryData.honorType" placeholder="荣誉类型" size="small" style="width: 125px">
			            <el-option
			              v-for="item in honorTypes"
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
		<div style="margin-left: 20px; min-height: 465px; width: 1200px">
			<el-table :data="honorData" v-loading="isDisAble">
				<el-table-column prop="stuId" label="学号" width="120"></el-table-column>
				<el-table-column prop="name" label="姓名" width="100"></el-table-column>
				<el-table-column prop="honorType" label="类型" width="180"></el-table-column>
				<el-table-column prop="honorLevel" label="级别" width="120"></el-table-column>
				<el-table-column prop="honorGrade" label="等级" width="120"></el-table-column>
				<el-table-column prop="getDate" label="获奖日期" width="180"></el-table-column>				
				<el-table-column prop="score" label="得分" width="100"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="examHonor(scope.$index, scope.row)" v-if="scope.row.status== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPageHonor"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="honorTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'HonorCenter',
	data () {
		return {
			isTutor:'',
			currentPageHonor: 1,
			allStuHonor: 1,
			isDisAble: false,
			loading: true,
			honorData: [
				{
					id: '',
					name: '王璐璐',
					stuId: '100001',
					getDate: '2018-12-13',
					honorType: "本科生奖学金",
					honorLevel: "国家级",
					honorGrade: "一等",
	        		status: '待审核',
	        		score: 0,
	        		proofMaterialId: '',
				}			
			],
			honorTypes: [{
			  value: 1,
			  label: "国家奖学金"
			},{
			  value: 2,
			  label: "研究生奖学金"
			},{
			  value: 3,
			  label: "企业奖学金"
			},{
			  value: 4,
			  label: "优秀毕业生"
			},{
			  value: 6,
			  label: "优秀班干部"
			},{
			  value: 7,
			  label: "优秀党支书"
			},{
			  value: 8,
			  label: "优秀团支书"
			},{
			  value: 9,
			  label: "十佳大学生"
			},{
			  value: 10,
			  label: "其他"
			}],
			honorLevels: [{
			  value: 1,
			  label: "国家级"
			},{
			  value: 2,
			  label: "省级"
			},{
			  value: 3,
			  label: "企业"
			},{
			  value: 4,
			  label: "校级"
			}],
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
	        	honorType: '',
	        	page: 1
	        },
		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		honorTotal() {
			return this.allStuHonor
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuPrizePage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuPrizePage'))
				this.currentPageHonor = parseInt(sessionStorage.getItem('stuPrizePage'))
			} else {
				this.queryData.page = 1
				this.currentPageHonor = 1
			}
			if (sessionStorage.getItem('checkedItermsHonor') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsHonor').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuHonor') != null) {
				this.allStuHonor = parseInt(sessionStorage.getItem('allStuHonor'))
			} else {
				this.queryAllStuHonorNum()
			}
			if (sessionStorage.getItem('stuHonorStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuHonorStuId')
			}
			if (sessionStorage.getItem('stuHonorStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuHonorStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuPrizePage', this.queryData.page),
			sessionStorage.setItem('stuHonorStuId', this.queryData.stuId),
			sessionStorage.setItem('stuHonorStuName', this.queryData.stuName)
		},
		queryAllStuHonorNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				honorType: this.queryData.honorType == '' ? '%' : this.queryData.honorType,
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuHonorNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPageHonor = 1
					this.allStuHonor = result.r
					sessionStorage.setItem('allStuHonor' , this.allStuHonor)
				} else {
					this.allStuHonor = 1
					this.currentPageHonor = 1
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
			this.currentPageHonor = '1'
			this.queryAllStuHonorNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				honorType: this.queryData.honorType == '' ? '%' : this.queryData.honorType,
				page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowHonorsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.honorData = result.r
					this.setSession()
				} else {
					this.honorData = []
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
			sessionStorage.setItem('checkedItermsHonor', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsHonor').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsHonor', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsHonor').split(',')
			this.query()
		},
		examHonor(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('getDate', row.getDate)
			sessionStorage.setItem('honorType', row.honorType)
			sessionStorage.setItem('honorLevel', row.honorLevel)
			sessionStorage.setItem('honorGrade', row.honorGrade)
			this.$router.push({name: 'HonorExam', params: {orderId: row.id}})
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
				honorType: this.queryData.honorType == '' ? '%' : this.queryData.honorType
			}
			this.$http.DownHonorsForTeacher(submitData).then((result) => {
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