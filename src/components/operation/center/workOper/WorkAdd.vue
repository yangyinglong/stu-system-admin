<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="info" plain icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加就业深造" :visible.sync="dialogLoginVisible" class="content">
      <div style="width: 100%; margin-left: -15px">
      <el-form :inline="true" :model="workFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="workFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="workFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="单位名称" prop="companyName">
          <el-input v-model="workFrom.companyName" placeholder="单位名称" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="单位性质" prop="companyType">
          <el-select v-model="workFrom.companyType" placeholder="请选择单位性质" style="width: 205px">
            <el-option
              v-for="item in companyTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        <el-form-item label="就业类型" prop="companyName">
          <el-input v-model="workFrom.workType " placeholder="就业类型" style="width: 205px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="workFrom" :rules="rules" ref="workFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="开始日期" prop="getDate">
          <div class="block">
              <el-date-picker
                v-model="workFrom.getDate"
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
        :data="fileForm1"
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
        <el-button type="info" style="width: 120px" @click="addHonor('workFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'AddWork',
    data() {
      return {
        dialogLoginVisible: false,
        fileList: [],
        workFrom: {
          stuId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('userName'),
          companyName: '',
          companyType: '',
          workType: '',
          getDate: '',
          proofMaterialId: '',
        },
        companyTypes: [{
          value: "国有企业",
          label: "国有企业"
        },{
          value: "事业单位",
          label: "事业单位"
        },{
          value: "高等院校",
          label: "高等院校"
        },{
          value: "研究院所",
          label: "研究院所"
        },{
          value: "国外高校",
          label: "国外高校"
        },{
          value: "合资企业",
          label: "合资企业"
        },{
          value: "外资企业",
          label: "外资企业"
        },{
          value: "民营企业",
          label: "民营企业"
        },{
          value: "私营企业",
          label: "私营企业"
        }],
        loading: false,
        rules: {
          companyName: [
            {required: true, message: '单位名称不能为空', trigger: 'blur'},
          ],
          companyType: [
            {required: true, message: '单位性质不能为空', trigger: 'blur'},
          ],
          workType: [
            {required: true, message: '就业性质不能为空', trigger: 'blur'},
          ],
          getDate: [
            {required: true, message: '时间不能为空', trigger: 'blur'},
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
      fileForm1() {
        return {fileName: this.workFrom.stuId +"_"+ this.workFrom.companyName, isFront: 9}
      },
    },
    methods: {
      addHonor(workFrom) {
        this.$refs[workFrom].validate((valid) => {
          if (valid) {
            if (this.workFrom.name == '') {
              this.$message.warning("请完善信息！")
              return
            }
            this.$http.EditWork(this.workFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.workFrom.honorType = ''
                this.workFrom.honorGrade = ''
                this.workFrom.honorLevel = ''
                this.workFrom.getDate = ''
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
        this.workFrom.proofMaterialId = this.workFrom.stuId +"_"+ this.workFrom.companyName + "_9.jpg"
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