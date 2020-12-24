<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-2'">
    <div class="row flex flex-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <img
          alt="Quasar logo"
          src="~assets/quasar-logo-full.svg"
        >
      </div>
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="scrollOffset" :offset="offset">
      <q-btn push round ripple icon="keyboard_arrow_up" color="orange" />
    </q-page-scroller>
  </q-page>
</template>

<script>
export default {
  name: 'ImagesToVideo',
  components: {

  },
  data() {
    return {
      offset: [18, 18],
      scrollOffset: 150
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  destroyed() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang='sass'>

</style>
