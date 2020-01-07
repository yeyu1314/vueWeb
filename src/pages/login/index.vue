<template>
  <div
    class="signIn"
    v-loading="loading2"
    element-loading-text="正在登陆"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="z-login-wrap">
      <div class="z-login-box">
        <div class="z-content z-clearfix">
          <div class="z-title">
            <h1>
              <!--<img src="../assets/img/log03.png" />-->
              <span>登录</span>
            </h1>
          </div>
          <div class="z-form">
            <form id="loginForm">
              <el-input v-model="userPhone" placeholder="请输入手机号" class="d_input"></el-input>
              <div class="ctrlCode">
                <el-input v-model="code" placeholder="请输入验证码" class="d_input code"></el-input>
                <el-button
                  v-show="flag"
                  @click="getCode"
                  type="success"
                  plain
                  style="height: 40px;position: relative;top: 10px;width:40%;"
                >{{title}}</el-button>
                <el-button
                  v-show="!flag"
                  disabled
                  plain
                  style="height: 40px;position: relative;top: 10px;width:40%;"
                >重新获取({{second}}s)</el-button>
              </div>
              <el-button type="primary" class="z-login-btn" @keyup.enter="enter" @click="login">登录</el-button>
            </form>
          </div>
        </div>
      </div>
      <!-- <div class="z-shadow"></div>1 -->
    </div>
    <!--<p
      style="height:26px;line-height:26px;position:absolute;bottom:37px; !important;width:100%;    display: flex;flex-direction: column;"
    >
      <a href="http://www.miitbeian.gov.cn/" style="color:#fff">粤ICP备13074057号-2</a>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502001574"
        style="color:#fff"
      >
        <img src="../assets/img/renumber.png" alt style="position:relative;" />
        粤公网安备 44030502001574
      </a>
    </p>-->
  </div>
</template>
<script>
import net from '../../api/ajax'
import {getCode, logIn} from '../../api/index'
export default {
  data () {
    return {
      codeImg: '', // 验证码图片
      code: '',
      userPhone: '',
      password: '',
      loading2: false,
      uuId: '',
      baseCode: net.baseUrl + 'admin/log/StringCode?uuId=',
      flag: true,
      second: 59,
      title: '获取验证码'
    }
  },
  created () {
    let _this = this
    document.onkeydown = function (e) {
      let key = window.event.keyCode
      if (key === 13) {
        const sign = sessionStorage.getItem('signInfo')
        console.log(sign)
        if (sign == null) {
          _this.login()
        }
      }
    }
  },
  mounted () {
    this.automaticLogin()
  },
  methods: {
    async getCode () {
      if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
        net.message(this, '手机号码格式错误', 'error')
        return false
      }
      await getCode({userPhone: this.userPhone}).then(res => {
        console.log(res)
        if (res.retcode === 1) {
          console.log(res)
        }
      }).catch(res => {
        console.log(res)
      })
      this.$message({
        message: '短信发送成功',
        type: 'success'
      })
      this.count_down()
      this.flag = false
    },
    count_down () {
      var time = setInterval(() => {
        this.second = this.second - 1
        if (this.second === 0) {
          clearInterval(time)
          this.second = 59
          this.flag = true
        }
      }, 1000)
    },
    async login () {
      if (this.code === '') {
        net.message(this, '请输入验证码', 'warning')
      }
      let params = {
        userPhone: this.userPhone,
        code: this.code
      }
      this.loading2 = true
      await logIn(params).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
        if (res.data.retcode === 1) {
          net.message(this, '登录成功', 'success')
          console.log(res.data)
          sessionStorage.setItem('signInfo', JSON.stringify(res.data))
          net.setCookie('signInfo', JSON.stringify(res.data))
          setTimeout(() => {
            this.loading2 = false
            this.$router.push({ path: '/' })
          }, 1000)
        } else {
          net.message(this, res.data.retmsg, 'warning')
          // this.loading2 = false
        }
      })
    },
    // 自动登录
    async automaticLogin () {
      var signInfo = JSON.parse(net.getCookie('signInfo'))
      // admin/log/webToken"
      if (signInfo) {
        // this.loading2 = true
        this.loading2 = false
        await logIn({ userPhone: signInfo.phone }).then(res => {
          if (res.retcode === 1) {
            net.message(this, '登录成功', 'success')
            sessionStorage.setItem('signInfo', JSON.stringify(res.data))
            setTimeout(() => {
              this.loading2 = false
              this.$router.push({ name: 'index' })
            }, 1000)
          } else {
            net.message(this, res.retmsg, 'warning')
            this.loading2 = false
          }
        }).catch(res => {
          if (res.retcode === 1) {
            net.message(this, '登录成功', 'success')
            sessionStorage.setItem('signInfo', JSON.stringify(res.data))
            setTimeout(() => {
              this.loading2 = false
              this.$router.push({ name: 'index' })
            }, 1000)
          } else {
            net.message(this, res.retmsg, 'warning')
            this.loading2 = false
          }
        })
      }
    }
  }
}
</script>
<style>
  .d_input {
    margin-bottom: 18px;
    margin-top: 10px;
  }
  .ctrlCode {
    display: flex;
    justify-content: space-between;
  }
  .code {
    width: 56%;
    display: flex;
  }
  .z-login-btn {
    margin-top: 8px;
    width: 100%;
  }
  .z-login-wrap {
    width: 20%;
    margin: 0 auto;
    margin-top: 300px;
  }
</style>
