<template>
    <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-10">
            <div class="row p-2 bg-white border rounded">
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" :src="Liga.logos"></div>
                <div class="col-md-6 mt-1">
                    <h5>{{Liga.name}}</h5>
                    <p class="text-justify text-truncate para mb-0">{{Liga.slug}}<br><br></p>
                    <p class="text-justify text-truncate para mb-0">{{Liga.abbr}}<br><br></p>
                    <!-- <p class="text-justify text-truncate para mb-0">{{Liga.Category.name}}<br><br></p> -->
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-column mt-4">
                      <router-link class="btn btn-primary btn-sm" :to="`/liga/${Liga.id}`">Details</router-link>
                      <button v-if="email" class="btn btn-outline-primary btn-sm mt-2" type="button" @click.prevent="addToBookmark(Liga.id)">Add to wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
name: 'LigaItem',
  props: ['Liga'],
  computed: {
    email () {
      return this.$store.state.email
    }
  },
  methods: {
    addToBookmark (id) {
      this.$store.dispatch('addBookmark', id)
    }
  }
}
</script>

<style>
html,
body {
    background: #eee
}

.ratings i {
    font-size: 16px;
    color: red
}

.strike-text {
    color: red;
    text-decoration: line-through
}

.product-image {
    width: 100%
}

.dot {
    height: 7px;
    width: 7px;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 3px;
    background-color: blue;
    border-radius: 50%;
    display: inline-block
}

.spec-1 {
    color: #938787;
    font-size: 15px
}

h5 {
    font-weight: 400
}

.para {
    font-size: 16px
}
</style>