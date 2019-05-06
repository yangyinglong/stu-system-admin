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
					<AddEntrPro />
				</el-form-item> -->
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="entrProData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="70"></el-table-column>
				<el-table-column prop="proType" label="类型" width="120"></el-table-column>
				<el-table-column prop="proName" label="名称" width="150"></el-table-column>
				<el-table-column prop="proState" label="项目状态" width="80"></el-table-column>
				<el-table-column prop="proLevel" label="项目级别" width="80"></el-table-column>
				<el-table-column prop="ranking" label="参赛排名" width="80"></el-table-column>
				<el-table-column prop="totalNumber" label="参赛人数" width="80"></el-table-column>
				<el-table-column prop="teacher" label="指导老师" width="80"></el-table-column>
				<el-table-column prop="getDate" label="日期" width="100"></el-table-column>
				<el-table-column prop="proResult" label="项目成果" width="120"></el-table-column>	
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
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
	name: 'EntrProCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			entrProData: [
				{
					id:'',
					name: '苏明玉',
					stuId: '15200123',
					proName: '大学生创新项目测试数据1',
					proType: '创业孵化项目', //
					ranking: 1,
					totalNumber: 3,
					proState: '竞赛进行初期',
					proResult: '创业成果',
					proLevel: '国家级',
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
			this.$http.ShowEntrProsForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.entrProData = result.r
				} else {
					this.entrProData = []
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
			sessionStorage.setItem('proName', row.proName)
			sessionStorage.setItem('proType', row.proType)
			sessionStorage.setItem('proState', row.proState)
			sessionStorage.setItem('ranking', row.ranking)
			sessionStorage.setItem('totalNumber', row.totalNumber)
			sessionStorage.setItem('getDate', row.getDate)
			sessionStorage.setItem('proLevel', row.proLevel)
			sessionStorage.setItem('proResult', row.proResult)
			sessionStorage.setItem('teacher', row.teacher)
			this.$router.push({name: 'EntrProExam', params: {orderId: row.id}})
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