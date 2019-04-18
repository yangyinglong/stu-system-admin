<template>
	<div style="margin: 0 auto; height: 550px">
		<div style="text-align:center; margin-top: 20px;">
			<el-form :inline="true" :model="scores" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="已修课程数">
			    <el-input v-model="scores.currNumber" placeholder="课程数" readonly="true" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="平均分">
			    <el-input v-model="scores.averageScore" placeholder="平均分" readonly="true" style="width: 150px"></el-input>
			  </el-form-item>
			</el-form>
			<hr style=" height:2px;width: 800px; border:none;border-top:2px dotted #D6D6D6	;" />
			<el-form :inline="true" :model="scores" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="工程数学">
			    <el-input v-model="scores.engineeringMathematics" placeholder="工程数学" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="第一外国语">
			    <el-input v-model="scores.firstForeignLanguage" placeholder="第一外国语" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="社会主义理论">
			    <el-input v-model="scores.characteristicSocialism" placeholder="社会主义理论" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="数值分析">
			    <el-input v-model="scores.numericalAnalysis" placeholder="数值分析" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="scores" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="课程1">
			    <el-input v-model="scores.no1" placeholder="课程1"  :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程2">
			    <el-input v-model="scores.no2" placeholder="课程2" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程3">
			    <el-input v-model="scores.no3" placeholder="课程3" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程4">
			    <el-input v-model="scores.no4" placeholder="课程4" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			</el-form>
			<!-- <el-form :inline="true" :model="scores" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="课程1">
			    <el-input v-model="scores.no1" placeholder="课程1"  :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程2">
			    <el-input v-model="scores.no2" placeholder="课程2" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程3">
			    <el-input v-model="scores.no3" placeholder="课程3" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程4">
			    <el-input v-model="scores.no4" placeholder="课程4" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="scores" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="课程1">
			    <el-input v-model="scores.no1" placeholder="课程1"  :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程2">
			    <el-input v-model="scores.no2" placeholder="课程2" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程3">
			    <el-input v-model="scores.no3" placeholder="课程3" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="课程4">
			    <el-input v-model="scores.no4" placeholder="课程4" :readonly="readonly3" style="width: 130px"></el-input>
			  </el-form-item>
			</el-form>
			 -->

			<!--  <el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item style="margin-left: -40px">
					<el-button @click="readonly3=false" style="width: 100px">修改</el-button>
					<el-button style="width: 100px" @click="commit3">提交</el-button>
				</el-form-item>
			</el-form> -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'ScoreCenter',
	data () {
		return {
			scores: {
				stuId: '',
				currNumber: '',
				averageScore: '',
				engineeringMathematics: '',
				firstForeignLanguage: '',
				characteristicSocialism: '',
				numericalAnalysis: '',
				no1: '',
				no2: '',
				no3: '',
				no4: '',
				no5: ''
			},
			readonly3: true
		}
	},
	created(){
		this.getSession()
		this.getScores()
		// this.getTuCoer()
	},
	computed: {
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('userId') != null) {
				this.scores.stuId = sessionStorage.getItem('userId')
			} else {
				this.scores.stuId = ''
			}
		},
		getScores() {
			this.$http.GetAllScore(this.scores.stuId).then((result) => {
				if (result.c === 200) {
					this.scores.averageScore = result.r.averageScore
					this.scores.currNumber = result.r.currNumber
					if (result.r.engineeringMathematics != -1) {
						this.scores.engineeringMathematics = result.r.engineeringMathematics
					}
					if (result.r.firstForeignLanguage != -1) {
						this.scores.firstForeignLanguage = result.r.firstForeignLanguage
					}
					if (result.r.characteristicSocialism != -1) {
						this.scores.characteristicSocialism = result.r.characteristicSocialism
					}
					if (result.r.numericalAnalysis != -1) {
						this.scores.numericalAnalysis = result.r.numericalAnalysis
					}
					
				} else if(result.c === 305){
					this.$message({
						message: result.r,
						type: 'success'
		            });
				} else {
					this.$message.error(result.r)
				}
			}, (err) => {
				this.$message.error(err.msg)
			})  		
		},
		commit3() {
			this.readonly3 = true
			var allScore = {
				stuId: this.scores.stuId,
				engineeringMathematics: this.scores.engineeringMathematics != '' ? this.scores.engineeringMathematics : -1,
				firstForeignLanguage: this.scores.firstForeignLanguage != '' ? this.scores.firstForeignLanguage : -1,
				characteristicSocialism: this.scores.characteristicSocialism != '' ? this.scores.characteristicSocialism : -1,
				numericalAnalysis: this.scores.numericalAnalysis != '' ? this.scores.numericalAnalysis : -1,
				
			}
			if (true) {
				this.$http.EditAllScore(allScore).then((result) => {
				  if (result.c === 200) {
				    this.$message({
						message: result.r,
						type: 'success'
		            });
		            this.getScores()
				  } else {
				    this.$message.error(result.r);				    
				  }
				}, (err) => {
				  this.$message.error(err.msg)
				})  
			}

		},
		
		
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