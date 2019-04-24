<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="innoProFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="innoProFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="innoProFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="innoProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目名称">
					<el-input v-model="innoProFrom.proName" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="innoProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目简介">
					<el-input type="textarea" v-model="innoProFrom.proIntr" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="innoProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目类别">
					<el-input v-model="innoProFrom.proType" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="项目级别">
					<el-input v-model="innoProFrom.proLevel" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目状态">
					<el-input v-model="innoProFrom.proState" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="指导老师">
					<el-input v-model="innoProFrom.teacher" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目成果">
					<el-input type="textarea" v-model="innoProFrom.proResult" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>


			<el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="参赛排名">
					<el-input v-model="innoProFrom.ranking" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="参赛人数">
					<el-input v-model="innoProFrom.totalNumber" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="innoProFrom.getDate" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="innoProFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="innoProFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="innoProFrom.status !== '已完成'">确定</el-button>
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
			innoProFrom: {
				id:'',
				name: '',
				stuId: '',
				proName: '',
				proType: '', //
				proIntr: '',
				ranking: null,
				totalNumber: null,
				proState: '',
				proResult: '',
				proLevel: '',
				teacher: '',
				getDate: '',
	    		score: null
			},
		}
	},
	created() {
		this.innoProFrom.id = sessionStorage.getItem('id')
		this.innoProFrom.name = sessionStorage.getItem('name')
		this.innoProFrom.stuId = sessionStorage.getItem('stuId')
		this.innoProFrom.proName = sessionStorage.getItem('proName')
		this.innoProFrom.proType = sessionStorage.getItem('proType')
		this.innoProFrom.proIntr = sessionStorage.getItem('proIntr')
		this.innoProFrom.proState = sessionStorage.getItem('proState')
		this.innoProFrom.ranking = sessionStorage.getItem('ranking')
		this.innoProFrom.totalNumber = sessionStorage.getItem('totalNumber')
		this.innoProFrom.proLevel = sessionStorage.getItem('proLevel')
		this.innoProFrom.proResult = sessionStorage.getItem('proResult')
		this.innoProFrom.teacher = sessionStorage.getItem('teacher')
		this.innoProFrom.getDate = sessionStorage.getItem('getDate')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'innoProCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.innoProFrom.id,
				score: this.innoProFrom.score,
				stuId: this.innoProFrom.stuId
			}
			this.$http.ExamInnoPro(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'innoProCenter'}})
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