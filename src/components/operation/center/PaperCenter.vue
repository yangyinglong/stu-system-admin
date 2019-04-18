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
					<AddPaper />
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 1200px">
			<el-table :data="paperData" v-loading="isDisAble">
				<el-table-column prop="paperTitle" label="题目" width="220"></el-table-column>
				<el-table-column prop="paperGrade" label="级别" width="100"></el-table-column>
				<el-table-column prop="journalTitle" label="期刊名称" width="240"></el-table-column>
				<el-table-column prop="ranking" label="作者排名" width="100"></el-table-column>
				<el-table-column prop="totalNumber" label="作者人数" width="80"></el-table-column>
				<el-table-column prop="paperState" label="论文状态" width="80"></el-table-column>
				<el-table-column prop="getDate" label="时间" width="100"></el-table-column>
				<el-table-column prop="score" label="得分" width="100"></el-table-column>
				<el-table-column prop="status" label="状态" width="70"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看</el-button>
					<el-button type="text" size="small" @click="beSpeak(scope.$index, scope.row)" v-if="scope.row.status== '待审核'">修改</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
import AddPaper from "@/components/operation/center/paperOper/PaperAdd"
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
			this.$http.ShowPapers(sessionStorage.getItem("userId")).then((result) => {
				if (result.c == 200) {
					this.paperData = result.r
				} else {
					this.paperData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		}
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