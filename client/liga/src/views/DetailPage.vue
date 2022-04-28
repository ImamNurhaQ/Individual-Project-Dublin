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
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
              <img
                :src="qrcode"
                class="card-img-top"
              />
                <p class="card-text text-center">QR CODE</p>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'DetailPage',
  computed: {
    Liga () {
      return this.$store.state.Liga
    },
    qrcode () {
      return this.$store.state.qrcode
    }
  },
  created () {
    this.$store.dispatch('detailByPk', this.$route.params.id)
    this.$store.dispatch('getqrCode', this.$route.params.id)
  }
}
</script>

<style></style>
