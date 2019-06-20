<template>
  <div class="lab-main">
    <div class="content">
      <br>
      <el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="projectFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="projectFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目类型" prop="proClass">
          <el-select v-model="projectFrom.proClass" placeholder="请选择项目类型" style="width: 525px">
            <el-option
              v-for="item in proClasses"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="projectFrom.proName" placeholder="项目名称" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>

      <el-form :inline="true" :model="projectFrom" :rules="rules" ref="projectFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目类别" prop="proType">
          <el-select v-model="projectFrom.proType" placeholder="请选择项目类别" style="width: 525px" v-if="projectFrom.proClass === '创新项目'">
            <el-option
              v-for="item in proTypes1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="projectFrom.proType" placeholder="请选择项目类别" style="width: 525px" v-else-if="projectFrom.proClass === '创业项目'">
            <el-option
              v-for="item in proTypes2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="projectFrom.proType" placeholder="请选择项目类别" style="width: 525px"  disabled v-else-if="projectFrom.proClass === '工程项目'">
            <el-option
              v-for="item in proTypes3"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="projectFrom.proType" placeholder="请选择项目类别" style="width: 525px" v-else>
            <el-option
              v-for="item in proTypes4"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>        
      </el-form>



      <br>
      <el-form :inline="true" :model="projectFrom" :rules="rules" ref="projectFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目级别" prop="proLevel">
          <el-select v-model="projectFrom.proLevel" placeholder="请选择项目级别" style="width: 200px">
            <el-option
              v-for="item in proLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        <el-form-item label="项目状态" prop="proState">
          <el-select v-model="projectFrom.proState" placeholder="请选择项目状态" style="width: 200px">
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
      <el-form :inline="true" :model="projectFrom" :rules="rules" ref="projectFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="参与排名" prop="ranking">
          <el-input v-model="projectFrom.ranking" placeholder="项目中个人排名"></el-input>
        </el-form-item>
        <el-form-item label="参与人数" prop="totalNumber">
          <el-input v-model="projectFrom.totalNumber" placeholder="项目总参与人数"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="projectFrom" :rules="rules" ref="projectFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="指导老师" prop="proTeacher">
          <el-input v-model="projectFrom.proTeacher" placeholder="指导老师"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="proTime">
          <div class="block">
              <el-date-picker
                v-model="projectFrom.proTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px">
              </el-date-picker>
            </div>
        </el-form-item>        
      </el-form>
      <br>
      <el-form :inline="true" :model="projectFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="项目成果" prop="proResult">
          <el-input type="textarea" v-model="projectFrom.proResult" placeholder="项目成果" style="width: 525px"></el-input>
        </el-form-item>
      </el-form>
      <br>
     <!--  <br>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/file/upload"
        :data="fileForm4"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit = 1
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传pdf文件,请将表单信息填好之后上传文件</div>
      </el-upload>
      <br><br><br> -->
      <el-form label-width="70px" :model="projectFrom">
        <el-form-item style="margin-left: -40px">
         <!--  <el-button style="width: 100px" @click="deletes" type="warning">删除</el-button>
          <el-button style="width: 100px" @click="modify('projectFrom')" type="info">确定</el-button> -->
          <el-button style="width: 100px" @click="cencel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OrderCenter',
  data() {
    return {
        fileList: [],
        projectFrom: {
          id: '',
          stuId: '',
          name: '',

          proClass: '',

          proName: '',
          proType: '', //
          proLevel: '',
          ranking: null,
          totalNumber: null,
          proState: '',
          proResult: '',
         
          proTeacher: '',
          proTime: '',
          proofMaterialId: '',
        },
        proClasses: [{
          value: '创新项目',
          label: '创新项目'
        },{
          value: '创业项目',
          label: '创业项目'
        },{
          value: '工程项目',
          label: '工程项目'
        }],

        proTypes2: [{
          value: "新苗计划",
          label: "新苗计划"
        },{
          value: "创新创业孵化项目",
          label: "创新创业孵化项目"
        },{
          value: "科技成果推广项目",
          label: "科技成果推广项目"
        },{
          value: "科技推广项目",
          label: "科技推广项目"
        },{
          value: "优秀论文资助项目",
          label: "优秀论文资助项目"
        },{
          value: "其他项目",
          label: "其他项目"
        }],
        proTypes1: [{
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
          value: "申报",
          label: "申报"
        },{
          value: "在研",
          label: "在研"
        },{
          value: "结题",
          label: "结题"
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
          proClass: [
            {required: true, message: '项目大类不能为空', trigger: 'blur'},
          ],
          proType: [
            {required: true, message: '项目类型不能为空', trigger: 'blur'},
          ],
          proState: [
            {required: true, message: '项目状态不能为空', trigger: 'blur'},
          ],
          // proIntr: [
          //   {required: true, message: '项目简介不能为空', trigger: 'blur'},
          // ],
          proResult: [
            {required: true, message: '项目成果不能为空', trigger: 'blur'},
          ],
          proLevel: [
            {required: true, message: '项目级别不能为空', trigger: 'blur'},
          ],
          proTime: [
            {required: true, message: '项目时间不能为空', trigger: 'blur'},
          ],
          ranking: [
            {required: true, message: '参赛排名不能为空', trigger: 'blur'},
          ],
          totalNumber: [
            {required: true, message: '参赛人数不能为空', trigger: 'blur'},
          ],
          proTeacher: [
            {required: true, message: '指导老师不能为空', trigger: 'blur'},
          ]
        },
    }
  },
  created() {
    this.projectFrom.id = sessionStorage.getItem('id')
    this.projectFrom.name = sessionStorage.getItem('name')
    this.projectFrom.stuId = sessionStorage.getItem('stuId')
    this.projectFrom.proClass = sessionStorage.getItem('proClass')
    this.projectFrom.stuId = sessionStorage.getItem('stuId')
    this.projectFrom.proName = sessionStorage.getItem('proName')
    this.projectFrom.proType = sessionStorage.getItem('proType')
    this.projectFrom.proState = sessionStorage.getItem('proState')
    this.projectFrom.ranking = sessionStorage.getItem('ranking')
    this.projectFrom.totalNumber = sessionStorage.getItem('totalNumber')
    this.projectFrom.proLevel = sessionStorage.getItem('proLevel')
    this.projectFrom.proResult = sessionStorage.getItem('proResult')
    this.projectFrom.proTeacher = sessionStorage.getItem('proTeacher')
    this.projectFrom.proTime = sessionStorage.getItem('proTime')
    
  },
  computed: {
      fileForm4() {
         return {fileName:this.projectFrom.proClass + "_"+ this.projectFrom.stuId +"_"+ this.projectFrom.proName, isFront: 6}
      },
    },
  methods: {
    cencel() {
      this.$router.push({name: 'Center', params:{tagP: 'projectCenter'}})
    },
    modify(projectFrom) {
      this.$refs[projectFrom].validate((valid) => {
        if (valid) {
          if (this.projectFrom.proofMaterialId == '') {
            this.$message.warning("请上传佐证材料")
            return
          }
          this.$http.EditProject(this.projectFrom).then((result) => {
            if (result.c === 200) {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.$emit('flushQuery')
              this.$router.push({name: 'Center', params:{tagP: 'projectCenter'}})
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
    deletes() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.DeleProject(this.projectFrom.id).then((result) => {
          if (result.c === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.$emit('flushQuery')
            this.$router.push({name: 'Center', params:{tagP: 'projectCenter'}})
          } else {
            this.$message.warning(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });

    },
    submitUpload() {
    this.projectFrom.proofMaterialId = this.projectFrom.proClass + "_"+ this.projectFrom.stuId +"_"+ this.projectFrom.proName+ "_6.pdf"
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
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
  .lab-main{
    min-height: 530px;
    text-align: center;
    margin: 0 auto;
  }
  .content {
   min-width: 70%;
    min-height: 80%;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    horiz-align: center;
    white-space: nowrap;
    margin: 0;
    border:1px solid #999999;
    margin-top: 50px;
    background: #FFFFFF;
  }
</style>