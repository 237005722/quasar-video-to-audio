<template>
  <div>
    <q-card v-if="fileList.length === 0" class="my-card no-shadow q-mb-md q-pt-md q-pl-md q-pr-md">
      <q-skeleton height="180px" square />
      <q-card-section>
        <q-skeleton
          type="circle"
          size="60px"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />
        <q-skeleton type="rect" class="q-pt-md" />
      </q-card-section>
    </q-card>

    <q-card v-for="(item, index) in fileList" :key="item.name" class="my-card no-shadow q-mb-md q-pl-md q-pr-md">
      <q-video :src="item.src" class="q-pt-md" />
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
          @click="delVideo(item, index)"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-negative">
            {{ $t('action.delVideo') }}
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
          @click="videoToAudio(item)"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
          <q-tooltip content-class="bg-primary">
            {{ $t('action.videoToAudio') }}
          </q-tooltip>
        </q-btn>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ item.name }}
          </div>
        </div>
        <div class="text-subtitle2">
          {{ item.duration || '00:00:00' }}
        </div>
      </q-card-section>
      <template v-if="item.audioSrc">
        <q-video :src="item.audioSrc" />
        <q-card-section>
          <q-btn
            :disable="loading"
            :loading="loading"
            push
            round
            ripple
            color="secondary"
            icon="file_download"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            @click="downloadAudio(item)"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
            <q-tooltip content-class="bg-secondary">
              {{ $t('action.downloadAudio') }}
            </q-tooltip>
          </q-btn>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ item.audioName }}
            </div>
          </div>
          <div class="text-subtitle2">
            {{ item.duration || '00:00:00' }}
          </div>
        </q-card-section>
      </template>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'VideoCard',
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
      fileList: []
    }
  },
  watch: {
    files(val, old) {
      console.log('VideoCard watch files', val)
      if (val && val !== old) {
        this.initFileList(val)
      }
    },
    fileList(val, old) {
      console.log('VideoCard watch fileList', val)
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
      this.$indexDB.getDataByKey('fileList', (store, res) => {
        if (res && res.data) {
          for (const file of res.data) {
            this.initFileItem(file)
          }
          this.initFileData()
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
      this.initFileData()
      console.log('initFileList cacheFileList')
      this.cacheFileList()
      this.loading = false
    },
    initFileItem(file) {
      this.fileList.push({
        file: file,
        name: file.name,
        src: URL.createObjectURL(file),
        data: null,
        duration: '',
        audioName: file.name + '.wav',
        audioBlob: null,
        audioSrc: null
      })
    },
    initFileData() {
      this.fileList.map(item => {
        if (!item.data) {
          this.$videoTool.decodedData(item.file).then(data => {
            item.data = data
            item.duration = this.$videoTool.durationTrans(data.duration || 0)
          })
        }
      })
    },
    delVideo(item, index) {
      this.$q.dialog({
        title: `${this.$t('confirmTitle')}`,
        message: `${this.$t('action.delVideoConfirm')}`,
        ok: `${this.$t('confirmOk')}`,
        cancel: `${this.$t('confirmCancel')}`,
        persistent: true
      }).onOk(() => {
        this.loading = true
        this.fileList.splice(index, 1)
        console.log('delVideo cacheFileList')
        this.cacheFileList()
        this.loading = false
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    videoToAudio(item) {
      this.loading = true
      if (item.data) {
        this.$videoTool.dataToAudio(item.data, item.name).then(audio => {
          console.log('audio', audio)
          this.updateFileData(audio, item)
        })
      } else {
        this.$videoTool.videoToAudio(item.file).then(audio => {
          console.log('audio', audio)
          this.updateFileData(audio, item)
        })
      }
      this.loading = false
    },
    updateFileData(audio, item) {
      if (audio) {
        item.audioBlob = audio.blob
        item.audioSrc = URL.createObjectURL(audio.blob)
        item.duration = audio.duration

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: `${this.$t('success')}`
        })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${this.$t('failed')}`
        })
      }
    },
    downloadAudio(item) {
      this.loading = true
      this.$videoTool.downloadWav(item.audioBlob, item.name)
      this.loading = false
    },
    cacheFileList() {
      const modData = []
      this.fileList.map(item => {
        modData.push(item.file)
      })
      console.log('cacheFileList modData', modData)
      this.$indexDB.putData({
        id: 'fileList',
        data: modData
      })
    }
  }
}
</script>
<style scoped lang="sass">
  .my-card
    width: 100%
    border-radius: 0.5rem

</style>
