<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 200px">全部
             		</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
	                	<el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
	              	</el-checkbox-group>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="acadExchData" v-loading="isDisAble">
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="stuId" fixed label="学号" width="90"></el-table-column>
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
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button>
					<el-button type="text" size="small" @click="examEntrPro(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
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
	name: 'AcadExchCenter',
	data () {
		return {
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
			checkAll: false,
			isIndeterminate: true,
			checkedIterms: ['待审核'],
        	iterms: itermOptions,
        	queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state"),
	        	status: ['待审核'],
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
			}
			this.isDisAble = true
			this.$http.ShowAcadExchsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.acadExchData = result.r
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
			this.$confirm('文件名 ' + row.proofMaterialId, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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