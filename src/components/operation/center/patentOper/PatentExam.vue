<template>
	<div class="lab-main">
		<div class="content">
			<br>
			<el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
				<el-form-item label="姓名">
					<el-input v-model="patentFrom.name" placeholder="姓名"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="patentFrom.stuId" placeholder="学号"  readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
				<el-form-item label="名称">
					<el-input v-model="patentFrom.patentName" placeholder="本科奖学金" style="width: 525px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
				<el-form-item label="专利类型">
					<el-input v-model="patentFrom.patentType" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="专利状态">
					<el-input v-model="patentFrom.patentState" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
				<el-form-item label="作者排名">
					<el-input v-model="patentFrom.ranking" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="作者人数">
					<el-input v-model="patentFrom.totalNumber" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
				<el-form-item label="时间">
					<el-input v-model="patentFrom.getDate" placeholder="评分" ></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="patentFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="patentFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="patentFrom.status !== '已完成'">确定</el-button>
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
			patentFrom: [
				{
	        		id: '',
					stuId: '',
					name: '',
					patentName: '一种新型的马达受力分析',
					patentType: "SCI一区",
					patentState: "Nanoscience＆Nanotechnology",
					ranking: 1,
					totalNumber: 3,
	        		getDate: '',
	        		score: null
				}			
			],
		}
	},
	created() {
		this.patentFrom.id = sessionStorage.getItem('id')
		this.patentFrom.name = sessionStorage.getItem('name')
		this.patentFrom.stuId = sessionStorage.getItem('stuId')
		this.patentFrom.patentName = sessionStorage.getItem('patentName')
		this.patentFrom.patentType = sessionStorage.getItem('patentType')
		this.patentFrom.patentState = sessionStorage.getItem('patentState')
		this.patentFrom.ranking = sessionStorage.getItem('ranking')
		this.patentFrom.totalNumber = sessionStorage.getItem('totalNumber')
		this.patentFrom.getDate = sessionStorage.getItem('getDate')
		// this.patentFrom.remarks = sessionStorage.getItem('remarks') == 'null' ? '' : sessionStorage.getItem('remarks')
		// this.patentFrom.adminRemarks = sessionStorage.getItem('adminRemarks') == 'null' ? '' : sessionStorage.getItem('adminRemarks')
		// this.patentFrom.status = sessionStorage.getItem("orderStatus")
		// console.log(this.patentFrom)
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'patentCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.patentFrom.id,
				score: this.patentFrom.score,
				stuId: this.patentFrom.stuId
			}
			this.$http.ExamPatent(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'patentCenter'}})
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