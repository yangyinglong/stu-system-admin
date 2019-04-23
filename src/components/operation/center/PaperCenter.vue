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
					<AddPaper />
				</el-form-item> -->
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 1200px">
			<el-table :data="paperData" v-loading="isDisAble">
				<el-table-column prop="paperTitle" label="题目" width="220"></el-table-column>
				<el-table-column prop="paperGrade" label="级别" width="70"></el-table-column>
				<el-table-column prop="journalTitle" label="期刊名称" width="240"></el-table-column>
				<el-table-column prop="ranking" label="作者排名" width="100"></el-table-column>
				<el-table-column prop="totalNumber" label="作者人数" width="80"></el-table-column>
				<el-table-column prop="paperState" label="论文状态" width="80"></el-table-column>
				<el-table-column prop="getDate" label="时间" width="100"></el-table-column>
				<el-table-column prop="score" label="得分" width="100"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button>
					<el-button type="text" size="small" @click="examPaper(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
import AddPaper from "@/components/operation/center/paperOper/PaperAdd"
const itermOptions = ['待审核', '已通过']
export default {
	name: 'PaperCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			paperData: [
				{
					paperTitle: '一种新型的马达受力分析',
					paperGrade: "SCI一区",
					journalTitle: "Nanoscience＆Nanotechnology",
					ranking: 1,
					totalNumber: 3,
					paperState: "投稿",
	        		status: '待审核',
	        		getDate: '',
	        		score: 0
				}			
			],
			checkAll: false,
			isIndeterminate: true,
			checkedIterms: ['待审核'],
        	iterms: itermOptions,
        	queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	status: ['待审核'],
	        	state: sessionStorage.getItem("state"),
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
			this.$http.ShowPapersForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.paperData = result.r
				} else {
					this.paperData = []
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
		examPaper(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('paperTitle', row.paperTitle)
			sessionStorage.setItem('paperGrade', row.paperGrade)
			sessionStorage.setItem('journalTitle', row.journalTitle)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('paperState', row.paperState)
			sessionStorage.setItem('getDate', row.getDate)
			sessionStorage.setItem('status', row.status)
			this.$router.push({name: 'PaperExam', params: {orderId: row.id}})
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
		AddPaper
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>