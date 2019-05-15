<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="projectFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="projectFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="projectFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="projectFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目大类">
					<el-input  v-model="projectFrom.proClass" placeholder="项目大类" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="projectFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目名称">
					<el-input v-model="projectFrom.proName" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="projectFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目类别">
					<el-input v-model="projectFrom.proType" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="项目级别">
					<el-input v-model="projectFrom.proLevel" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目状态">
					<el-input v-model="projectFrom.proState" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="指导老师">
					<el-input v-model="projectFrom.proTeacher" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目成果">
					<el-input type="textarea" v-model="projectFrom.proResult" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>


			<el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="参赛排名">
					<el-input v-model="projectFrom.ranking" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="参赛人数">
					<el-input v-model="projectFrom.totalNumber" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="projectFrom.proTime" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="projectFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="projectFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="projectFrom.status !== '已完成'">确定</el-button>
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
			projectFrom: {
				id:'',
				name: '',
				stuId: '',
				proName: '',
				proType: '', //
				proClass: '',
				ranking: null,
				totalNumber: null,
				proState: '',
				proResult: '',
				proLevel: '',
				proTeacher: '',
				proTime: '',
	    		score: null
			},
		}
	},
	created() {
		this.projectFrom.id = sessionStorage.getItem('id')
	    this.projectFrom.name = sessionStorage.getItem('userName')
	    this.projectFrom.stuId = sessionStorage.getItem('stuId')
	    this.projectFrom.proClass = sessionStorage.getItem('proClass')
	    this.projectFrom.stuId = sessionStorage.getItem('stuId')
	    this.projectFrom.proName = sessionStorage.getItem('proName')
	    this.projectFrom.proType = sessionStorage.getItem('proType')
	    this.projectFrom.proState = sessionStorage.getItem('proState')
	    this.projectFrom.ranking = sessionStorage.getItem('ranking')
	    this.projectFrom.totalNumber = sessionStorage.getItem('totalNumber')
	    this.projectFrom.proLevel = sessionStorage.getItem('proLevel')
	    this.projectFrom.proResult = sessionStorage.getItem('proResult')
	    this.projectFrom.proTeacher = sessionStorage.getItem('proTeacher')
	    this.projectFrom.proTime = sessionStorage.getItem('proTime')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'projectCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.projectFrom.id,
				score: this.projectFrom.score,
				stuId: this.projectFrom.stuId,
			}
			this.$http.ExamProject(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'projectCenter'}})
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