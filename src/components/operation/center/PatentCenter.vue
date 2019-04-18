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
					<AddPatent />
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 1100px">
			<el-table :data="patentData" v-loading="isDisAble">
				<el-table-column prop="patentName" label="名称" width="240"></el-table-column>
				<el-table-column prop="patentType" label="类别" width="120"></el-table-column>
				<el-table-column prop="ranking" label="发明人排名" width="100"></el-table-column>
				<el-table-column prop="totalNumber" label="发明人数" width="100"></el-table-column>
				<el-table-column prop="patentState" label="专利状态" width="100"></el-table-column>
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
import AddPatent from "@/components/operation/center/patentOper/PatentAdd"
export default {
	name: 'PatentCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			patentData: [
				{
					patentName: '一种新型的马达受力分析',
					patentType: "实用新型专利",
					patentState: "申请",
					score: 0,
					ranking: 1,
					totalNumber: 3,
	        		status: '待审核',
	        		getDate: '2019-09-09'
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
			this.$http.ShowPatents(sessionStorage.getItem("userId")).then((result) => {
				if (result.c == 200) {
					this.patentData = result.r
				} else {
					this.patentData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		}
	},
	components: {
		AddPatent
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>