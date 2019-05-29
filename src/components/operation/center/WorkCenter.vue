<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 100px">全部
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
					<el-button type="primary" @click="queryForAdmin" :disabled="isDisAble" size="small">查询</el-button>
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
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
const itermOptions = ['待审核', '已通过']
export default {
	name: 'WorkCenter',
	data () {
		return {
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
	        	stuName: ''
	        },
		}
	},
	created(){
		this.queryForAdmin()
	},
	computed: {
    },
	methods: {
		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
				stuId: this.queryData.stuId == '' ? '%' : this.queryData.stuId + '%',
				stuName: this.queryData.stuName == '' ? '%' : '%' + this.queryData.stuName + '%'
			}
			this.isDisAble = true
			this.$http.ShowWorksForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.workData = result.r
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
			sessionStorage.setItem('checkedIterms', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedIterms').split(',')
			this.queryForAdmin()
		},
		handleCheckedItermsChange(value) {
			let checkedCount = value.length
			this.checkAll = checkedCount === this.iterms.length
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
			if (this.checkedIterms.length == 0) {
				return
			}
			sessionStorage.setItem('checkedIterms', this.checkedIterms)
			this.queryData.status = sessionStorage.getItem('checkedIterms').split(',')
			this.queryForAdmin()
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