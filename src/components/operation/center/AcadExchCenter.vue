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
				<el-form-item label="交流类型">
					<el-select v-model="queryData.exchangeType" placeholder="交流类型" size="small" style="width: 125px">
			            <el-option
			              v-for="item in exchangeTypes"
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
			<el-table :data="acadExchData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="exchangeType" label="交流类别" width="100"></el-table-column>
				<el-table-column prop="conferenceName" label="组织结构/会议名称" width="200"></el-table-column>
				<!-- <el-table-column prop="proIntr" label="项目简介" width="100"></el-table-column> -->
				<!-- <el-table-column prop="conferenceName" label="会议名称" width="190"></el-table-column> -->
				<el-table-column prop="startTime" label="开始时间" width="100"></el-table-column>
				<el-table-column prop="endTime" label="结束时间" width="100"></el-table-column>
				<el-table-column prop="level" label="级别" width="80"></el-table-column>
				<el-table-column prop="result" label="交流成果" width="180"></el-table-column>
				<el-table-column prop="score" label="得分" width="100"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)" v-if="scope.row.proofMaterialId != ''">下载材料</el-button>
					<el-button type="text" size="small" @click="examEntrPro(scope.$index, scope.row)" v-if="scope.row.status== '待审核' && isTutor == '1'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPageAcadExch"
				:page-sizes="[10]"
				:page-size="10"
				layout="total, prev, pager, next, jumper"
				:total="acadExchTotal"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'AcadExchCenter',
	data () {
		return {
			currentPageAcadExch: 1,
			allStuAcadExch: 1,
			isDisAble: false,
			loading: true,
			acadExchData: [
				{
					id:'',
					stuId: '',
					name: '',
					exchangeType: '交流类别',
					conferenceName: '会议名称',
					startTime: '开始时间',
					endTime: '结束时间',
					level: '国家级',
					result: '交流论文',
	        		status: '待审核',
	        		score: 0,
	        		proofMaterialId: '',
				}			
			],
			isTutor: '',
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
	        	exchangeType: '',
	        	page: ''
	        },
	        exchangeTypes: [{
	          value: "夏令营",
	          label: "夏令营"
	        },{
	          value: "国际会议",
	          label: "国际会议"
	        },{
	          value: "国内会议",
	          label: "国内会议"
	        },{
	          value: "研究生论坛",
	          label: "研究生论坛"
	        },{
	          value: "学院讲座",
	          label: "学院讲座"
	        },{
	          value: "其他",
	          label: "其他"
	        }],
		}
	},
	created(){
		this.isTutor = sessionStorage.getItem("state")
		this.getSession()
		this.queryForAdmin()
	},
	computed: {
		acadExchTotal() {
			return this.allStuAcadExch
		}
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('stuAcadExchPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('stuAcadExchPage'))
				this.currentPageAcadExch = parseInt(sessionStorage.getItem('stuAcadExchPage'))
			} else {
				this.queryData.page = 1
				this.currentPageAcadExch = 1
			}
			if (sessionStorage.getItem('checkedItermsAcadExch') != null){
				this.checkedIterms = sessionStorage.getItem('checkedItermsAcadExch').split(',')
				this.queryData.status = this.checkedIterms
			} else {
				this.queryData.status = this.checkedIterms
			}
			if (sessionStorage.getItem('allStuAcadExch') != null) {
				this.allStuAcadExch = parseInt(sessionStorage.getItem('allStuAcadExch'))
			} else {
				this.queryAllStuAcadExchNum()
			}
			if (sessionStorage.getItem('stuAcadExchStuId') != null) {
				this.queryData.stuId = sessionStorage.getItem('stuAcadExchStuId')
			}
			if (sessionStorage.getItem('stuAcadExchStuName') != null) {
				this.queryData.stuName = sessionStorage.getItem('stuAcadExchStuName')
			}
		},
		setSession() {
			sessionStorage.setItem('stuAcadExchPage', this.queryData.page),
			sessionStorage.setItem('stuAcadExchStuId', this.queryData.stuId),
			sessionStorage.setItem('stuAcadExchStuName', this.queryData.stuName)
		},
		queryAllStuAcadExchNum() {
			this.queryData.page = 1
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				exchangeType: this.queryData.exchangeType == '' ? '%' : this.queryData.exchangeType,
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowStuAcadExchNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPageAcadExch = 1
					this.allStuAcadExch = result.r
					sessionStorage.setItem('allStuAcadExch' , this.allStuAcadExch)
				} else {
					this.allStuAcadExch = 1
					this.currentPageAcadExch = 1
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
			this.currentPageAcadExch = '1'
			this.queryAllStuAcadExchNum()
			this.queryForAdmin()
		},

		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%',
				exchangeType: this.queryData.exchangeType == '' ? '%' : this.queryData.exchangeType,
				page: this.queryData.page
			}
			this.isDisAble = true
			this.$http.ShowAcadExchsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.acadExchData = result.r
					this.setSession()
				} else {
					this.acadExchData = []
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
			sessionStorage.setItem('checkedItermsAcadExch', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsAcadExch').split(',')
			this.query()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedItermsAcadExch', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedItermsAcadExch').split(',')
			this.query()
		},
		examEntrPro(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('exchangeType', row.exchangeType)
			sessionStorage.setItem('conferenceName', row.conferenceName)
			sessionStorage.setItem('startTime', row.startTime)
			sessionStorage.setItem('endTime', row.endTime)
			sessionStorage.setItem('level', row.level)
			sessionStorage.setItem('result', row.result)
			this.$router.push({name: 'AcadExchExam', params: {orderId: row.id}})
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
				exchangeType: this.queryData.exchangeType == '' ? '%' : this.queryData.exchangeType
			}
			this.$http.DownAcadExchsForTeacher(submitData).then((result) => {
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