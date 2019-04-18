<template>
	<div style="margin: 0 auto; height: 550px">
		<div style="text-align:center; margin-top: 20px;">
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item label="学号">
			    <el-input v-model="baseInfo.stuId" placeholder="学号" readonly="true" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="姓名">
			    <el-input v-model="baseInfo.name" placeholder="姓名"readonly="true" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="性别">
			    <el-input v-model="baseInfo.sex" placeholder="性别"readonly="true" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号">
			    <el-input v-model="baseInfo.phone" placeholder="手机号"readonly="true" style="width: 150px"></el-input>
			  </el-form-item>
			</el-form>
			<hr style=" height:2px;width: 800px; border:none;border-top:2px dotted #D6D6D6	;" />
			<br>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item label="本科学校">
			    <el-input v-model="baseInfo.uSchool" placeholder="本科学校" :readonly="readonly1" style="width: 385px"></el-input>
			  </el-form-item>
			  <el-form-item label="本科专业">
			    <el-input v-model="baseInfo.uMajor" placeholder="本科专业" :readonly="readonly1" style="width: 385px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item label="英语">
			    <el-input v-model="baseInfo.english" placeholder="入学考试英语成绩" :readonly="readonly1" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="数学">
			    <el-input v-model="baseInfo.math" placeholder="数学":readonly="readonly1" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="政治">
			    <el-input v-model="baseInfo.political" placeholder="政治":readonly="readonly1" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="专业课">
			    <el-input v-model="baseInfo.specialized" placeholder="专业课":readonly="readonly1" style="width: 150px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item label="外语类型">
			    <el-input v-model="baseInfo.languagesTypes" placeholder="如：英语六级" :readonly="readonly1" style="width: 385px"></el-input>
			  </el-form-item>
			  <el-form-item label="外语分数">
			    <el-input v-model="baseInfo.languagesScore" placeholder="分数" :readonly="readonly1" style="width: 385px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item style="margin-left: -40px">
					<el-button @click="readonly1=false" style="width: 100px">修改</el-button>
					<el-button style="width: 100px" @click="commit1">提交</el-button>
				</el-form-item>
			</el-form>
			
			
			<hr style=" height:2px;width: 800px; border:none;border-top:2px dotted #D6D6D6	;" />
			<br>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item label="导师">
			    <el-input v-model="baseInfo.tutor" placeholder="导师姓名" :readonly="readonly2" style="width: 385px"></el-input>
			  </el-form-item>
			  <el-form-item label="辅导员">
			    <el-input v-model="baseInfo.counsellor" placeholder="辅导员姓名" :readonly="readonly2" style="width: 385px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item style="margin-left: -40px">
					<el-button @click="readonly2=false" style="width: 100px">修改</el-button>
					<el-button style="width: 100px" @click="commit2">提交</el-button>
				</el-form-item>
			</el-form>
			<br>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'LabCenter',
	data () {
		return {
			baseInfo: {
				stuId: '',
				name: '',
				sex: '',
				phone: '',
				uSchool: '',
				uMajor: '',
				tutor: '',
				counsellor: '',
				languagesTypes: '',
				languagesScore: '',
				english: '',
				political: '',
				math: '',
				specialized: ''
			},
			readonly1: true,
			readonly2: true
		}
	},
	created(){
		this.getSession()
		this.getScore()
		this.getTuCoer()
	},
	computed: {
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('userId') != null) {
				this.baseInfo.stuId = sessionStorage.getItem('userId')
			} else {
				this.baseInfo.stuId = ''
			}
			if (sessionStorage.getItem('userName') != null) {
				this.baseInfo.name = sessionStorage.getItem('userName')
			} else {
				this.baseInfo.name = ''
			}
			if (sessionStorage.getItem('sex') != null) {
				this.baseInfo.sex = sessionStorage.getItem('sex') == 1 ? '男' : '女'
			} else {
				this.baseInfo.sex = ''
			}
			if (sessionStorage.getItem('phone') != null) {
				this.baseInfo.phone = sessionStorage.getItem('phone')
			} else {
				this.baseInfo.phone = ''
			}
		},
		getScore() {
			this.$http.GetEntrScore(this.baseInfo.stuId).then((result) => {
				if (result.c === 200) {
					this.baseInfo.uSchool = result.r.uSchool,
					this.baseInfo.uMajor = result.r.uMajor,
					this.baseInfo.english = result.r.english,
					this.baseInfo.political = result.r.political,
					this.baseInfo.math = result.r.math,
					this.baseInfo.specialized = result.r.specialized,
					this.baseInfo.languagesTypes = result.r.languagesTypes,
					this.baseInfo.languagesScore = result.r.languagesScore
				} else {
					this.readonly1 = false		    
				}
			}, (err) => {
				this.$message.error(err.msg)
			})  		
		},
		getTuCoer() {
			this.$http.GetTuCoer(this.baseInfo.stuId).then((result) => {
				if (result.c === 200) {
					this.baseInfo.tutor = result.r.tutor,
					this.baseInfo.counsellor = result.r.counsellor
				} else {
					this.readonly2 = false		    
				}
			}, (err) => {
				this.$message.error(err.msg)
			})
		},
		commit1() {
			this.readonly1 = true
			var entranceScore = {
				stuId: this.baseInfo.stuId,
				uSchool: this.baseInfo.uSchool,
				uMajor: this.baseInfo.uMajor,
				english: this.baseInfo.english,
				political: this.baseInfo.political,
				math: this.baseInfo.math,
				specialized: this.baseInfo.specialized,
				languagesTypes: this.baseInfo.languagesTypes,
				languagesScore: this.baseInfo.languagesScore
			}
			if (true) {
				this.$http.EditEntrScore(entranceScore).then((result) => {
				  if (result.c === 200) {
				    this.$message({
						message: result.r,
						type: 'success'
		            });
		            this.getScore()
				  } else {
				    this.$message.error(result.r);				    
				  }
				}, (err) => {
				  this.$message.error(err.msg)
				})  
			}

		},
		commit2() {
			this.readonly2 = true
			var tuCoer = {
				stuId: this.baseInfo.stuId,
				tutor: this.baseInfo.tutor,
				counsellor: this.baseInfo.counsellor
			}
			if (true) {
				this.$http.EditTuCoer(tuCoer).then((result) => {
				  if (result.c === 200) {
				    this.$message({
						message: result.r,
						type: 'success'
		            });
		            this.getTuCoer()
				  } else {
				    this.$message.error(result.r);				    
				  }
				}, (err) => {
				  this.$message.error(err.msg)
				})
			}
		}
		
		
	},
	components: {
	},
}		
</script>

<style scoped>
	.labcenter-main{
		width: 70%;
		margin: 0 auto;
	}
</style>