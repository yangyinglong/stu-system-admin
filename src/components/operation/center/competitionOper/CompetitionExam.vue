<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="competitionFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="competitionFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="competitionFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="competitionFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="类别">
					<el-input v-model="competitionFrom.competitionType" placeholder="本科奖学金" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="competitionFrom.competitionName" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="competitionFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目级别">
					<el-input v-model="competitionFrom.competitionLevel" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="获奖等级">
					<el-input v-model="competitionFrom.competitionPrize" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="competitionFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="参赛排名">
					<el-input v-model="competitionFrom.ranking" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="参赛人数">
					<el-input v-model="competitionFrom.totalNumber" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="competitionFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="指导老师">
					<el-input v-model="competitionFrom.teacher" placeholder="评分" ></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-input v-model="competitionFrom.getDate" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="competitionFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="竞赛状态">
					<el-input v-model="competitionFrom.competitionState" placeholder="评分" ></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="competitionFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="competitionFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="competitionFrom.status !== '已完成'">确定</el-button>
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
			competitionFrom: {
				id: '',
				name: '王璐璐',
				stuId: '1000001',
				competitionType: '2018-12-13',
				competitionName: "本科生奖学金",
				competitionState: '',
				ranking: "国家级",
				totalNumber: "一等",
	    		competitionPrize: '',
	    		competitionLevel: '',
	    		teacher: '',
	    		getDate: '',
	    		score: null
			},
		}
	},
	created() {
		this.competitionFrom.id = sessionStorage.getItem('id')
		this.competitionFrom.name = sessionStorage.getItem('name')
		this.competitionFrom.stuId = sessionStorage.getItem('stuId')
		this.competitionFrom.competitionType = sessionStorage.getItem('competitionType')
		this.competitionFrom.competitionName = sessionStorage.getItem('competitionName')
		this.competitionFrom.competitionState = sessionStorage.getItem('competitionState')
		this.competitionFrom.ranking = sessionStorage.getItem('ranking')
		this.competitionFrom.totalNumber = sessionStorage.getItem('totalNumber')
		this.competitionFrom.competitionPrize = sessionStorage.getItem('competitionPrize')
		this.competitionFrom.competitionLevel = sessionStorage.getItem('competitionLevel')
		this.competitionFrom.teacher = sessionStorage.getItem('teacher')
		this.competitionFrom.getDate = sessionStorage.getItem('getDate')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'competitionCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.competitionFrom.id,
				score: this.competitionFrom.score,
				stuId: this.competitionFrom.stuId
			}
			this.$http.ExamCompetition(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'competitionCenter'}})
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