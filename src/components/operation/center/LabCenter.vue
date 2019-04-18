<!-- <template>
	<div style="margin: 0 auto">
		<div style="text-align:center; margin-top: 20px;">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item label="名称">
				<el-input v-model="queryData.labName" placeholder="光化学折线实验室"></el-input>
				</el-form-item>
				<el-form-item label="地址">
				<el-input v-model="queryData.labAddress" placeholder="杭州电子科技大学"></el-input>
				</el-form-item>
				<el-form-item label="管理员">
				<el-input v-model="queryData.labAdmin" placeholder="实验室管理员"></el-input>
				</el-form-item>
				<el-form-item>
				<el-button type="primary" @click="query" :disabled="isDisAble">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div style="margin: 20px; min-height: 350px">
			<el-table :data="labData" v-loading="isDisAble">
				<el-table-column prop="name" label="名称" width="300"></el-table-column>
				<el-table-column prop="address" label="地址" width="350"></el-table-column>
				<el-table-column prop="adminName" label="管理员" width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showDetails(scope.$index, scope.row)">查看</el-button>
					<el-button type="text" size="small" @click="beSpeak(scope.$index, scope.row)">预定</el-button>
				</template>
				</el-table-column>
			</el-table>
		</div>
		<br>
		<div class="block" style="text-align:center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10]"
				:page-size="5"
				layout="total, prev, pager, next, jumper"
				:total="total"
				:disabled="isDisAble">
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LabCenter',
	data () {
		return {
			isDisAble: false,
			loading: true,
	        currentPage: 1,
	        queryData: {
	        	labName: '',
	        	labAddress: '',
	        	labAdmin: '',
	        	page: 0
	        },
			labData: [
				{
					name: "光化学折线实验室",
					address: "杭州电子科技大学1教北534",
					adminName: "赵伟华",
				}				
			],
			allLabNum: 1
		}
	},
	created(){
		this.getSession()
		this.queryLab()
	},
	computed: {
      total() {
      	return this.allLabNum
      }
    },
	methods: {
		getSession() {
			if (sessionStorage.getItem('queryLabName') != null) {
				this.queryData.labName = sessionStorage.getItem('queryLabName')
			} else {
				this.queryData.labName = ''
			}
			if (sessionStorage.getItem('queryLabAddress') != null) {
				this.queryData.labAddress = sessionStorage.getItem('queryLabAddress')
			} else {
				this.queryData.labAddress = ''
			}
			if (sessionStorage.getItem('queryLabAdmin') != null) {
				this.queryData.labAdmin = sessionStorage.getItem('queryLabAdmin')
			} else {
				this.queryData.labAdmin = ''
			}
			if (sessionStorage.getItem('queryPage') != null) {
				this.queryData.page = parseInt(sessionStorage.getItem('queryPage'))
				this.currentPage = parseInt(sessionStorage.getItem('queryPage'))
			} else {
				this.queryData.page = 1
				this.currentPage = 1
			}
			if (sessionStorage.getItem('allLabNum') != null) {
				this.allLabNum = parseInt(sessionStorage.getItem('allLabNum'))
			} else {
				this.queryLabNum()
			}
		},
		setSession() {
			sessionStorage.setItem('queryLabName', this.queryData.labName)
			sessionStorage.setItem('queryLabAddress', this.queryData.labAddress)
			sessionStorage.setItem('queryLabAdmin', this.queryData.labAdmin)
			sessionStorage.setItem('queryPage', this.queryData.page)
		},
		query() {
			this.currentPage = '1'
			this.queryLabNum()
			this.queryLab()
		},
		queryLabNum() {
			this.queryData.page = 1
			var submitData ={
				labName: this.queryData.labName == '' ? '%' : '%'+this.queryData.labName+'%',
				labAddress: this.queryData.labAddress == '' ? '%' : '%'+this.queryData.labAddress+'%',
				adminName: this.queryData.labAdmin == '' ? '%' : '%'+this.queryData.labAdmin+'%',
				page: this.queryData.page
			}
			this.setSession()			
			this.$http.ShowLabNum(submitData).then((result) => {
				if (result.c == 200) {
					this.currentPage = 1
					this.allLabNum = result.r
					sessionStorage.setItem('allLabNum' , this.allLabNum)
				} else {
					this.allLabNum = 1
					this.currentPage = 1
					this.$message.error(result.r)
				}
			}, (err) => {
	            this.$message.error(err.msg)
	        })
			// todo
		},
		queryLab(){
			var submitData ={
				labName: this.queryData.labName == '' ? '%' : '%'+this.queryData.labName+'%',
				labAddress: this.queryData.labAddress == '' ? '%' : '%'+this.queryData.labAddress+'%',
				adminName: this.queryData.labAdmin == '' ? '%' : '%'+this.queryData.labAdmin+'%',
				page: this.queryData.page
			}	
			this.setSession()
			this.isDisAble = true
			this.$http.ShowLaboratory(submitData).then((result) => {
				if (result.c == 200) {
					this.labData = result.r
				} else {
					this.labData = []
				}
				this.isDisAble = false
			}, (err) => {
	            this.$message.error(err.msg)
	        })
		},
		showDetails(index, row){
			sessionStorage.setItem('labId', row.id)
			sessionStorage.setItem('labName', row.name)
			sessionStorage.setItem('address', row.address)
			sessionStorage.setItem('adminName', row.adminName)
			sessionStorage.setItem('openTime', row.openTime)
			sessionStorage.setItem('desc', row.desc)
			sessionStorage.setItem('adminId', row.adminId)
			this.$router.push({name: 'LabShow', params: {orderId: row.id}})
		},
		beSpeak(index, row){
			sessionStorage.setItem('labId', row.id)
			sessionStorage.setItem('labName', row.name)
			sessionStorage.setItem('address', row.address)
			sessionStorage.setItem('adminName', row.adminName)
			sessionStorage.setItem('openTime', row.openTime)
			sessionStorage.setItem('desc', row.desc)
			sessionStorage.setItem('adminId', row.adminId)
			this.$router.push({name: 'LabBeSpeak', params: {orderId: row.id}})
		},
		handleSizeChange(val) {
		},
		handleCurrentChange(val) {
			this.queryData.page = val
			this.queryLab()
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
</style> -->