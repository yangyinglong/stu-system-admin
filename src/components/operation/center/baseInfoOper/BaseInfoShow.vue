<template>
	<div style="margin: 0 auto; min-height: 550px">
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
			  <el-form-item label="身份证">
			    <el-input v-model="baseInfo.idCard" placeholder="6224241996888000837" :readonly="readonly1" style="width: 228px"></el-input>
			  </el-form-item>
			  <el-form-item label="政治面貌">
			    <el-input v-model="baseInfo.politicalOutlook" placeholder="政治面貌" :readonly="readonly1" style="width: 228px"></el-input>
			  </el-form-item>
			  <el-form-item label="生源地">
			    <el-input v-model="baseInfo.biogenicLand" placeholder="生源地" :readonly="readonly1" style="width: 228px"></el-input>
			  </el-form-item>
			</el-form>

			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%; margin-left: -6px" label-width="82px">
			  <el-form-item label="研究生专业">
			    <el-input v-model="baseInfo.masterMajor" placeholder="研究生专业" :readonly="readonly1" style="width: 228px"></el-input>
			  </el-form-item>
			  <el-form-item label="研究方向" style="margin-left: -10px">
			    <el-input v-model="baseInfo.masterDirection" placeholder="研究方向" :readonly="readonly1" style="width: 228px"></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" style="margin-left: -10px">
			    <el-input v-model="baseInfo.eMail" placeholder="邮箱" :readonly="readonly1" style="width: 228px"></el-input>
			  </el-form-item>
			</el-form>

			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%; margin-left: -15px" label-width="100px">
			  <el-form-item label="紧急联系人">
			    <el-input v-model="baseInfo.emergencyContact" placeholder="紧急联系人" :readonly="readonly1" style="width: 385px"></el-input>
			  </el-form-item>
			 <!--   <el-form-item label="  ">
			  </el-form-item> -->
			  <el-form-item label="电话号码" style="margin-left: -30px">
			    <el-input v-model="baseInfo.emergencyPhone" placeholder="电话号码" :readonly="readonly1" style="width: 385px"></el-input>
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
				<el-form-item label="已修课程">
				  <el-input v-model="baseInfo.currNumber" placeholder="如：英语六级" :readonly="readonly1" style="width: 150px"></el-input>
				</el-form-item>
				<el-form-item label="平均分">
				  <el-input v-model="baseInfo.averageScore" placeholder="分数" :readonly="readonly1" style="width: 150px"></el-input>
				</el-form-item>
			  <el-form-item label="外语类型">
			    <el-input v-model="baseInfo.languagesTypes" placeholder="如：英语六级" :readonly="readonly1" style="width: 150px"></el-input>
			  </el-form-item>
			  <el-form-item label="外语分数">
			    <el-input v-model="baseInfo.languagesScore" placeholder="分数" :readonly="readonly1" style="width: 150px"></el-input>
			  </el-form-item>
			</el-form>
			<!-- <el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item style="margin-left: -40px">
					<el-button @click="readonly1=false" style="width: 100px" type="info">修改</el-button>
					<el-button style="width: 100px" @click="commit1" type="success">提交</el-button>
				</el-form-item>
			</el-form>
			 -->
			
			<hr style=" height:2px;width: 800px; border:none;border-top:2px dotted #D6D6D6	;" />
			<br>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%; margin-left: -13px" label-width="85px">
			  <el-form-item label="导师">
			    <el-input v-model="baseInfo.tutor" placeholder="导师姓名" :readonly="readonly2" style="width: 217px"></el-input>
			  </el-form-item>
			  <el-form-item label="辅导员">
			    <el-input v-model="baseInfo.counsellor" placeholder="辅导员姓名" :readonly="readonly2" style="width: 217px"></el-input>
			  </el-form-item>
			  <el-form-item label="研究生秘书">
			    <el-input v-model="baseInfo.secretary" placeholder="研究生秘书" :readonly="readonly2" style="width: 217px"></el-input>
			  </el-form-item>
			</el-form>
			<hr style=" height:2px;width: 800px; border:none;border-top:2px dotted #D6D6D6	;" />
			<br>
			<el-form :inline="true" :model="baseInfo" class="demo-form-inline" style="width: 100%" label-width="70px">
			  <el-form-item style="margin-left: -40px">
					<!-- <el-button @click="readonly2=false" style="width: 100px" type="info">修改</el-button> -->
					<el-button style="width: 100px" @click="commit2" type="success">返回</el-button>
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
				specialized: '',
				idCard: '',
			    masterMajor: '',
			    politicalOutlook: '',
			    biogenicLand: '',  // 生源地
			    masterDirection: '',  // 研究方向
			    eMail: '',
			    emergencyContact: '',
			    emergencyPhone: '',
			    secretary: '',  // 研究生秘书
				averageScore: '',
				currNumber: '',
			},
			readonly1: true,
			readonly2: true
		}
	},
	created(){
		this.getSession()
	},
	computed: {
    },
	methods: {
		getSession() {
			this.baseInfo.name = sessionStorage.getItem('name')
			this.baseInfo.stuId = sessionStorage.getItem('stuId')
			this.baseInfo.phone = sessionStorage.getItem('phone')
			this.baseInfo.uSchool = sessionStorage.getItem('uSchool')
			this.baseInfo.uMajor = sessionStorage.getItem('uMajor')
			this.baseInfo.english = sessionStorage.getItem('english')
			this.baseInfo.political = sessionStorage.getItem('political')
			this.baseInfo.math = sessionStorage.getItem('math')
			this.baseInfo.specialized = sessionStorage.getItem('specialized')
			this.baseInfo.sex = sessionStorage.getItem('sex')
			this.baseInfo.tutor = sessionStorage.getItem('tuturName')
			this.baseInfo.counsellor = sessionStorage.getItem('counsellorName')
			this.baseInfo.idCard = sessionStorage.getItem('idCard')
			this.baseInfo.masterMajor = sessionStorage.getItem('masterMajor')
			this.baseInfo.politicalOutlook = sessionStorage.getItem('politicalOutlook')
			this.baseInfo.biogenicLand = sessionStorage.getItem('biogenicLand')
			this.baseInfo.masterDirection = sessionStorage.getItem('masterDirection')
			this.baseInfo.eMail = sessionStorage.getItem('eMail')
			this.baseInfo.emergencyContact = sessionStorage.getItem('emergencyContact')
			this.baseInfo.emergencyPhone = sessionStorage.getItem('emergencyPhone')
			this.baseInfo.secretary = sessionStorage.getItem('secretary')
			this.baseInfo.averageScore = sessionStorage.getItem('averageScore')
			this.baseInfo.languagesTypes = sessionStorage.getItem('languagesTypes')
			this.baseInfo.languagesScore = sessionStorage.getItem('languagesScore')
			this.baseInfo.currNumber = sessionStorage.getItem('currNumber')
		},
		commit2() {
			this.$router.push({name: 'Center', params:{tagP: 'stuBaseCenter'}})
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