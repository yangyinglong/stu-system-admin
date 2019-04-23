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
				<!-- <el-form-item style="margin-left: 800px">
					<AddHonor />
				</el-form-item> -->
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 1200px">
			<el-table :data="honorData" v-loading="isDisAble">
				<el-table-column prop="name" label="姓名" width="100"></el-table-column>
				<el-table-column prop="stuId" label="学号" width="120"></el-table-column>
				<el-table-column prop="honorType" label="类型" width="180"></el-table-column>
				<el-table-column prop="honorLevel" label="级别" width="120"></el-table-column>
				<el-table-column prop="honorGrade" label="等级" width="120"></el-table-column>
				<el-table-column prop="getDate" label="获奖日期" width="180"></el-table-column>				
				<el-table-column prop="score" label="得分" width="100"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button>
					<el-button type="text" size="small" @click="examHonor(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
import AddHonor from "@/components/operation/center/honorOper/HonorAdd"
const itermOptions = ['待审核', '已通过']
export default {
	name: 'HonorCenter',
	data () {
		return {
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
	        		score: 0
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
			this.$http.ShowHonorsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.honorData = result.r
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
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
		AddHonor
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>