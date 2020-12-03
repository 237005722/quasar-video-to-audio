<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-2'">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->

    <div class="row flex flex-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <videoCard :files="files" :show-sticky.sync="showSticky" />
        <q-btn
          v-if="!showSticky"
          :label="$t('action.chooseFile')"
          rounded
          push
          ripple
          color="primary"
          class="full-width q-mt-md"
        >
          <fileInput v-model="files" />
        </q-btn>
      </div>
    </div>

    <q-page-sticky v-if="showSticky" position="bottom" :offset="fileOffset">
      <q-btn push round ripple size="lg" icon="add" color="primary">
        <fileInput v-model="files" />
      </q-btn>
    </q-page-sticky>

    <q-page-scroller position="bottom-right" :scroll-offset="scrollOffset" :offset="offset">
      <q-btn push round ripple icon="keyboard_arrow_up" color="orange" />
    </q-page-scroller>
  </q-page>
</template>

<script>
import videoCard from 'components/VideoCard'
import fileInput from 'components/FileInput'
export default {
  name: 'PageIndex',
  components: {
    videoCard,
    fileInput
  },
  data() {
    return {
      showSticky: false,
      fileOffset: [0, 18],
      offset: [18, 18],
      scrollOffset: 150,
      videoSrc: 'https://237005722.github.io/video-to-audio/peerless-master.mp4',
      files: null // obj
    }
  },
  watch: {
    files(val, old) {
      console.log('PageIndex watch files', val)
    },
    showSticky(val, old) {
      console.log('PageIndex watch showSticky', val)
    }
  },
  created() {

  },
  beforeDestroy() {

  }
}
</script>
