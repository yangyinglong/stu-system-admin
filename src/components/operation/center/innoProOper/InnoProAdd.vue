<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="info" plain icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加创新项目" :visible.sync="dialogLoginVisible" class="content">
      <div style="width: 100%; margin-left: -15px">
      <el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="innoProFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="innoProFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="innoProFrom.proName" placeholder="项目名称" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目简介" prop="proIntr">
          <el-input type="textarea" v-model="innoProFrom.proIntr" placeholder="项目简介" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" ref="innoProFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目类别" prop="proType">
          <el-select v-model="innoProFrom.proType" placeholder="请选择项目类别" style="width: 525px">
            <el-option
              v-for="item in proTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>        
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" ref="innoProFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目级别" prop="proLevel">
          <el-select v-model="innoProFrom.proLevel" placeholder="请选择项目级别" style="width: 200px">
            <el-option
              v-for="item in proLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        <el-form-item label="竞赛状态" prop="proState">
          <el-select v-model="innoProFrom.proState" placeholder="请选择竞赛状态" style="width: 200px">
            <el-option
              v-for="item in proStates"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" ref="innoProFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="参赛排名" prop="ranking">
          <el-input v-model="innoProFrom.ranking" placeholder="参赛排名"></el-input>
        </el-form-item>
        <el-form-item label="参赛人数" prop="totalNumber">
          <el-input v-model="innoProFrom.totalNumber" placeholder="参赛人数"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" ref="innoProFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="指导老师" prop="teacher">
          <el-input v-model="innoProFrom.teacher" placeholder="指导老师"></el-input>
        </el-form-item>
        <el-form-item label="获奖日期" prop="getDate">
          <div class="block">
              <el-date-picker
                v-model="innoProFrom.getDate"
                type="date"
                placeholder="选择日期"
                style="width: 200px">
              </el-date-picker>
            </div>
        </el-form-item>        
      </el-form>
      <br>
      <el-form :inline="true" :model="innoProFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目成果" prop="proResult">
          <el-input type="textarea" v-model="innoProFrom.proResult" placeholder="项目成果" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/file/upload"
        :data="fileForm4"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb，请将表单信息填好之后上传文件</div>
      </el-upload>
    </div>
    <br><br>
    <div style="margin: 0 auto">
      <el-row>
        <el-button style="width: 120px" @click="dialogLoginVisible = false, fileList = []">取消</el-button>
        <el-button type="info" style="width: 120px" @click="addHonor('innoProFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'AddInnoPro',
    data() {
      return {
        dialogLoginVisible: false,
        fileList: [],
        innoProFrom: {
          stuId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('userName'),
          proName: '',
          proType: '', //
          proIntr: '',
          ranking: null,
          totalNumber: null,
          proState: '',
          proResult: '',
          proLevel: '',
          teacher: '',
          getDate: '',
          proofMaterialId: '',
        },
        proTypes: [{
          value: "创业孵化项目",
          label: "创业孵化项目"
        },{
          value: "互联网创业项目",
          label: "互联网创业项目"
        },{
          value: "个人创业项目",
          label: "个人创业项目"
        },{
          value: "其他项目",
          label: "其他项目"
        }],
        proStates: [{
          value: "申请",
          label: "申请"
        },{
          value: "项目进行初期",
          label: "项目进行初期"
        },{
          value: "项目进行中期",
          label: "项目进行中期"
        },{
          value: "项目完成",
          label: "项目完成"
        }],
        proLevels: [{
          value: "国家级",
          label: "国家级"
        },{
          value: "省级",
          label: "省级"
        },{
          value: "企业",
          label: "企业"
        },{
          value: "校级",
          label: "校级"
        }],
        loading: false,
        rules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
          ],
          proName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'},
          ],
          proType: [
            {required: true, message: '项目类型不能为空', trigger: 'blur'},
          ],
          proState: [
            {required: true, message: '比赛状态不能为空', trigger: 'blur'},
          ],
          proIntr: [
            {required: true, message: '项目简介不能为空', trigger: 'blur'},
          ],
          proResult: [
            {required: true, message: '项目成果不能为空', trigger: 'blur'},
          ],
          proLevel: [
            {required: true, message: '项目级别不能为空', trigger: 'blur'},
          ],
          getDate: [
            {required: true, message: '时间不能为空', trigger: 'blur'},
          ],
          ranking: [
            {required: true, message: '参赛排名不能为空', trigger: 'blur'},
          ],
          totalNumber: [
            {required: true, message: '参赛人数不能为空', trigger: 'blur'},
          ],
          teacher: [
            {required: true, message: '参赛人数不能为空', trigger: 'blur'},
          ]
        },
        checkCode: '',
      }
    },
    created(){
      // this.createCode()
    },
    mounted() {
    },
    computed: {
      fileForm4() {
        return {fileName: this.innoProFrom.stuId +"_"+ this.innoProFrom.proName, isFront: 5}
      },
    },
    methods: {
      addHonor(innoProFrom) {
        this.$refs[innoProFrom].validate((valid) => {
          console.log(this.innoProFrom)
          if (valid) {
            if (this.innoProFrom.name == '') {
              this.$message.warning("请完善信息！")
              return
            }
            this.$http.EditInnoPro(this.innoProFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.innoProFrom.proType = ''
                this.innoProFrom.proName = ''
                this.innoProFrom.proIntr = ''
                this.innoProFrom.ranking = ''
                this.innoProFrom.totalNumber = ''
                this.innoProFrom.proState = ''
                this.innoProFrom.proResult = ''
                this.innoProFrom.proLevel = ''
                this.innoProFrom.getDate = ''
                this.innoProFrom.teacher = ''
                this.innoProFrom.proofMaterialId = ''
                this.$emit('flushQuery')
                this.fileList = []
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
      },
      submitUpload() {
        this.$refs.upload.submit();
        this.innoProFrom.proofMaterialId = this.innoProFrom.stuId +"_"+ this.innoProFrom.proName+ "_5.jpg"
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      createCode(){
           var code = "";    
           var codeLength = 4;//验证码的长度   
           var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',   
                       'S','T','U','V','W','X','Y','Z');//随机数   
           for(var i = 0; i < codeLength; i++) {
                 //循环操作   
                 var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）   
                 code += random[index];//根据索引取得随机数加到code上   
           }   
          this.checkCode = code;
      },
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