<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-2'">
    <div class="row flex flex-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <videoCard :files="files" :show-sticky.sync="showSticky" />
        <q-btn
          v-if="!showSticky"
          :label="$t('actionVideo.chooseFile')"
          rounded
          ripple
          color="primary"
          class="full-width q-mt-md"
        >
          <fileInput v-model="files" />
        </q-btn>
      </div>
    </div>

    <q-page-scroller position="bottom-right" :scroll-offset="scrollOffset" :offset="offset">
      <q-btn round ripple icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    <q-page-sticky v-if="showSticky" position="bottom" :offset="fileOffset">
      <q-btn round ripple size="lg" icon="add" color="primary">
        <fileInput v-model="files" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import videoCard from 'components/VideoCard'
import fileInput from 'components/FileInput'
export default {
  name: 'VideoToAudio',
  components: {
    videoCard,
    fileInput
  },
  data() {
    return {
      offset: [18, 18],
      scrollOffset: 150,
      showSticky: false,
      fileOffset: [0, 18],
      files: null // obj
    }
  },
  watch: {
    files(val, old) {
      console.log('VideoToAudio watch files', val)
    },
    showSticky(val, old) {
      console.log('VideoToAudio watch showSticky', val)
    }
  },
  created() {

  },
  beforeDestroy() {

  }
}
</script>
