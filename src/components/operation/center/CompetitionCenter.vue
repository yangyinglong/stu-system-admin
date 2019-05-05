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
					<AddCompetition />
				</el-form-item> -->
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="competitionData" v-loading="isDisAble">
				<el-table-column prop="name" label="姓名" width="70"></el-table-column>
				<el-table-column prop="stuId" label="学号" width="90"></el-table-column>
				<el-table-column prop="competitionType" label="类型" width="90"></el-table-column>
				<el-table-column prop="competitionName" label="名称" width="140"></el-table-column>
				<el-table-column prop="competitionState" label="竞赛状态" width="100"></el-table-column>
				<el-table-column prop="competitionLevel" label="级别" width="70"></el-table-column>
				<el-table-column prop="competitionPrize" label="等级" width="70"></el-table-column>
				<el-table-column prop="ranking" label="参赛排名" width="60"></el-table-column>
				<el-table-column prop="totalNumber" label="参赛人数" width="60"></el-table-column>
				<el-table-column prop="teacher" label="指导老师" width="80"></el-table-column>
				<el-table-column prop="getDate" label="获奖日期" width="100"></el-table-column>				
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button>
					<el-button type="text" size="small" @click="examCompetition(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">审核</el-button>
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
	name: 'CompetitionCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			competitionData: [
				{
					id:'',
					name: '',
					stuId: '',
					competitionType: '大学生创新创业',
					competitionName: '竞赛项目名称',
					ranking: 1,
					totalNumber: 3,
					competitionState: '竞赛进行初期',
					competitionPrize: '一等奖',
					competitionLevel: '国家级',
					teacher: '郭倩',
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
			this.$http.ShowCompetitionsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.competitionData = result.r
				} else {
					this.competitionData = []
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
		examCompetition(index, row){
			sessionStorage.setItem('id', row.id)
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('competitionType', row.competitionType)
			sessionStorage.setItem('competitionName', row.competitionName)
			sessionStorage.setItem('competitionState', row.competitionState)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('getDate', row.getDate)
			sessionStorage.setItem('competitionPrize', row.competitionPrize)
			sessionStorage.setItem('competitionLevel', row.competitionLevel)
			sessionStorage.setItem('teacher', row.teacher)
			this.$router.push({name: 'CompetitionExam', params: {orderId: row.id}})
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