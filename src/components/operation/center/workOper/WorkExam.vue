<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="workFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="workFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="workFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="workFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="单位名称">
					<el-input v-model="workFrom.companyName" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="workFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="单位性质">
					<el-input v-model="workFrom.companyType" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="就业类型">
					<el-input v-model="workFrom.workType" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="workFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="workFrom.getDate" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="workFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="workFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="workFrom.status !== '已完成'">确定</el-button>
					<el-button style="width: 100px" @click="cencel">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>

export default {
	name: 'OrderCenter',
	data() {
		return {
			workFrom: {
				id:'',
				name: '',
				stuId: '',
				companyName: '',
				companyType: null,
				workType: null,
				getDate: '',
	    		score: null
			},
		}
	},
	created() {
		this.workFrom.id = sessionStorage.getItem('id')
		this.workFrom.name = sessionStorage.getItem('name')
		this.workFrom.stuId = sessionStorage.getItem('stuId')
		this.workFrom.companyName = sessionStorage.getItem('companyName')
		this.workFrom.companyType = sessionStorage.getItem('companyType')
		this.workFrom.workType = sessionStorage.getItem('workType')
		this.workFrom.getDate = sessionStorage.getItem('getDate')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'entrProCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.workFrom.id,
				score: this.workFrom.score,
				stuId: this.workFrom.stuId
			}
			this.$http.ExamWork(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'workCenter'}})
				} else {
					this.$message({
						message: result.r,
						type: 'error'
					});
				}
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		}
	}
}
</script>

<style scoped>
	.lab-main{
		min-height: 530px;
		text-align: center;
		margin: 0 auto;
	}
	.content {
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		horiz-align: center;
		white-space: nowrap;
		margin: 0;
		border:1px solid #999999;
		margin-top: 50px;
	}
</style>