<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="entrProFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="entrProFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="entrProFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="entrProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目名称">
					<el-input v-model="entrProFrom.proName" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="entrProFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="项目类别">
					<el-input v-model="entrProFrom.proType" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="项目级别">
					<el-input v-model="entrProFrom.proLevel" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="entrProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目状态">
					<el-input v-model="entrProFrom.proState" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="指导老师">
					<el-input v-model="entrProFrom.teacher" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="entrProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="项目成果">
					<el-input type="textarea" v-model="entrProFrom.proResult" placeholder="项目成果" style="width: 495px"></el-input>
				</el-form-item>
			</el-form>


			<el-form :inline="true" :model="entrProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="参赛排名">
					<el-input v-model="entrProFrom.ranking" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="参赛人数">
					<el-input v-model="entrProFrom.totalNumber" placeholder="国家级"  readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="entrProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="entrProFrom.getDate" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="entrProFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="entrProFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="entrProFrom.status !== '已完成'">确定</el-button>
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
			entrProFrom: {
				id:'',
				name: '',
				stuId: '',
				proName: '',
				proType: '', //
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
		this.entrProFrom.id = sessionStorage.getItem('id')
		this.entrProFrom.name = sessionStorage.getItem('name')
		this.entrProFrom.stuId = sessionStorage.getItem('stuId')
		this.entrProFrom.proName = sessionStorage.getItem('proName')
		this.entrProFrom.proType = sessionStorage.getItem('proType')
		this.entrProFrom.proState = sessionStorage.getItem('proState')
		this.entrProFrom.ranking = sessionStorage.getItem('ranking')
		this.entrProFrom.totalNumber = sessionStorage.getItem('totalNumber')
		this.entrProFrom.proLevel = sessionStorage.getItem('proLevel')
		this.entrProFrom.proResult = sessionStorage.getItem('proResult')
		this.entrProFrom.teacher = sessionStorage.getItem('teacher')
		this.entrProFrom.getDate = sessionStorage.getItem('getDate')
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'entrProCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.entrProFrom.id,
				score: this.entrProFrom.score,
				stuId: this.entrProFrom.stuId
			}
			this.$http.ExamEntrPro(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'entrProCenter'}})
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