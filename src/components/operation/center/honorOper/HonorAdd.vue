<template>
  <div>
    <b class="linked" @click="dialogLoginVisible = true">
      <el-button type="info" plain icon="el-icon-plus" size="mini"></el-button>
    </b>
    <el-dialog width="720px" title="添加荣誉奖项" :visible.sync="dialogLoginVisible" class="content">
      <div style="width: 100%; margin-left: -15px">
      <el-form :inline="true" :model="honorFrom" :rules="rules" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="honorFrom.name" placeholder="姓名" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="honorFrom.stuId" placeholder="学号" readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-form :inline="true" :model="honorFrom" :rules="rules" ref="honorFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="荣誉类型" prop="honorType">
          <el-select v-model="honorFrom.honorType" placeholder="请选择荣誉类型" style="width: 200px">
            <el-option
              v-for="item in honorTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>

        <el-form-item label="荣誉级别" prop="honorLevel">
          <el-select v-model="honorFrom.honorLevel" placeholder="请选择荣誉级别" style="width: 200px">
            <el-option
              v-for="item in honorLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>
        
      </el-form>
      <br>
      <el-form :inline="true" :model="honorFrom" :rules="rules" ref="honorFrom" class="demo-form-inline" style="width: 100%" label-width="100px">
        <el-form-item label="荣誉等级" prop="honorGrade">
          <el-select v-model="honorFrom.honorGrade" placeholder="请选择荣誉等级" style="width: 200px">
            <el-option
              v-for="item in honorGrades"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
        </el-form-item>

        <el-form-item label="获奖日期" prop="getDate">
          <div class="block">
              <el-date-picker
                v-model="honorFrom.getDate"
                type="date"
                placeholder="选择日期"
                style="width: 200px">
              </el-date-picker>
            </div>
        </el-form-item>
        
      </el-form>
      <br>
      <!-- <el-upload
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
        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
      </el-upload> -->
    </div>
    <br><br>
    <div style="margin: 0 auto">
      <el-row>
        <el-button style="width: 120px" @click="dialogLoginVisible = false, fileList = []">取消</el-button>
        <el-button type="info" style="width: 120px" @click="addHonor('honorFrom')">增加</el-button>
      </el-row>
    </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: 'AddHonor',
    data() {
      return {
        dialogLoginVisible: false,
        fileList: [],
        honorFrom: {
          stuId: sessionStorage.getItem('userId'),
          name: sessionStorage.getItem('userName'),
          honorType: '',
          honorLevel: '',
          honorGrade: '',
          getDate: ''
        },
        honorTypes: [{
          value: 1,
          label: "本科生奖学金"
        },{
          value: 2,
          label: "研究生奖学金"
        },{
          value: 3,
          label: "企业奖学金"
        },{
          value: 4,
          label: "优秀毕业生"
        },{
          value: 5,
          label: "三好学生"
        },{
          value: 6,
          label: "优秀班干部"
        },{
          value: 7,
          label: "优秀党支书"
        },{
          value: 8,
          label: "优秀团支书"
        },{
          value: 9,
          label: "十佳大学生"
        },{
          value: 10,
          label: "其他"
        }],
        honorLevels: [{
          value: 1,
          label: "国家级"
        },{
          value: 2,
          label: "省级"
        },{
          value: 3,
          label: "企业"
        },{
          value: 4,
          label: "校级"
        }],
        honorGrades:[{
          value: 1,
          label: "一等奖"
        },{
          value: 2,
          label: "二等奖"
        },{
          value: 3,
          label: "三等奖"
        }],
        loading: false,
        rules: {
          honorType: [
            {required: true, message: '类型不能为空', trigger: 'blur'},
          ],
          honorLevel: [
            {required: true, message: '级别不能为空', trigger: 'blur'},
          ],
          honorGrade: [
            {required: true, message: '等级不能为空', trigger: 'blur'},
          ],
          getDate: [
            {required: true, message: '时间不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    mounted() {
    },
    computed: {
      fileForm1() {
        return {fileName: 'hello', isFront: 1}
      },
    },
    methods: {
      addHonor(honorFrom) {
        this.$refs[honorFrom].validate((valid) => {
          console.log(this.honorFrom)
          if (valid) {
            if (this.honorFrom.name == '') {
              this.$message.warning("请完善信息！")
              return
            }
            this.$http.EditHonor(this.honorFrom).then((result) => {
              if (result.c === 200) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.honorFrom.honorType = ''
                this.honorFrom.honorGrade = ''
                this.honorFrom.honorLevel = ''
                this.honorFrom.getDate = ''
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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