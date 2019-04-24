<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="acadExchFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="acadExchFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="acadExchFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="acadExchFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="交流类别">
					<el-input v-model="acadExchFrom.exchangeType" placeholder="本科奖学金" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="acadExchFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="组织/会议">
					<el-input v-model="acadExchFrom.conferenceName" placeholder="一等奖" style="width: 490px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="开始时间">
					<el-input v-model="acadExchFrom.startTime" placeholder="一等奖"  readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-input v-model="acadExchFrom.endTime" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="交流成果">
					<el-input type="textarea" v-model="acadExchFrom.result" placeholder="项目成果" style="width: 495px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="级别">
					<el-input v-model="acadExchFrom.level" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="acadExchFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="acadExchFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="acadExchFrom.status !== '已完成'">确定</el-button>
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
			acadExchFrom: {
				id:'',
				stuId: '',
				name: '',
				exchangeType: '交流类别',
				conferenceName: '会议名称',
				startTime: '开始时间',
				endTime: '结束时间',
				level: '国家级',
				result: '交流论文',
				score: null,
			},
		}
	},
	created() {
		this.acadExchFrom.id = sessionStorage.getItem('id')
		this.acadExchFrom.name = sessionStorage.getItem('name')
		this.acadExchFrom.stuId = sessionStorage.getItem('stuId')
		this.acadExchFrom.exchangeType = sessionStorage.getItem('exchangeType')
		this.acadExchFrom.conferenceName = sessionStorage.getItem('conferenceName')
		this.acadExchFrom.startTime = sessionStorage.getItem('startTime')
		this.acadExchFrom.endTime = sessionStorage.getItem('endTime')
		this.acadExchFrom.level = sessionStorage.getItem('level')
		this.acadExchFrom.result = sessionStorage.getItem('result')		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'acadExchCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.acadExchFrom.id,
				score: this.acadExchFrom.score,
				stuId: this.acadExchFrom.stuId
			}
			this.$http.ExamAcadExch(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'acadExchCenter'}})
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