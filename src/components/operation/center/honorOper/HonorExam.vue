<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="honorFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px;">
				<el-form-item label="姓名">
					<el-input v-model="honorFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="honorFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="honorFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="类型">
					<el-input v-model="honorFrom.honorType" placeholder="本科奖学金" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="级别">
					<el-input v-model="honorFrom.honorLevel" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="honorFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="等级">
					<el-input v-model="honorFrom.honorGrade" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-input v-model="honorFrom.getDate" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="honorFrom" class="demo-form-inline" label-width="70px">
				<el-form-item label="评分">
					<el-input v-model="honorFrom.score" placeholder="评分" style="width: 200px"></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="honorFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="honorFrom.status !== '已完成'">确定</el-button>
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
			honorFrom: {
				id: '',
				name: '王璐璐',
				stuId: '1000001',
				getDate: '2018-12-13',
				honorType: "本科生奖学金",
				honorLevel: "国家级",
				honorGrade: "一等",
	    		status: '待审核',
	    		score: 0
			},
		}
	},
	created() {
		this.honorFrom.id = sessionStorage.getItem('id')
		this.honorFrom.name = sessionStorage.getItem('name')
		this.honorFrom.stuId = sessionStorage.getItem('stuId')
		this.honorFrom.getDate = sessionStorage.getItem('getDate')
		this.honorFrom.honorType = sessionStorage.getItem('honorType')
		this.honorFrom.honorLevel = sessionStorage.getItem('honorLevel')
		this.honorFrom.honorGrade = sessionStorage.getItem('honorGrade')
		// this.honorFrom.remarks = sessionStorage.getItem('remarks') == 'null' ? '' : sessionStorage.getItem('remarks')
		// this.honorFrom.adminRemarks = sessionStorage.getItem('adminRemarks') == 'null' ? '' : sessionStorage.getItem('adminRemarks')
		// this.honorFrom.status = sessionStorage.getItem("orderStatus")
		// console.log(this.honorFrom)
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'honorCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.honorFrom.id,
				score: this.honorFrom.score,
				stuId: this.honorFrom.stuId
			}
			this.$http.ExamHonor(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'honorCenter'}})
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