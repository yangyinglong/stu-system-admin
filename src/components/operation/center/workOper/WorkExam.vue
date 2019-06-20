<template>
	<div class="lab-main">
		<div class="content">
			<el-form :inline="true" :model="workFrom" class="demo-form-inline" label-width="70px" style="margin-top: 20px; margin-left: 30px; margin-right: 30px">
				<el-form-item label="姓名">
					<el-input v-model="workFrom.name" placeholder="姓名" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="workFrom.stuId" placeholder="学号" style="width: 200px" readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="就业深造" prop="workType">
			    <el-select v-model="workFrom.workType" placeholder="请选择具体就业深造" style="width: 525px">
			      <el-option
			        v-for="item in workTypes"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>  
			  </el-form-item>
			</el-form>
			<br>
			<el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="单位名称" prop="companyName">
			    <el-input v-model="workFrom.companyName" placeholder="单位名称/学校名称" style="width: 525px"></el-input>
			  </el-form-item>
			</el-form>

			<br v-if="workFrom.workType == '国内升学'">
			<el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px" v-if="workFrom.workType == '国内升学'">
			  <el-form-item label="专业名称">
			    <el-input v-model="workFrom.workClass" placeholder="专业名称" style="width: 525px"></el-input>
			  </el-form-item>
			</el-form>

			<br v-if="workFrom.workType == '就业'">
			<el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px" v-if="workFrom.workType == '就业'">
			  <el-form-item label="是否专业对口" prop="isCmp">
			    <el-select v-model="workFrom.isCmp" placeholder="请选择专业是否对口" style="width: 205px">
			      <el-option
			        v-for="item in isCmps"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>  
			  </el-form-item>
			  <el-form-item label="职位类别" prop="workClass">
			    <el-select v-model="workFrom.workClass" placeholder="请选择职位类别" style="width: 205px">
			      <el-option
			        v-for="item in workClasses"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>  
			  </el-form-item>
			</el-form>

			<br v-if="workFrom.workType == '就业' || workFrom.workType == '自主创业'">
			<el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="单位性质" v-if="workFrom.workType == '就业'">
			    <el-select v-model="workFrom.companyType" placeholder="请选择单位性质" style="width: 525px">
			      <el-option
			        v-for="item in companyTypes"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>  
			  </el-form-item>
			  <el-form-item label="创业内容" v-else-if="workFrom.workType == '自主创业'">
			    <el-input type="textarea" v-model="workFrom.companyType" placeholder="请填写创业内容" style="width: 525px"></el-input>
			  </el-form-item>
			</el-form>
			<br>
			
			<el-form :inline="true" :model="workFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="70px">
				<el-form-item label="时间">
					<el-input v-model="workFrom.getDate" placeholder="评分" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="评分">
					<el-input v-model="workFrom.score" placeholder="评分" ></el-input>
				</el-form-item>
			</el-form>

			<el-form label-width="70px" :model="workFrom">
				<el-form-item style="margin-left: -40px">
					<el-button style="width: 100px" @click="examine" type="info" v-if="workFrom.status !== '已完成'">确定</el-button>
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
			workFrom: {
				id:'',
				name: '',
				stuId: '',
				workType: '',
				companyName: '',
				isCmp: '',
				companyType: '',
				workClass: '',
				address: '',
				getDate: '',
	    		score: null
			},
		}
	},
	created() {
		this.workFrom.id = sessionStorage.getItem('id')
	    this.workFrom.name = sessionStorage.getItem('userName')
	    this.workFrom.stuId = sessionStorage.getItem('stuId')

	    this.workFrom.workType = sessionStorage.getItem('workType')
	    this.workFrom.companyName = sessionStorage.getItem('companyName')
	    this.workFrom.isCmp = sessionStorage.getItem('isCmp')
	    this.workFrom.companyType = sessionStorage.getItem('companyType')
	    this.workFrom.workClass = sessionStorage.getItem('workClass')
	    this.workFrom.address = sessionStorage.getItem('address')
	    this.workFrom.getDate = sessionStorage.getItem('getDate')    
		
	},
	methods: {
		cencel() {
			this.$router.push({name: 'Center', params:{tagP: 'workCenter'}})
		},
		examine() {
			var examFrom = {
				id: this.workFrom.id,
				score: this.workFrom.score,
				stuId: this.workFrom.stuId
			}
			this.$http.ExamWork(examFrom).then((result) => {
				if (result.c == 200) {
					this.$message({
						message: result.r,
						type: 'success'
					});
					this.$router.push({name: 'Center', params:{tagP: 'workCenter'}})
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
		margin-top: -20px;
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