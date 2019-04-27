<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="masterPaperFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="masterPaperFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="masterPaperFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="masterPaperFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="论文题目">
					<el-input v-model="masterPaperFrom.paperName" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="masterPaperFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="论文摘要">
					<el-input type="textarea" v-model="masterPaperFrom.paperAbstract" placeholder="项目简介" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="外审成绩1">
					<el-input v-model="masterPaperFrom.score1" placeholder="一等奖"  readonly="true" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="外审意见1">
					<el-input type="textarea" v-model="masterPaperFrom.sugg1" placeholder="项目简介" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="外审成绩2">
					<el-input v-model="masterPaperFrom.score2" placeholder="一等奖"  readonly="true" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="外审意见2">
					<el-input type="textarea" v-model="masterPaperFrom.sugg2" placeholder="项目简介" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="答辩成绩">
					<el-input v-model="masterPaperFrom.score3" placeholder="一等奖"  readonly="true" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="答辩意见">
					<el-input type="textarea" v-model="masterPaperFrom.sugg3" placeholder="项目简介" style="width: 490px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="masterPaperFrom.getDate" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="masterPaperFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="masterPaperFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="masterPaperFrom.status !== '已完成'">确定</el-button>
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
			masterPaperFrom: {
				id:'',
				stuId: '',
				name: '',
				paperName: '大学生工程项目测试数据1',
				paperAbstract: '大学生工程项目测试数据1简介',
				score1: 'A', // 性能指标
				sugg1: '一审意见', // 个人所做的工作
				score2: 'B',
				sugg2: '二审意见',
				score3: 'A',
				sugg3: '答辩意见',
				getDate: '2018-12-13',
				score: null
			},
		}
	},
	created() {
		this.masterPaperFrom.id = sessionStorage.getItem('id')
		this.masterPaperFrom.name = sessionStorage.getItem('name')
		this.masterPaperFrom.stuId = sessionStorage.getItem('stuId')
		this.masterPaperFrom.paperName = sessionStorage.getItem('paperName')
		this.masterPaperFrom.paperAbstract = sessionStorage.getItem('paperAbstract')
		this.masterPaperFrom.score1 = sessionStorage.getItem('score1')
		this.masterPaperFrom.sugg1 = sessionStorage.getItem('sugg1')
		this.masterPaperFrom.sugg2 = sessionStorage.getItem('sugg2')
		this.masterPaperFrom.score2 = sessionStorage.getItem('score2')
		this.masterPaperFrom.score3 = sessionStorage.getItem('score3')
		this.masterPaperFrom.sugg3 = sessionStorage.getItem('sugg3')
		this.masterPaperFrom.getDate = sessionStorage.getItem('getDate')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'masterPaperCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.masterPaperFrom.id,
				score: this.masterPaperFrom.score,
				stuId: this.masterPaperFrom.stuId
			}
			this.$http.ExamMasterPaper(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'masterPaperCenter'}})
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