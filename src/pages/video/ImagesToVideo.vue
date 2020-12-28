<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-2'">
    <div class="row flex flex-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <imagesCard :files="files" :show-sticky.sync="showSticky" :show-choose.sync="showChoose" />
        <q-btn
          v-if="showChoose && !showSticky"
          :label="$t('actionImages.chooseFile')"
          rounded
          ripple
          color="primary"
          class="full-width q-mt-md"
        >
          <fileInput v-model="files" :accept="accept" />
        </q-btn>
      </div>
    </div>

    <q-page-scroller position="bottom-right" :scroll-offset="scrollOffset" :offset="offset">
      <q-btn round ripple icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    <q-page-sticky v-if="showChoose && showSticky" position="bottom" :offset="fileOffset">
      <q-btn round ripple size="lg" icon="add" color="primary">
        <fileInput v-model="files" :accept="accept" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import imagesCard from 'components/ImagesCard'
import fileInput from 'components/FileInput'
export default {
  name: 'ImagesToVideo',
  components: {
    imagesCard,
    fileInput
  },
  data() {
    return {
      offset: [18, 18],
      scrollOffset: 150,
      showChoose: true,
      showSticky: false,
      fileOffset: [0, 18],
      accept: 'image/*',
      files: null // obj
    }
  },
  watch: {
    files(val, old) {
      console.log('ImagesToVideo watch files', val)
    },
    showSticky(val, old) {
      console.log('ImagesToVideo watch showSticky', val)
    }
  },
  created() {

  },
  beforeDestroy() {

  }
}
</script>
