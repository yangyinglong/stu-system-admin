<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<!-- <el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 200px">全部
             		</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
	                	<el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
	              	</el-checkbox-group>
				</el-form-item> -->
				<el-form-item style="margin-left: 800px">
					<button> 下载文件</button>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="stuData" v-loading="isDisAble">
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="stuId" fixed label="学号" width="90"></el-table-column>
				<el-table-column prop="sex" label="性别" width="60"></el-table-column>
				<el-table-column prop="phone" label="电话" width="120"></el-table-column>
				<el-table-column prop="uSchool" label="本科学校" width="140"></el-table-column>
				<el-table-column prop="uMajor" label="本科专业" width="150"></el-table-column>
				<el-table-column prop="english" label="英语(入学考试)" width="130"></el-table-column>
				<el-table-column prop="political" label="政治" width="80"></el-table-column>
				<el-table-column prop="math" label="数学" width="80"></el-table-column>	
				<el-table-column prop="specialized" label="专业课" width="80"></el-table-column>
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
	</div>
</template>

<script>
export default {
	name: 'StuBaseCenter',
	data () {
		return {
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
				}			
			],
			queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state")
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
			this.$http.ShowStusForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.stuData = result.r
				} else {
					this.stuData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		showDetails(index, row){
			// sessionStorage.setItem('id', row.id)
			// sessionStorage.setItem('name', row.name)
			// sessionStorage.setItem('stuId', row.stuId)
			// sessionStorage.setItem('companyName', row.companyName)
			// sessionStorage.setItem('companyType', row.companyType)
			// sessionStorage.setItem('workType', row.workType)
			// sessionStorage.setItem('getDate', row.getDate)
			// this.$router.push({name: 'WorkExam', params: {orderId: row.id}})
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