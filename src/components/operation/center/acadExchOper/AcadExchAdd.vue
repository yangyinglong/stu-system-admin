<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="info" plain icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加学术交流" :visible.sync="dialogLoginVisible" class="content">
      <div style="width: 100%; margin-left: -15px">
      <el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="acadExchFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="acadExchFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="acadExchFrom" :rules="rules" ref="acadExchFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="交流类别" prop="exchangeType">
          <el-select v-model="acadExchFrom.exchangeType" placeholder="请选择交流类别" style="width: 205px">
            <el-option
              v-for="item in exchangeTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>   
        <el-form-item label="交流级别" prop="level">
          <el-select v-model="acadExchFrom.level" placeholder="请选择交流级别" style="width: 205px">
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>        
      </el-form>
      <br>
      <el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目名称" prop="organization">
          <el-input v-model="acadExchFrom.organization" placeholder="项目名称" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
       <br>
      <el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="会议名称" prop="conferenceName">
          <el-input v-model="acadExchFrom.conferenceName" placeholder="会议名称" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="acadExchFrom" :rules="rules" ref="acadExchFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="开始日期" prop="startTime">
          <div class="block">
              <el-date-picker
                v-model="acadExchFrom.startTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px">
              </el-date-picker>
            </div>
        </el-form-item>   
        <el-form-item label="结束日期" prop="endTime">
          <div class="block">
              <el-date-picker
                v-model="acadExchFrom.endTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px">
              </el-date-picker>
            </div>
        </el-form-item>        
      </el-form>
      <br>
      <el-form :inline="true" :model="acadExchFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="交流成果" prop="result">
          <el-input type="textarea" v-model="acadExchFrom.result" placeholder="交流成果" style="width: 525px"></el-input>
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
        <el-button type="info" style="width: 120px" @click="addHonor('acadExchFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'AddAcadExch',
    data() {
      return {
        dialogLoginVisible: false,
        fileList: [],
        acadExchFrom: {
          stuId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('userName'),

          exchangeType: '',
          organization: '', //
          conferenceName: '',
          startTime: '',
          endTime: '',
          level: '',
          result: '',
          proofMaterialId: '',
        },
        exchangeTypes: [{
          value: "夏令营",
          label: "夏令营"
        },{
          value: "国际会议",
          label: "国际会议"
        },{
          value: "国内会议",
          label: "国内会议"
        },{
          value: "研究生论坛",
          label: "研究生论坛"
        },{
          value: "其他",
          label: "其他"
        }],
        levels: [{
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
          exchangeType: [
            {required: true, message: '交流类别不能为空', trigger: 'blur'},
          ],
          organization: [
            {required: true, message: '组织机构不能为空，可填无', trigger: 'blur'},
          ],
          conferenceName: [
            {required: true, message: '会议名称不能为空，可填无', trigger: 'blur'},
          ],
          startTime: [
            {required: true, message: '开始时间不能为空', trigger: 'blur'},
          ],
          endTime: [
            {required: true, message: '结束时间不能为空', trigger: 'blur'},
          ],
          level: [
            {required: true, message: '交流级别不能为空', trigger: 'blur'},
          ],
          result: [
           {required: true, message: '交流成果不能为空', trigger: 'blur'},
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
        return {fileName: this.acadExchFrom.stuId +"_"+ this.acadExchFrom.organization, isFront: 8}
      },
    },
    methods: {
      addHonor(acadExchFrom) {
        this.$refs[acadExchFrom].validate((valid) => {
          console.log(this.acadExchFrom)
          if (valid) {
            if (this.acadExchFrom.name == '') {
              this.$message.warning("请完善信息！")
              return
            }
            this.$http.EditAcadExch(this.acadExchFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.acadExchFrom.exchangeType = ''
                this.acadExchFrom.organization = ''
                this.acadExchFrom.conferenceName = ''
                this.acadExchFrom.startTime = ''
                this.acadExchFrom.endTime = ''
                this.acadExchFrom.level = ''
                this.acadExchFrom.result = ''
                this.acadExchFrom.proofMaterialId = ''
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
        this.acadExchFrom.proofMaterialId = this.acadExchFrom.stuId +"_"+ this.acadExchFrom.organization+ "_8.jpg"
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