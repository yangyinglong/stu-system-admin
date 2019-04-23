<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item style="margin-left: 800px">
					<AddEntrPro />
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="entrProData" v-loading="isDisAble">
				<el-table-column prop="proType" label="类型" width="100"></el-table-column>
				<el-table-column prop="proName" label="名称" width="190"></el-table-column>
				<!-- <el-table-column prop="proIntr" label="项目简介" width="100"></el-table-column> -->
				<el-table-column prop="proState" label="项目状态" width="120"></el-table-column>
				<el-table-column prop="proLevel" label="项目级别" width="80"></el-table-column>
				<el-table-column prop="ranking" label="参赛排名" width="80"></el-table-column>
				<el-table-column prop="totalNumber" label="参赛人数" width="80"></el-table-column>
				<el-table-column prop="teacher" label="指导老师" width="80"></el-table-column>
				<el-table-column prop="getDate" label="日期" width="100"></el-table-column>
				<el-table-column prop="proResult" label="项目成果" width="120"></el-table-column>	
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
import AddEntrPro from "@/components/operation/center/entrProOper/EntrProAdd"
export default {
	name: 'EntrProCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			entrProData: [
				{
					id:'',
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
			this.$http.ShowEntrPros(sessionStorage.getItem("userId")).then((result) => {
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
		AddEntrPro
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>