<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="info" plain icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加硕士论文" :visible.sync="dialogLoginVisible" class="content">
      <div style="width: 100%; margin-left: -15px">
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="masterPaperFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="masterPaperFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="论文题目" prop="paperName">
          <el-input v-model="masterPaperFrom.paperName" placeholder="论文题目" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="论文摘要" prop="paperAbstract">
          <el-input type="textarea" v-model="masterPaperFrom.paperAbstract" placeholder="项目简介" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="外审成绩1" prop="score1">
          <el-input v-model="masterPaperFrom.score1" placeholder="外审成绩1" style="width: 525px"></el-input>
        </el-form-item>   
      </el-form>
       <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="外审意见1" prop="sugg1">
          <el-input v-model="masterPaperFrom.sugg1" placeholder="外审意见1" style="width: 525px"></el-input>
        </el-form-item>   
      </el-form>
      <br>
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="外审成绩2" prop="score2">
          <el-input v-model="masterPaperFrom.score2" placeholder="外审成绩2" style="width: 525px"></el-input>
        </el-form-item>   
      </el-form>
       <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="外审意见2" prop="sugg2">
          <el-input v-model="masterPaperFrom.sugg2" placeholder="外审意见2" style="width: 525px"></el-input>
        </el-form-item>   
      </el-form>
      <br>
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="外审成绩" prop="score3">
          <el-input v-model="masterPaperFrom.score3" placeholder="外审成绩" style="width: 525px"></el-input>
        </el-form-item>   
      </el-form>
       <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="外审意见" prop="sugg3">
          <el-input v-model="masterPaperFrom.sugg3" placeholder="外审意见" style="width: 525px"></el-input>
        </el-form-item>   
      </el-form>
      <br>
      <el-form :inline="true" :model="masterPaperFrom" :rules="rules" ref="masterPaperFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="获奖日期" prop="getDate">
          <div class="block">
              <el-date-picker
                v-model="masterPaperFrom.getDate"
                type="date"
                placeholder="选择日期"
                style="width: 525px">
              </el-date-picker>
            </div>
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
        <el-button type="info" style="width: 120px" @click="addHonor('masterPaperFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'AddMasterPaper',
    data() {
      return {
        dialogLoginVisible: false,
        fileList: [],
        masterPaperFrom: {
          stuId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('userName'),
          paperName: '',
          paperAbstract: '', //
          score1: '',
          sugg1: '',
          score2: '',
          sugg2: '',
          score3: '',
          sugg3: '',
          getDate: '',
          proofMaterialId: ''
        },
        loading: false,
        rules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
          ],
          paperName: [
            {required: true, message: '论文题目不能为空', trigger: 'blur'},
          ],
          paperAbstract: [
            {required: true, message: '论文摘要不能为空', trigger: 'blur'},
          ],
          score1: [
            {required: true, message: '外审成绩1不能为空，可填无', trigger: 'blur'},
          ],
          sugg1: [
            {required: true, message: '外审建议1不能为空，可填无', trigger: 'blur'},
          ],
          score2: [
            {required: true, message: '外审成绩2不能为空，可填无', trigger: 'blur'},
          ],
          sugg2: [
            {required: true, message: '外审建议2不能为空，可填无', trigger: 'blur'},
          ],
          score3: [
            {required: true, message: '外审成绩不能为空，可填无', trigger: 'blur'},
          ],
          sugg3: [
            {required: true, message: '外审建议不能为空，可填无', trigger: 'blur'},
          ],
          getDate: [
            {required: true, message: '时间不能为空', trigger: 'blur'},
          ],
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
        return {fileName: this.masterPaperFrom.stuId +"_"+ this.masterPaperFrom.paperName, isFront: 0}
      },
    },
    methods: {
      addHonor(masterPaperFrom) {
        this.$refs[masterPaperFrom].validate((valid) => {
          console.log(this.masterPaperFrom)
          if (valid) {
            if (this.masterPaperFrom.name == '') {
              this.$message.warning("请完善信息！")
              return
            }
            this.$http.EditMasterPaper(this.masterPaperFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.masterPaperFrom.paperName = ''
                this.masterPaperFrom.paperAbstract = ''
                this.masterPaperFrom.score1 = ''
                this.masterPaperFrom.sugg1 = ''
                this.masterPaperFrom.score2 = ''
                this.masterPaperFrom.sugg2 = ''
                this.masterPaperFrom.score3 = ''
                this.masterPaperFrom.sugg3 = ''
                this.masterPaperFrom.getDate = ''
                this.masterPaperFrom.proofMaterialId = ''
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
        this.masterPaperFrom.proofMaterialId = this.masterPaperFrom.stuId +"_"+ this.masterPaperFrom.paperName+ "_0.jpg"
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