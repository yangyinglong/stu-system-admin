<template>
	<div class="lab-main">
		<div class="content">
			<br>
			<el-form :inline="true" :model="paperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
			       <el-form-item label="姓名" prop="name">
			         <el-input v-model="paperFrom.name" placeholder="姓名" readonly="true"></el-input>
			       </el-form-item>
			       <el-form-item label="学号">
			         <el-input v-model="paperFrom.stuId" placeholder="学号" readonly="true"></el-input>
			       </el-form-item>
			     </el-form>
			     <br>
			     <el-form :inline="true" :model="paperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
			       <el-form-item label="论文题目" prop="paperTitle">
			         <el-input v-model="paperFrom.paperTitle" placeholder="论文题目" style="width: 525px" readonly="true"></el-input>
			       </el-form-item>
			     </el-form>
			     <br>
			     <el-form :inline="true" :model="paperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
			       <el-form-item label="发表期刊" prop="journalTitle">
			         <el-input v-model="paperFrom.journalTitle" placeholder="发表期刊" style="width: 525px" readonly="true"></el-input>
			       </el-form-item>
			     </el-form>
			     <br>
			     <el-form :inline="true" :model="paperFrom" :rules="rules" ref="paperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			       <el-form-item label="论文等级" prop="paperGrade">
			         <el-input v-model="paperFrom.paperGrade" placeholder="论文等级" readonly="true"></el-input>
			       </el-form-item>
			       <el-form-item label="论文状态" prop="paperState">
			         <el-input v-model="paperFrom.paperState" placeholder="论文状态" readonly="true"></el-input>
			       </el-form-item>
			     </el-form>
			     <br>
			     <el-form :inline="true" :model="paperFrom" :rules="rules" ref="paperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			       <el-form-item label="作者排名" prop="ranking">
			         <el-input v-model="paperFrom.ranking" placeholder="作者排名" readonly="true"></el-input>
			       </el-form-item>
			       <el-form-item label="作者人数" prop="totalNumber">
			         <el-input v-model="paperFrom.totalNumber" placeholder="作者人数" readonly="true"></el-input>
			       </el-form-item>
			     </el-form>
			     <br>
			     <el-form :inline="true" :model="paperFrom" :rules="rules" ref="paperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			       <el-form-item label="获奖日期" prop="getDate">
			         <el-input v-model="paperFrom.getDate" placeholder="时间" style="width: 202px" readonly="true"></el-input>
			       </el-form-item>
			       <el-form-item label="评分">
			       	<el-input v-model="paperFrom.score" placeholder="评分" style="width: 202px"></el-input>
			       </el-form-item>
			     </el-form>
			     <el-form label-width="70px" :model="paperFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="paperFrom.status !== '已完成'">确定</el-button>
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
			paperFrom: {
				id: '',
				name: '王璐璐',
				stuId: '1000001',
				paperTitle: '',
				paperGrade: '',
				journalTitle: '',
				ranking: '',
				totalNumber: '',
				paperState: '',
				getDate: '2018-12-13',
	    		status: '待审核',
	    		score: null
			},
		}
	},
	created() {
		this.paperFrom.id = sessionStorage.getItem('id')
		this.paperFrom.name = sessionStorage.getItem('name')
		this.paperFrom.stuId = sessionStorage.getItem('stuId')
		this.paperFrom.paperTitle = sessionStorage.getItem('paperTitle')
		this.paperFrom.paperGrade = sessionStorage.getItem('paperGrade')
		this.paperFrom.journalTitle = sessionStorage.getItem('journalTitle')
		this.paperFrom.ranking = sessionStorage.getItem('ranking')
		this.paperFrom.totalNumber = sessionStorage.getItem('totalNumber')
		this.paperFrom.paperState = sessionStorage.getItem('paperState')
		this.paperFrom.getDate = sessionStorage.getItem('getDate')
		this.paperFrom.status = sessionStorage.getItem('status')
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'paperCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.paperFrom.id,
				score: this.paperFrom.score,
				stuId: this.paperFrom.stuId
			}
			this.$http.ExamPaper(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'paperCenter'}})
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