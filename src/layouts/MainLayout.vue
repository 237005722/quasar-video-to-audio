<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated reveal :reveal-offset="300" class="bg-transparent text-primary">
      <q-toolbar>
        <router-link
          exact
          to="/"
          active-class="text-primary"
        >
          <q-toolbar-title>{{ $t('title') }}</q-toolbar-title>
        </router-link>
        <q-space />
        <q-btn push color="white" text-color="primary" round ripple icon="settings" class="q-ml-md" @click="right = !right">
          <q-tooltip content-class="bg-primary">
            {{ $t('settingsDesc') }}
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="right"
      elevated
      side="right"
    >
      <!-- drawer content -->
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        class="fit"
      >
        <q-list>
          <q-item-label header>
            {{ $t('setting.settings') }}
          </q-item-label>
          <q-item v-close-popup clickable tabindex="1" @click="toggleDarkMode">
            <q-item-section avatar>
              <q-avatar icon="lightbulb_outline" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $q.dark.isActive ? $t('setting.dayMode') : $t('setting.nightMode') }}</q-item-label>
              <q-item-label caption>
                {{ $t('setting.currentlyIn') }} {{ $q.dark.isActive ? $t('setting.nightMode') : $t('setting.dayMode') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset spaced />
          <q-item v-close-popup clickable tabindex="2" @click="$q.fullscreen.toggle()">
            <q-item-section avatar>
              <q-avatar :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $q.fullscreen.isActive ? $t('setting.normalMode') : $t('setting.fullScreenMode') }}</q-item-label>
              <q-item-label caption>
                {{ $t('setting.currentlyIn') }} {{ $q.fullscreen.isActive ? $t('setting.fullScreenMode') : $t('setting.normalMode') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator inset spaced />
          <q-item-label header>
            {{ $t('setting.language') }}
          </q-item-label>
          <q-item v-close-popup tag="label" tabindex="3">
            <q-item-section avatar>
              <q-radio v-model="lang" val="en-us" color="accent" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('setting.enUs') }}</q-item-label>
              <q-item-label caption>
                {{ $t('setting.currentlyIn') }} {{ $t('setting.enUs') }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-close-popup tag="label" tabindex="4">
            <q-item-section avatar>
              <q-radio v-model="lang" val="zh-hans" color="negative" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t('setting.zhSimple') }}</q-item-label>
              <q-item-label caption>
                {{ $t('setting.currentlyIn') }} {{ $t('setting.zhSimple') }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import * as INFO from '../../package.json'
export default {
  name: 'MainLayout',

  data() {
    return {
      title: INFO.productName,
      searchText: '',
      lang: this.$i18n.locale,
      right: false
    }
  },
  computed: {
    thumbStyle() {
      return {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#369cf5',
        width: '5px',
        opacity: 0.75,
        page: 'homepage'
      }
    },

    barStyle() {
      return {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#369cf598',
        width: '9px',
        opacity: 0.2
      }
    }
  },
  watch: {
    '$q.dark.isActive'(val) {
      console.log(val ? 'On dark mode' : 'On light mode')
      this.right = !this.right
    },
    '$q.fullscreen.isActive'(val) {
      console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
      this.right = !this.right
    },
    lang(lang) {
      // console.log('lang', lang)
      this.$q.localStorage.set('lang', lang)
      // dynamic import, so loading on demand only
      import('quasar/lang/' + lang).then(lang => {
        this.$i18n.locale = lang.default.isoName
      })
    }
  },
  created() {
    this.lang = this.$i18n.locale
    console.log('lang', this.lang)

    this.query = this.$route.query
    console.log('mainlayout query', this.query)
  },
  mounted() {
  },
  methods: {
    toggleDarkMode() {
      // get status
      // console.log(this.$q.dark.isActive) // true, false
      // get configured status
      // console.log(this.$q.dark.mode) // "auto", true, false
      // set status
      // this.$q.dark.set(true) // or false or "auto"
      // toggle
      this.$q.dark.toggle()
    }
  }
}
</script>
<style scoped lang="sass">

</style>
