<template>
<center>
  <div id="login-page" class="wrapper">
    <div class="logo"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKWrcVqHjH4AHFVvmH4HpsME2ma_kLskm-g&usqp=CAU" alt=""> </div>
    <div class="text-center mt-4 name">
        <p>Sign in to access your account</p>
    </div>
    <form @submit.prevent="handleLogin" class="p-3 mt-3">
        <div class="form-field d-flex align-items-center"> <span class="far fa-user"></span> <input v-model="dataUser.email" type="text" name="email" id="email" placeholder="Email"> </div>
        <div class="form-field d-flex align-items-center"> <span class="fas fa-key"></span> <input v-model="dataUser.password" type="password" name="password" id="pwd" placeholder="Password"> </div> <button class="btn mt-3">Login</button>
    </form>
      <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin><br>
    </div>
  </center>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import swal from 'sweetalert'
export default {
  name: 'LoginPage',
  data () {
    return {
      dataUser: {
        email: '',
        password: ''
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      params: {
        client_id: '576712256533-p3s44k8ke810g21u2683dhqjqalvq6pf.apps.googleusercontent.com'
      }
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('login', this.dataUser)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', this.dataUser.email)
          this.$store.commit('SET_EMAIL', this.dataUser.email)
          this.$router.push('/')
        })
        .catch((responseJSON) => {
          const { message } = responseJSON.response.data
          swal({
            icon: 'error',
            title: '👾OPPS..',
            text: message,
            button: 'OK'
          })
        })
    },
    onSuccess (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      console.log(idToken, 'token')
      this.$store.dispatch('onSignIn', idToken)
      this.$router.push('/')
    },
    onFailure (error) {
      console.log(error)
    }
  }
}
</script>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

 * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     font-family: 'Poppins', sans-serif
 }

 body {
     background: #ecf0f3
 }

 .wrapper {
     max-width: 350px;
     min-height: 500px;
     margin: 80px auto;
     padding: 40px 30px 30px 30px;
     background-color: #ecf0f3;
     border-radius: 15px;
     box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff
 }

 .logo {
     width: 80px;
     margin: auto
 }

 .logo img {
     width: 100%;
     height: 80px;
     object-fit: cover;
     border-radius: 50%;
     box-shadow: 0px 0px 3px #5f5f5f, 0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaa7, -8px -8px 15px #fff
 }

 .wrapper .name {
     font-weight: 600;
     font-size: 1.4rem;
     letter-spacing: 1.3px;
     padding-left: 10px;
     color: #555
 }

 .wrapper .form-field input {
     width: 100%;
     display: block;
     border: none;
     outline: none;
     background: none;
     font-size: 1.2rem;
     color: #666;
     padding: 10px 15px 10px 10px
 }

 .wrapper .form-field {
     padding-left: 10px;
     margin-bottom: 20px;
     border-radius: 20px;
     box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff
 }

 .wrapper .form-field .fas {
     color: #555
 }

 .wrapper .btn {
     box-shadow: none;
     width: 100%;
     height: 40px;
     background-color: #03A9F4;
     color: #fff;
     border-radius: 25px;
     box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
     letter-spacing: 1.3px
 }

 .wrapper .btn:hover {
     background-color: #039BE5
 }

 .wrapper a {
     text-decoration: none;
     font-size: 0.8rem;
     color: #03A9F4
 }

 .wrapper a:hover {
     color: #039BE5
 }

 @media(max-width: 380px) {
     .wrapper {
         margin: 30px 20px;
         padding: 40px 15px 15px 15px
     }
 }
</style>
