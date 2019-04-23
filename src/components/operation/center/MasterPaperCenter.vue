<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item style="margin-left: 800px">
					<AddMasterPaper />
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="masterPaperData" v-loading="isDisAble">
				<el-table-column prop="paperName" label="题目" width="130"></el-table-column>
				<el-table-column prop="paperAbstract" label="摘要" width="110"></el-table-column>
				<el-table-column prop="score1" label="外审成绩1" width="90"></el-table-column>
				<el-table-column prop="sugg1" label="外审意见1" width="120"></el-table-column>
				<el-table-column prop="score2" label="外审成绩2" width="90"></el-table-column>
				<el-table-column prop="sugg2" label="外审意见2" width="120"></el-table-column>
				<el-table-column prop="score3" label="答辩成绩" width="90"></el-table-column>
				<el-table-column prop="sugg3" label="答辩意见" width="120"></el-table-column>
				<el-table-column prop="getDate" label="日期" width="100"></el-table-column>
				<!-- <el-table-column prop="proResult" label="项目成果" width="120"></el-table-column>	 -->
				<el-table-column prop="score" label="得分" width="50"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="downLoadPro(scope.$index, scope.row)">下载材料</el-button>
					<!-- <el-button type="text" size="small" @click="beSpeak(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">修改</el-button> -->
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
import AddMasterPaper from "@/components/operation/center/masterPaperOper/MasterPaperAdd"
export default {
	name: 'EngiProCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			masterPaperData: [
				{
					id:'',
					paperName: '大学生工程项目测试数据1',
					paperAbstract: '大学生工程项目测试数据1简介',
					score1: 'A', // 性能指标
					sugg1: '一审意见', // 个人所做的工作
					score2: 'B',
					sugg2: '二审意见',
					score3: 'A',
					sugg3: '答辩意见',
					getDate: '2018-12-13',
	        		status: '待审核',
	        		score: 0,
	        		proofMaterialId: '',
				}			
			]
		}
	},
	created(){
		this.queryData()
	},
	computed: {
    },
	methods: {
		queryData(){
			this.isDisAble = true
			this.$http.ShowMasterPapers(sessionStorage.getItem("userId")).then((result) => {
				if (result.c == 200) {
					this.masterPaperData = result.r
				} else {
					this.masterPaperData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		downLoadPro(index, row){
			// var params = {
			// 	fileName: '15200123_1_1_1—1.jpg'
			// }
			// this.$http.DownLoad(params).then((result) => {
			// 	alert()
   //        		this.$message.success('下载成功')
			// }, (err) => {
	  //           this.$message.error(err.msg)
	  //       })
		},
	},
	components: {
		AddMasterPaper
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>