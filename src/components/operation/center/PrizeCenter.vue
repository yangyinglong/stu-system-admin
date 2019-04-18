<template>
	<div style="margin: 0 auto; height: 550px">
		<div style="text-align:center; margin-top: 20px;">
			<br>
			<el-form :inline="true" :model="prizes" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="荣誉数量">
			    <el-input v-model="prizes.honorNum" placeholder="荣誉数量" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="荣誉总分">
			    <el-input v-model="prizes.honorScore" placeholder="荣誉总分" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="学术论文数量">
			    <el-input v-model="prizes.paperNum" placeholder="学术论文数量" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="学术论文总分">
			    <el-input v-model="prizes.paperScore" placeholder="学术论文总分" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			</el-form>
			<el-form :inline="true" :model="prizes" class="demo-form-inline" style="width: 100%" label-width="100px">
			  <el-form-item label="专利数量">
			    <el-input v-model="prizes.patentNum" placeholder="专利数量"  :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="专利总分">
			    <el-input v-model="prizes.patentScore" placeholder="专利总分" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="奖项1">
			    <el-input v-model="prizes.no3" placeholder="奖项1" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			  <el-form-item label="奖项2">
			    <el-input v-model="prizes.no4" placeholder="奖项2" :readonly="readonly4" style="width: 130px"></el-input>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PrizeCenter',
	data () {
		return {
			prizes: {
				stuId: '',
				honorNum: '',
				honorScore: '',
				paperNum: '',
				paperScore: '',
				patentNum: '',
				patentScore: '',
				no3: '',
				no4: ''
			},
			readonly4: true
		}
	},
	created(){
		this.getSession()
		this.getPrizes()
		// this.getTuCoer()
	},
	computed: {
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('userId') != null) {
				this.prizes.stuId = sessionStorage.getItem('userId')
			} else {
				this.prizes.stuId = ''
			}
		},
		getPrizes() {
			this.$http.GetAllPrizes(this.prizes.stuId).then((result) => {
				if (result.c === 200) {
					this.prizes = result.r					
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