<template>
<div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-10">
          <h1>Favorite</h1>
            <div class="row p-2 bg-white border rounded" v-for="bookmark in bookmarks"
            :key="bookmark.id" >
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" :src="bookmark.Liga.logos"></div>
                <div class="col-md-6 mt-1">
                    <h5>{{bookmark.Liga.name}}</h5>
                    <p class="text-justify text-truncate para mb-0">{{bookmark.Liga.slug}}<br><br></p>
                    <p class="card-text">{{bookmark.User.email}}</p>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <h3 v-if="bookmarks < 1" class="text-center"><br><br><br><i class="fa fa-file" aria-hidden="true"></i> Bookmarks not added yet</h3>
                </div>
                <div class="d-flex flex-column mt-4">
                  <router-link class="btn btn-primary btn-sm" :to="`/liga/${bookmark.Liga.id}`">Details</router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'BookmarkPage',
  computed: {
    bookmarks () {
      console.log(this.$store.state.bookmark)
      return this.$store.state.bookmark
    }
  },
  created () {
    this.$store.dispatch('getBookmark')
  }
}
</script>

<style>
</style>
