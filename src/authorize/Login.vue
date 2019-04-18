<!-- login.vue -->
<template>
	<div class="content">
    <div v-if="loginStatus === 0">
      <b class="linked" @click="dialogLoginVisible = true">{{userName}}</b>
      <el-dialog width="350px" title="登录" :visible.sync="dialogLoginVisible">
        <div>
          <el-form :model="loginform" :rules="rules" ref="loginform" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input v-model="loginform.name" placeholder="请输入教师号" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="loginform.password" autocomplete="off"
                        placeholder="请输入登录密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="state">
              <el-select v-model="loginform.state" placeholder="请选择身份" style="width: 310px">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>              
            </el-form-item>
          </el-form>

        </div>
        <div style="width: 200px; margin:0 auto">
          <div style="float: left">
            <el-checkbox v-model="loginform.rememberPassword">记住密码</el-checkbox>
          </div>
          <router-link to="/forgotPass">
            <div style="float: right" @click="dialogLoginVisible = false">忘记密码</div>
          </router-link>
        </div>
        <div style="height: 90px"></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLoginVisible = false">取 消</el-button>
          <el-button type="primary" @click="login('loginform')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- todo -->
    <div v-else>
      <router-link to="/usercenter" style="text-decoration: none;"><b class="linked">{{userName}}</b></router-link>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.loginform.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      return {
        dialogLoginVisible: false,
        options:[{
          value: 1,
          label: "辅导员"
        },{
          value: 2,
          label: "导师"
        }],
        // loginLable: '登录',
        loginform: {
          name: '',
          password: '',
          state: null,
          rememberPassword: false,
          checkPass: ''
        },
        // loginStatus: this.status,
        // userName: this.userNamed,
        loading: false,
        rules: {
          name: [
            {required: true, message: '账号不能为空', trigger: 'blur'},
            {min: 3, max: 15, message: '请输入正确的学号', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          state: [
            {required: true, message: '身份不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.getCookie()
    },
    computed: {
      userName() {
        return this.$store.state.userName
      },
      loginStatus() {
        return this.$store.state.loginStatus
      }
    },
    methods: {
      login: function (loginform) {
        this.$refs[loginform].validate((valid) => {
          if (valid) {
            var loginFormData = {
              stuId: this.loginform.name,
              password: this.loginform.password,
              state: this.loginform.state
            }
            this.$http.LoginTeacher(loginFormData).then((result) => {
              if (result.c === 200) {
                sessionStorage.setItem('userId', result.r.stuId)
                sessionStorage.setItem('userName', result.r.name)
                sessionStorage.setItem('phone', result.r.phone)
                sessionStorage.setItem('status', result.r.status)
                sessionStorage.setItem('state', result.r.state)
                // this.$emit("changeStatus", result.r.status)
                this.$store.dispatch('login', result.r).then(() => {
                  this.$message({
                    message: '欢迎您，' + result.r.name + '!',
                    type: 'success'
                  });
                })
                this.setCookie(this.loginform.name, this.loginform.password, 7, this.loginform.rememberPassword)
                this.$store.state.userName = result.r.name
                this.$store.state.loginStatus = result.r.status
                this.dialogLoginVisible = false
              } else {
                // this.$message.warning("登录失败，请确认用户名和密码。")
                this.dialogLoginVisible = true // todo
                this.$alert('账号或密码错误，请重新输入', {
                  dangerouslyUseHTMLString: true,
                  callback: this.clearPass,
                  showClose: false
                });
              }
            }, (err) => {
              this.$message.error(err.msg)
            })        
            this.$router.push({name: 'Home', params: {}})
          } else {
            this.$alert('请输入账号和密码', {
              dangerouslyUseHTMLString: true,
              showClose: false
            })
          }
        });
      },
      clearPass(){
        this.loginform.password = ''
      },
      setCookie(c_name, c_pwd, exdays, remeberFlag) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
      }, 
      //读取cookie
      getCookie: function() {
          if (document.cookie.length > 0) {
              var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
              for (var i = 0; i < arr.length; i++) {
                  var arr2 = arr[i].split('='); //再次切割
                  //判断查找相对应的值
                  if (arr2[0] === 'userName') {
                      this.loginform.name = arr2[1]; //保存到保存数据的地方
                  } else if (arr2[0] === 'userPwd') {
                      this.loginform.password = arr2[1];
                  } else if (arr2[0] === 'remeberFlag') {
                    if (arr2[1] === "true") {                    
                      this.loginform.rememberPassword = true;
                    } else {
                      this.loginform.rememberPassword = false;
                    }
                  }
              }
          }
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