<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="https://img.icons8.com/nolan/48/warning-shield.png"
          width="30"
          class="logo"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link class="nav-link active" aria-current="page" to='/'>Home Page</router-link>
          <router-link v-if="!email" class="nav-link" to='/login'>Masuk</router-link>
          <router-link v-if="!email" class="nav-link" to='/register'>Daftar</router-link>
          <router-link v-if="email" class="nav-link" to='/bookmark'>My Favorite</router-link>
          <a v-if="email" @click="logout" class="nav-link"><router-link to='/'>Logout</router-link></a>
          <a class="nav-link" href="#">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKWrcVqHjH4AHFVvmH4HpsME2ma_kLskm-g&usqp=CAU"
              class="rounded-circle"
              width="30"
            />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: "NavBar",
  methods: {
    logout () {
      swal({
        icon: 'success',
        title: 'LogOut Success'
      })
      localStorage.clear()
      localStorage.removeItem('access_token')
      localStorage.removeItem('email')
      this.$store.commit('SET_EMAIL', '')
    }
  },
  computed: {
    email () {
      // console.log(this.$store.state.email, 'email')
      return this.$store.state.email
    }
  }
};
</script>


<style>
body {
  background-color: #eee;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  color: #fff;
  margin-right: 10px;
  text-transform: uppercase;
  font-weight: 200 !important;
  font-size: 14px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,102,203, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.navbar-nav .active {
  border-bottom: 4px solid #fff;
}

.logo {
  margin-bottom: 7px !important;
}

.navbar {
  padding-top: 0.5rem;
  padding-bottom: 0px !important;
}
</style>
