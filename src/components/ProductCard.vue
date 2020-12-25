<template>
  <div>
    <q-card
      v-for="item of linkList"
      :key="item.name"
      class="my-card no-shadow q-mb-md"
    >
      <router-link
        :to="item.url"
        exact
        class="text-primary"
        active-class="text-negative"
      >
        <q-parallax
          :src="item.img"
          :height="150"
        />
        <q-card-section>
          <div class="text-h6">
            {{ item.title }}
          </div>
          <div class="text-subtitle2" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ item.desc }}
        </q-card-section>
      </router-link>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {

  },
  data() {
    return {
      lang: this.$i18n.locale,
      linkList: this.$t('routes')
    }
  },
  watch: {
    '$i18n.locale'(lang) {
      console.log('watch $i18n.locale', lang)
      this.linkList = this.$t('routes')
      console.log('watch this.linkList', this.linkList)
    }
  },
  created() {
    console.log('ProductCard created linkList', this.linkList)
  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang='sass'>

</style>
