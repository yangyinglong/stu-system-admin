<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="honorData" class="demo-form-inline" label-width="70px" style="margin-top: 20px;">
				<el-form-item label="姓名">
					<el-input v-model="honorData.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="honorData.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="honorData" class="demo-form-inline" label-width="70px">
				<el-form-item label="类型">
					<el-input v-model="honorData.honorType" placeholder="本科奖学金" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="级别">
					<el-input v-model="honorData.honorLevel" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="honorData" class="demo-form-inline" label-width="70px">
				<el-form-item label="等级">
					<el-input v-model="honorData.honorGrade" placeholder="一等奖" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="时间">
					<el-input v-model="honorData.getDate" placeholder="国家级" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>

			<el-form :inline="true" :model="honorData" class="demo-form-inline" label-width="70px">
				<el-form-item label="评分">
					<el-input v-model="honorData.score" placeholder="评分" style="width: 200px"></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="honorData">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="honorData.status !== '已完成'">确定</el-button>
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
			honorData: {
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
		this.honorData.id = sessionStorage.getItem('id')
		this.honorData.name = sessionStorage.getItem('name')
		this.honorData.stuId = sessionStorage.getItem('stuId')
		this.honorData.getDate = sessionStorage.getItem('getDate')
		this.honorData.honorType = sessionStorage.getItem('honorType')
		this.honorData.honorLevel = sessionStorage.getItem('honorLevel')
		this.honorData.honorGrade = sessionStorage.getItem('honorGrade')
		// this.honorData.remarks = sessionStorage.getItem('remarks') == 'null' ? '' : sessionStorage.getItem('remarks')
		// this.honorData.adminRemarks = sessionStorage.getItem('adminRemarks') == 'null' ? '' : sessionStorage.getItem('adminRemarks')
		// this.honorData.status = sessionStorage.getItem("orderStatus")
		// console.log(this.honorData)
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'honorCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.honorData.id,
				score: this.honorData.score,
				stuId: this.honorData.stuId
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