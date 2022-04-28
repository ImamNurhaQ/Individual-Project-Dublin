import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)
const LinkUrl = 'http://localhost:3000/'

export default new Vuex.Store({
  state: {
    email: '',
    Ligas: [],
    Liga: [],
    qrcode: [],
    bookmark: [],
    totalPage: 0
  },
  getters: {
  },
  mutations: {
    SET_EMAIL (state, payload) {
      state.email = payload
    },
    SET_QRCODE (state, payload) {
      state.qrcode = payload
    },
    setBookmark (state, payload) {
      state.bookmark = payload
    },
    setLigas (state, payload) {
      state.Ligas = payload
    },
    setLiga (state, payload) {
      state.Liga = payload
    },
    setTotalPage (state, payload) {
      state.totalPage = payload
    }
  },
  actions: {
    getBookmark (context) {
      axios({
        url: `${LinkUrl}bookmark`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setBookmark', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addBookmark (context, id) {
      axios({
        url: `${LinkUrl}liga/${id}/addbookmark`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
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
    getqrCode (context, id) {
      axios({
        url: `https://api.happi.dev/v1/qrcode?data=http://localhost:8080/liga/${id}&width=&dots=000000&bg=FFFFFF&apikey=ddbf4bZrnLOMh3TboEIceE7urXDLqrwqRBGGl0zIdYNaD31ckNpTIybR`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('SET_QRCODE', data.qrcode)
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
    detailByPk (context, id) {
      axios({
        url: `${LinkUrl}liga/${id}`,
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data, 'detail');
          context.commit('setLiga', data.Liga)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    LigaPage (context, payload) {
      axios({
        url: `${LinkUrl}liga?page=${payload.page}&category=${payload.category}&name=${payload.name}`,
        method: 'GET'
      })
        .then(({ data }) => {
          // console.log(data)
          context.commit('setLigas', data.Ligas)
          context.commit('setTotalPage', data.totalPage)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getLiga (context) {
      axios({
        url: `${LinkUrl}Liga`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('setLigas', data.Ligas)
          context.commit('setTotalPage', data.totalPage)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onSignIn (context, idToken) {
      axios({
        url: `${LinkUrl}google-Sign-In`,
        method: 'POST',
        data: {
          id_token: idToken
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          context.commit('SET_EMAIL', data.email)
          swal({
            icon: 'success',
            title: 'Welcome to PerabotkuId'
          })
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    login (context, payload) {
      return axios({
        url: `${LinkUrl}login`,
        method: 'POST',
        data: payload
      })
    },
    register (context, dataUser) {
      return axios({
        url: `${LinkUrl}register`,
        method: 'POST',
        data: {
          userName: dataUser.userName,
          email: dataUser.email,
          password: dataUser.password,
          phoneNumber: dataUser.phoneNumber,
          address: dataUser.address
        }
      })
    }
  },
  modules: {
  }
})
