<template>
  <div class="container">
        <br><br>
        <div>
          <form  @submit.prevent="search">
            <h4>select product category here</h4>
          <select class="form-control col-md-6" v-model="query.category">
            <option value="English Premier League">English Premier League</option>
            <option value="Spanish Primera División">Spanish Primera División</option>
            <option value="Italian Serie A">Italian Serie A</option>
            <option value="German Bundesliga">German Bundesliga</option>
            <option value="Japanese J League">Japanese J League</option>
            <option value="Dutch Eredivisie">Dutch Eredivisie</option>
            <option value="French Ligue 1">French Ligue 1</option>
          </select><br>
          <input class="form-control col-md-6" type="search" placeholder="Search by Name" aria-label="Search" v-model="query.name">
          <button class="btn btn-outline-secondary col-sm-1" type="submit">Search</button>
        </form>
        </div>
        <h1 class="text-center mb-3">league</h1>
        <div class="row justify-content-start">
          <LigaItem v-for="Liga in Ligas"
          :key="Liga.id"
          :Liga="Liga"></LigaItem>
        </div>
        <br>
          <div class="d-flex flex-column mt-4" v-if="this.query.clear === true">
            <a class="btn btn-primary btn-sm" @click.prevent="clearSearch">Back</a>
          </div>
        <br><br><br>
        <nav aria-label="Page navigation example" v-if="Ligas.length !== 0">
        <ul class="pagination justify-content-center" v-if="totalPage > 1">
          <div v-for="page in totalPage" :key="page">
            <li class="page-item"><a class="page-link" @click.prevent="nextPage(page)">{{ page }}</a></li>
          </div>
        </ul>
        </nav>
    </div>
</template>

<script>
import LigaItem from './LigaItem.vue'
export default {
  name: 'LigaList',
  components: {
    LigaItem
  },
  data () {
    return {
      query: {
        page: 1,
        name: '',
        category: '',
        clear: false
      }
    }
  },
  computed: {
    Ligas () {
      return this.$store.state.Ligas
    },
    totalPage () {
      return this.$store.state.totalPage
    }
  },
  methods: {
    search () {
      this.query.page = 1
      this.query.clear = true
      this.$store.dispatch('LigaPage', this.query)
    },
    clearSearch () {
      this.page = 1
      this.query.name = ''
      this.query.category = ''
      this.query.clear = false
      this.$store.dispatch('LigaPage', this.query)
    },
    nextPage (pageNow) {
      this.query.page = pageNow
      this.$store.dispatch('LigaPage', this.query)
    }
  },
  created () {
    this.$store.commit('SET_EMAIL', localStorage.getItem('email'))
    this.$store.dispatch('getLiga')
    this.$store.dispatch('LigaPage', this.query)
  }
}
</script>

<style>

</style>
