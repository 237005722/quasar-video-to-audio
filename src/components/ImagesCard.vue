<template>
  <div>
    <q-card v-if="fileList.length === 0" class="my-card no-shadow q-mb-md q-pt-md q-pl-md q-pr-md q-pb-md">
      <div class="row q-col-gutter-md">
        <div
          v-for="n in 5"
          :key="`md-${n}`"
          class="col-4"
        >
          <q-skeleton
            type="QBtn"
            width="100%"
            height="100px"
          />
        </div>
      </div>
    </q-card>
    <q-card v-if="fileList.length > 0 && step === 0" class="my-card no-shadow q-mb-md q-pt-md q-pl-md q-pr-md">
      <div class="row q-col-gutter-md">
        <div
          v-for="(item, index) in fileList"
          :key="`${item.name}_${index}`"
          class="col-4"
        >
          <q-img
            :src="item.src"
            :ratio="1"
            style="width: 100%"
            basic
            spinner-color="white"
            class="rounded-borders"
          >
            <div class="absolute-bottom text-center text-body2">
              {{ item.name }}
            </div>
          </q-img>
        </div>
      </div>
      <q-card-section>
        <q-btn
          :disable="loading"
          :loading="loading"
          round
          ripple
          color="primary"
          icon="arrow_forward"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
          @click="nextAction()"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-primary">
            {{ $t('actionImages.imagesToVideo') }}
          </q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>

    <q-card v-else-if="fileList.length > 0 && step === 1" id="canvasParent" class="my-card no-shadow q-mb-md q-pl-md q-pr-md">
      <canvas id="myCanvas" class="q-mt-md myCanvas" :width="canvas.width" :height="canvas.height" />
      <q-card-section>
        <q-btn
          :disable="loading"
          :loading="loading"
          round
          ripple
          color="info"
          icon="arrow_back"
          class="absolute"
          style="top: 0; right: 80px; transform: translateY(-50%);"
          @click="prevAction()"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-info">
            {{ $t('actionImages.chooseFile') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          :disable="loading"
          :loading="loading"
          round
          ripple
          color="primary"
          icon="videocam"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
          @click="startRecord()"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-primary">
            {{ $t('actionImages.startImagesToVideo') }}
          </q-tooltip>
        </q-btn>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ $t('actionImages.fileTotal') }} {{ fileList.length }}
          </div>
        </div>
      </q-card-section>
      <template v-if="video.src">
        <q-video :src="video.src" class="q-pt-md" />
        <q-card-section>
          <q-btn
            :disable="loading"
            :loading="loading"
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
    showChoose: {
      type: [Boolean],
      default: () => false
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
        width: 336,
        height: 168
      },
      video: {
        name: '',
        blob: '',
        src: ''
      },
      intance: null,
      step: 0
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
      if (val && val.length > 9) {
        this.$emit('update:showSticky', true)
      } else {
        this.$emit('update:showSticky', false)
      }
    },
    step(val, old) {
      this.$emit('update:showChoose', val === 0)
      if (val === 1) {
        this.$nextTick(() => {
          this.initCanvas()
        })
      }
    }
  },
  mounted() {
    console.log('mounted')
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
    initCanvas() {
      const parent = document.getElementById('canvasParent')
      this.canvas.width = parent.clientWidth - 32
      // this.canvas.height = this.canvas.width * 2 // parent.clientHeight - 16
      this.canvas.height = this.canvas.width / 2 // parent.clientHeight - 16
    },
    async initFileList(files = this.files) {
      try {
        this.loading = true
        await Object.keys(files).map(key => {
          const file = files[key]
          this.initFileItem(file)
        })
        console.log('initFileList cacheFileList')
        this.cacheFileList()
      } catch (error) {
        console.log('initFileList error', error)
      } finally {
        this.loading = false
      }
    },
    initFileItem(file) {
      this.fileList.push({
        file: file,
        name: file.name,
        src: URL.createObjectURL(file)
      })
    },
    nextAction() {
      this.step = 1
    },
    prevAction() {
      this.step = 0
    },
    async startRecord() {
      try {
        this.loading = true
        if (this.fileList.length === 0) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `${this.$t('actionImages.noFileError')}`
          })
          return
        }
        this.video = await this.$imagesTovideo.startRecord(document.getElementById('myCanvas'), this.fileList)
        console.log('startRecord this.video', this.video)
        if (this.video) {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: `${this.$t('actionImages.success')}`
          })
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `${this.$t('actionImages.failed')}`
          })
        }
      } catch (error) {
        console.log('startRecord error', error)
      } finally {
        this.loading = false
      }
    },
    downloadVideo() {
      this.loading = true
      if (this.video) {
        this.$imagesTovideo.downloadVideo({ name: this.video.name, blob: this.video.blob })
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
  background-color: #f5f5f5
</style>
