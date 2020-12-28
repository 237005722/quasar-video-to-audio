<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-2'">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    <div class="row flex flex-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <productCard />
      </div>
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="scrollOffset" :offset="offset">
      <q-btn round ripple icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import productCard from 'components/ProductCard'
export default {
  name: 'PageIndex',
  components: {
    productCard
  },
  data() {
    return {
      offset: [18, 18],
      scrollOffset: 150
    }
  },
  watch: {

  },
  created() {

  },
  beforeDestroy() {

  }
}
</script>
