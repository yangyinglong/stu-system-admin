<template>
	<div style="margin: 0 auto">
		<br>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="allPrizeData" v-loading="isDisAble">
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="stuId" fixed label="学号" width="90"></el-table-column>
				<el-table-column prop="honorScore" label="荣誉奖励总分" width="110"></el-table-column>
				<el-table-column prop="honorNum" label="荣誉奖励排名" width="110"></el-table-column>
				<el-table-column prop="paperSocre" label="学术论文" width="78"></el-table-column>
				<el-table-column prop="paperNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="patentScore" label="发明专利" width="78"></el-table-column>
				<el-table-column prop="patentNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="competitionScore" label="学科竞赛" width="78"></el-table-column>	
				<el-table-column prop="competitionNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="engiScore" label="工程项目" width="78"></el-table-column>
				<el-table-column prop="engiNum" label="排名" width="78"></el-table-column>			
				<el-table-column prop="entrScore" label="创业项目" width="78"></el-table-column>
				<el-table-column prop="entrNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="innoScore" label="创新项目" width="78"></el-table-column>
				<el-table-column prop="innoNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="exchScore" label="学术交流" width="78"></el-table-column>
				<el-table-column prop="exchNum" label="排名" width="78"></el-table-column>
				<el-table-column prop="workScore" label="就业深造" width="78"></el-table-column>
				<el-table-column prop="workNum" label="排名" width="78"></el-table-column>	
				<el-table-column prop="masterScore" label="硕士论文" width="78"></el-table-column>
				<el-table-column prop="masterNum" label="排名" width="78"></el-table-column>
				<!-- <el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button>
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
				</el-table-column> -->
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
export default {
	name: 'PrizeCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			allPrizeData: [
				{
					id: '',
					stuId: '',
					name: '',
					honorScore: '', //荣誉总分
					honorNum: '', //荣誉数量
					paperSocre: '', //论文总分
					paperNum: '', //论文数量
					patentScore: '', //专利总分
					patentNum: '', //专利数量
					competitionScore: '',//学科竞赛
					competitionNum: '',
					engiScore: '', //工程项目
					engiNum: '',
					entrScore: '', //创业项目
					entrNum: '',
					innoScore: '',//创新项目
					innoNum: '',
					exchScore: '', //学术交流
					exchNum: '',
					workScore: '',// 就业深造
					workNum: '',
					masterScore: '', //硕士论文
					masterNum: '',
					allScore: '',
					allNum: '',
					totalCount: '',
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
			this.$http.ShowPrizesForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.allPrizeData = result.r
				} else {
					this.allPrizeData = []
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