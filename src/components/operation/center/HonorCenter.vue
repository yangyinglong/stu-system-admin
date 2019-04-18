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
					<AddHonor />
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 1100px">
			<el-table :data="honorData" v-loading="isDisAble">
				<el-table-column prop="honorType" label="类型" width="180"></el-table-column>
				<el-table-column prop="honorLevel" label="级别" width="180"></el-table-column>
				<el-table-column prop="honorGrade" label="等级" width="180"></el-table-column>
				<el-table-column prop="getDate" label="获奖日期" width="180"></el-table-column>				
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
import AddHonor from "@/components/operation/center/honorOper/HonorAdd"
export default {
	name: 'HonorCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			honorData: [
				{
					getDate: '2018-12-13',
					honorType: "本科生奖学金",
					honorLevel: "国家级",
					honorGrade: "一等",
	        		status: '待审核',
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
			this.$http.ShowHonors(sessionStorage.getItem("userId")).then((result) => {
				if (result.c == 200) {
					this.honorData = result.r
				} else {
					this.honorData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		}
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