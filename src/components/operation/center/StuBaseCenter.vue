<template>
	<div style="margin: 0 auto">
		<div style="margin-top: 20px; margin-left: 120px; height: 64px">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<!-- <el-form-item>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                           :disabled="isDisAble" style="width: 200px">全部
             		</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
	                	<el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
	              	</el-checkbox-group>
				</el-form-item> -->
				<el-form-item style="margin-left: 800px">
					<el-button type="text" icon="el-icon-download" size="medium" style="font-size: 30px"></el-button>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin-left: 20px; min-height: 465px; width: 95%">
			<el-table :data="stuData" v-loading="isDisAble">
				<el-table-column prop="stuId" fixed label="学号" width="100"></el-table-column>
				<el-table-column prop="name" fixed label="姓名" width="80"></el-table-column>
				<el-table-column prop="sex" label="性别" width="60"></el-table-column>
				<el-table-column prop="masterMajor" label="研究生专业" width="180"></el-table-column>
				<el-table-column prop="phone" label="电话" width="120"></el-table-column>
				<el-table-column prop="eMail" label="邮箱" width="180"></el-table-column>
				<el-table-column prop="politicalOutlook" label="政治面貌" width="120"></el-table-column>
				<!-- <el-table-column prop="uSchool" label="本科学校" width="140"></el-table-column>
				<el-table-column prop="uMajor" label="本科专业" width="150"></el-table-column>
				<el-table-column prop="english" label="英语(入学考试)" width="130"></el-table-column>
				<el-table-column prop="political" label="政治" width="80"></el-table-column>
				<el-table-column prop="math" label="数学" width="80"></el-table-column>	
				<el-table-column prop="specialized" label="专业课" width="80"></el-table-column> -->
				<el-table-column prop="tuturName" label="导师" width="80"></el-table-column>
				<el-table-column prop="counsellorName" label="辅导员" width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<!-- <el-button type="text" size="small" @click="showProofMaterial(scope.$index, scope.row)">下载材料</el-button> -->
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看详情</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
	</div>
</template>

<script>
export default {
	name: 'StuBaseCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
			stuData: [
				{
					name: '',
					stuId: '',
					phone: '',
					uSchool: '',
					uMajor: '',
					english: '',
					political: '',
					math: '',
					specialized: '',
					tutorId: '',
					counsellorId: '',
					sex: '',
					tuturName: '',
					counsellorName: '',

					// stuId: '',
					// name: '',
					// sex: '',
					// phone: '',
					// uSchool: '',
					// uMajor: '',
					// tutor: '',
					// counsellor: '',
					languagesTypes: '',
					languagesScore: '',
					// english: '',
					// political: '',
					// math: '',
					// specialized: '',

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
				}			
			],
			queryData: {
	        	userId: sessionStorage.getItem("userId"),
	        	state: sessionStorage.getItem("state")
	        },
		}
	},
	created(){
		this.queryForAdmin()
	},
	computed: {
    },
	methods: {
		queryForAdmin(){
			var submitData ={
				userId: this.queryData.userId,
				status: this.queryData.status,
				state: this.queryData.state,
			}
			this.isDisAble = true
			this.$http.ShowStusForTeacher(submitData).then((result) => {
				if (result.c == 200) {
					this.stuData = result.r
				} else {
					this.stuData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		showDetails(index, row){
			sessionStorage.setItem('name', row.name)
			sessionStorage.setItem('stuId', row.stuId)
			sessionStorage.setItem('phone', row.phone)
			sessionStorage.setItem('uSchool', row.uSchool)
			sessionStorage.setItem('uMajor', row.uMajor)
			sessionStorage.setItem('english', row.english)
			sessionStorage.setItem('political', row.political)
			sessionStorage.setItem('math', row.math)
			sessionStorage.setItem('specialized', row.specialized)
			sessionStorage.setItem('sex', row.sex)
			sessionStorage.setItem('tuturName', row.tuturName)
			sessionStorage.setItem('counsellorName', row.counsellorName)
			sessionStorage.setItem('idCard', row.idCard)
			sessionStorage.setItem('masterMajor', row.masterMajor)
			sessionStorage.setItem('politicalOutlook', row.politicalOutlook)
			sessionStorage.setItem('biogenicLand', row.biogenicLand)
			sessionStorage.setItem('masterDirection', row.masterDirection)
			sessionStorage.setItem('eMail', row.eMail)
			sessionStorage.setItem('emergencyContact', row.emergencyContact)
			sessionStorage.setItem('emergencyPhone', row.emergencyPhone)
			sessionStorage.setItem('secretary', row.secretary)
			sessionStorage.setItem('averageScore', row.averageScore)
			sessionStorage.setItem('currNumber', row.currNumber)
			sessionStorage.setItem('languagesTypes', row.languagesTypes)
			sessionStorage.setItem('languagesScore', row.languagesScore)
			this.$router.push({name: 'BaseInfoShow', params: {orderId: row.id}})
		}
	},
	components: {
	},
}		
</script>

<style scoped>
	.labcenter-main{
		margin: 0 auto;
	}
</style>