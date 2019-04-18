<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="info" plain icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加发明专利" :visible.sync="dialogLoginVisible" class="content">
      <div style="width: 100%; margin-left: -15px">
      <el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="patentFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="patentFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="patentFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="专利名称" prop="patentName">
          <el-input v-model="patentFrom.patentName" placeholder="专利名称" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="patentFrom" :rules="rules" ref="patentFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="专利类别" prop="patentType">
          <el-select v-model="patentFrom.patentType" placeholder="请选择专利类别" style="width: 200px">
            <el-option
              v-for="item in patentTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>

        <el-form-item label="专利状态" prop="patentState">
          <el-select v-model="patentFrom.patentState" placeholder="请选择专利状态" style="width: 200px">
            <el-option
              v-for="item in patentStates"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        
      </el-form>
      <br>
      <el-form :inline="true" :model="patentFrom" :rules="rules" ref="patentFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="作者排名" prop="ranking">
          <el-input v-model="patentFrom.ranking" placeholder="作者排名"></el-input>
        </el-form-item>
        <el-form-item label="作者人数" prop="totalNumber">
          <el-input v-model="patentFrom.totalNumber" placeholder="作者人数"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="patentFrom" :rules="rules" ref="patentFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="获奖日期" prop="getDate">
          <div class="block">
              <el-date-picker
                v-model="patentFrom.getDate"
                type="date"
                placeholder="选择日期"
                style="width: 530px">
              </el-date-picker>
            </div>
        </el-form-item>
      </el-form>
    </div>
    

    <br><br>
    <div style="margin: 0 auto">
      <el-row>
        <el-button style="width: 120px" @click="dialogLoginVisible = false">取消</el-button>
        <el-button type="info" style="width: 120px" @click="addHonor('patentFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'AddPatent',
    data() {
      return {
        dialogLoginVisible: false,
        patentFrom: {
          stuId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('userName'),
          patentName: '',
          patentType: '',
          ranking: '',
          totalNumber: '',
          patentState: '',
          getDate:''
        },
        patentTypes: [{
          value: 1,
          label: "实用新型专利"
        },{
          value: 2,
          label: "发明专利"
        }],
        patentStates: [{
          value: 1,
          label: "申请"
        },{
          value: 2,
          label: "受理"
        },{
          value: 3,
          label: "审查中"
        },{
          value: 4,
          label: "一审"
        },{
          value: 5,
          label: "二审"
        },{
          value: 6,
          label: "三审"
        },{
          value: 7,
          label: "授权"
        }],
        loading: false,
        rules: {
          patentName: [
            {required: true, message: '专利名称不能为空', trigger: 'blur'},
          ],
          patentType: [
            {required: true, message: '专利类别不能为空', trigger: 'blur'},
          ],
          ranking: [
            {required: true, message: '作者排名不能为空', trigger: 'blur'},
          ],
          totalNumber: [
            {required: true, message: '总作者人数不能为空', trigger: 'blur'},
          ],
          patentState: [
            {required: true, message: '专利状态不能为空', trigger: 'blur'},
          ],
          getDate: [
            {required: true, message: '时间不能为空', trigger: 'blur'},
          ],
        }
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      addHonor(patentFrom) {
        this.$refs[patentFrom].validate((valid) => {
          if (valid) {
            if (this.patentFrom.name == '') {
              this.$message.warning("请完善信息！")
              return
            }
            this.$http.EditPatent(this.patentFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.patentFrom.patentName = ''
                this.patentFrom.patentType = ''
                this.patentFrom.getDate = ''
                this.patentFrom.ranking = ''
                this.patentFrom.totalNumber = ''
                this.patentFrom.patentState = ''
                this.$emit('flushQuery')
                this.dialogLoginVisible = false
              } else {
                this.$message.warning(result.r)
              }
            }, (err) => {
              this.$message.error(err.msg)
            })
          } else {
            this.$message.warning("请完善信息！")
          }
        })
      }
    }
  }

</script>

<style scoped>
.content {
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	horiz-align: center;
	white-space: nowrap;
	margin: 0;
}
</style>