/* eslint-disable camelcase */
// This is just an example,
// so you can safely delete all default props below

import routes from './routes'

const index = {
  title: '视频转音频',
  failed: '转换音频失败',
  success: '转换音频成功',
  confirmTitle: '请确认',
  confirmOk: '确认',
  confirmCancel: '取消',

  setting: {
    settings: '设置',
    settingsDesc: '系统设置',
    dayMode: '日间模式',
    nightMode: '夜间模式',
    currentlyIn: '当前为',
    normalMode: '常规模式',
    fullScreenMode: '全屏模式',
    language: '语言',
    zhSimple: '中文 (简体)',
    enUs: '英文 (美式)'
  },

  action: {
    chooseFile: '选择视频文件',
    delVideo: '删除视频',
    delVideoConfirm: '您确认要删除视频吗？',
    videoToAudio: '视频转音频',
    downloadAudio: '下载音频'
  }
}

export default {
  ...index,
  ...routes
}
