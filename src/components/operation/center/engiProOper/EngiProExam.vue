<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="engiProFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="engiProFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="engiProFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="engiProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目名称">
					<el-input v-model="engiProFrom.proName" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="engiProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目简介">
					<el-input type="textarea" v-model="engiProFrom.proIntr" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="engiProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目指标">
					<el-input type="textarea" v-model="engiProFrom.performance" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="engiProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="个人工作">
					<el-input type="textarea" v-model="engiProFrom.work" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="engiProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="企业名称">
					<el-input v-model="engiProFrom.enterpriseName" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="企业导师">
					<el-input v-model="engiProFrom.enterpriseTeacher" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>			

			<el-form :inline="true" :model="engiProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="参与排名">
					<el-input v-model="engiProFrom.ranking" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="参与人数">
					<el-input v-model="engiProFrom.totalNumber" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="engiProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目状态">
					<el-input v-model="engiProFrom.proState" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="指导老师">
					<el-input v-model="engiProFrom.teacher" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="engiProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="engiProFrom.getDate" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="engiProFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="engiProFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="engiProFrom.status !== '已完成'">确定</el-button>
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
			engiProFrom: {
				id:'',
				name: '',
				stuId: '',
				proName: '',
				proIntr: '', //
				performance: '',
				work: '',
				ranking: null,
				totalNumber: null,
				proState: '',
				enterpriseName: '',
				enterpriseTeacher: '',
				teacher: '',
				getDate: '',
	    		score: null
			},
		}
	},
	created() {
		this.engiProFrom.id = sessionStorage.getItem('id')
		this.engiProFrom.name = sessionStorage.getItem('name')
		this.engiProFrom.stuId = sessionStorage.getItem('stuId')
		this.engiProFrom.proName = sessionStorage.getItem('proName')
		this.engiProFrom.proIntr = sessionStorage.getItem('proIntr')
		this.engiProFrom.performance = sessionStorage.getItem('performance')
		this.engiProFrom.ranking = sessionStorage.getItem('ranking')
		this.engiProFrom.totalNumber = sessionStorage.getItem('totalNumber')
		this.engiProFrom.work = sessionStorage.getItem('work')
		this.engiProFrom.proState = sessionStorage.getItem('proState')
		this.engiProFrom.enterpriseName = sessionStorage.getItem('enterpriseName')
		this.engiProFrom.enterpriseTeacher = sessionStorage.getItem('enterpriseTeacher')
		this.engiProFrom.teacher = sessionStorage.getItem('teacher')
		this.engiProFrom.getDate = sessionStorage.getItem('getDate')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'engiProCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.engiProFrom.id,
				score: this.engiProFrom.score,
				stuId: this.engiProFrom.stuId
			}
			this.$http.ExamEngiPro(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'engiProCenter'}})
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
		min-width: 70%;
		min-height: 80%;
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		horiz-align: center;
		white-space: nowrap;
		margin: 0;
		border:1px solid #999999;
		margin-top: 50px;
		background: #FFFFFF;
	}
</style>