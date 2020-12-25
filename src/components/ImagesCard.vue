<template>
  <div>
    <q-card class="my-card no-shadow q-mb-md q-pt-md q-pl-md q-pr-md">
      <div class="q-gutter-md row items-start">
        <q-img
          v-for="item in fileList"
          :key="item.name"
          :src="item.src"
          :ratio="1"
          style="width: 33%"
          basic
          spinner-color="white"
          class="rounded-borders"
        >
          <div class="absolute-bottom text-center text-body2">
            {{ item.name }}
          </div>
        </q-img>
      </div>
    </q-card>

    <q-card class="my-card no-shadow q-mb-md q-pl-md q-pr-md">
      <canvas id="myCanvas" class="myCanvas" :width="canvas.width" :height="canvas.height" />
      <q-card-section>
        <q-btn
          :disable="loading"
          :loading="loading"
          push
          round
          ripple
          color="negative"
          icon="delete"
          class="absolute"
          style="top: 0; right: 80px; transform: translateY(-50%);"
          @click="startRecord()"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-negative">
            {{ $t('actionVideo.startImagesToVideo') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          :disable="loading"
          :loading="loading"
          push
          round
          ripple
          color="primary"
          icon="audiotrack"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
          @click="stopRecord()"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-primary">
            {{ $t('actionVideo.stopImagesToVideo') }}
          </q-tooltip>
        </q-btn>
      </q-card-section>
      <template v-if="video.blob">
        <q-video :src="video.blob" class="q-pt-md" />
        <q-card-section>
          <q-btn
            :disable="loading"
            :loading="loading"
            push
            round
            ripple
            color="primary"
            icon="file_download"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            @click="downloadVideo()"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
            <q-tooltip content-class="bg-primary">
              {{ $t('actionImages.downloadVideo') }}
            </q-tooltip>
          </q-btn>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ video.name }}
            </div>
          </div>
          <div class="text-subtitle2">
            {{ video.duration || '00:00:00' }}
          </div>
        </q-card-section>
      </template>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ImagesCard',
  props: {
    files: {
      type: [FileList, Object],
      default: () => {}
    },
    showSticky: {
      type: [Boolean],
      default: () => false
    }
  },
  data() {
    return {
      loading: false,
      fileList: [],
      canvas: {
        width: 640,
        height: 360
      },
      video: {
        name: '',
        blob: '',
        duration: ''
      },
      intance: null
    }
  },
  watch: {
    files(val, old) {
      console.log('ImagesCard watch files', val)
      if (val && val !== old) {
        this.initFileList(val)
      }
    },
    fileList(val, old) {
      console.log('ImagesCard watch fileList', val)
      if (val && val.length > 1) {
        this.$emit('update:showSticky', true)
      } else {
        this.$emit('update:showSticky', false)
      }
    }
  },
  created() {
    console.log('created')
    this.$indexDB.initDB(this.$myDB, () => {
      this.$indexDB.getDataByKey('imagesFileList', (store, res) => {
        if (res && res.data) {
          for (const file of res.data) {
            this.initFileItem(file)
          }
        }
      })
    })
  },
  destroyed() {
    console.log('destroyed')
    this.$indexDB.closeDB()
  },
  methods: {
    async initFileList(files = this.files) {
      this.loading = true
      await Object.keys(files).map(key => {
        const file = files[key]
        this.initFileItem(file)
      })
      console.log('initFileList cacheFileList')
      this.cacheFileList()
      this.loading = false
    },
    initFileItem(file) {
      this.fileList.push({
        file: file,
        name: file.name,
        src: URL.createObjectURL(file)
      })
    },
    startRecord() {
      this.loading = true
      const fileList = []
      this.fileList.map(file => {
        fileList.push(file)
      })
      if (fileList.length === 0) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${this.$t('actionImages.noFileError')}`
        })
        return
      }
      this.intance = this.$imagesTovideo.init(document.getElementById('myCanvas'), fileList)
      if (!this.intance) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${this.$t('actionImages.intanceError')}`
        })
        return
      }
      this.intance.startRecord()
      this.loading = false
    },
    stopRecord() {
      this.intance && (this.video = this.intance.stopRecord())
    },
    downloadVideo() {
      this.loading = true
      if (this.video && this.video.blob) {
        this.$imagesTovideo.downloadVideo(this.video)
      }
      this.loading = false
    },
    cacheFileList() {
      const modData = []
      this.fileList.map(item => {
        modData.push(item.file)
      })
      console.log('cacheFileList modData', modData)
      this.$indexDB.putData({
        id: 'imagesFileList',
        data: modData
      })
    }
  }
}
</script>
<style scoped lang="sass">
.myCanvas
  background-color: #f0f0f0
  border-radius: 4px
</style>
