// import something here
/**
 * 图片转视频
 */
const startRecord = (canvas, fileList) => {
  try {
    const intance = new ImagesToVideo(canvas, { fileList })
    return intance.startRecord()
  } catch (error) {
    console.log('startRecord error', error)
  } finally {
    console.log('startRecord finally')
  }
  return null
}
/**
 * 下载视频
 */
const downloadVideo = ({ name, blob }) => {
  try {
    if ('download' in document.createElement('a')) {
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      document.body.appendChild(anchor)
      anchor.style = 'display: none'
      anchor.href = url
      anchor.download = name
      anchor.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(anchor)
    } else {
      navigator.msSaveBlob(blob, name)
    }
  } catch (error) {
    console.log('downloadVideo error', error)
  } finally {
    console.log('downloadVideo finally')
  }
}

/**
 * images-to-video class
 * creater：qc
 * reference：1、https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
 * 2、https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API
*/
class ImagesToVideo {
  // 画布实例(DOM对象)
  canvas = null // document.getElementById('myCanvas')
  // 画笔(渲染上下文)
  ctx = null
  // 录制媒体实例
  mediaRecord = null
  // 存储图像流容器
  chunks = new Set()
  // 轮询绘画时间器
  timer = null

  // 配置属性
  option = {
    intervals: 100, // 视频抓取间隔毫秒
    drawIntervals: 1000, // 轮询绘图间隔毫秒
    // 注意，此对象列表是已经封装处理过的了，不是[Object File]，而是对象{file: file, name: file.name, src: URL.createObjectURL(file)}
    fileList: [], // 选择的本地图片对象列表
    fileDownload: {
      fileType: 'mp4',
      fileName: 'video'
    }
  }

  /**
   * 构造函数
  */
  constructor(canvas, option = {
    intervals: 100,
    drawIntervals: 2000,
    fileList: [],
    fileDownload: {
      fileType: 'mp4',
      fileName: 'video'
    }
  }) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.option = { ...this.option, ...option }
    this.initMedia()
  }

  /**
   * 初始化录制媒体实例对象
  */
  initMedia() {
    console.log('initMedia')
    // 获取画布canvasElement并设置帧频率(FPS)
    const mediaStream = this.canvas.captureStream(48)
    // 核心API，可以录制canvas, audio, video代码下方提供文档链接
    this.mediaRecord = new MediaRecorder(mediaStream, {
      videoBitsPerSecond: 8500000
    })
    this.mediaRecord.ondataavailable = (e) => { // 接收数据
      // console.log('ondataavailable e', e)
      this.chunks.add(e.data)
    }
    console.log('initMedia success')
  }

  /**
   * 将图片绘制到画布
  */
  async drawImage(file) {
    try {
      let src
      if (Object.prototype.toString.call(file) === '[object File]') {
        src = URL.createObjectURL(file)
      } else {
        src = file.src
      }
      console.log('drawImage file', file)
      const dataUrl = src
      // 绘制图片流
      await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          // this.ctx.drawImage(img, 0, 0, img.width, img.height)
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
          // resolve(true)
        }
        img.src = dataUrl
      })
    } catch (error) {
      console.log('drawImage error', error)
    } finally {
      console.log('drawImage finally')
    }
  }

  /**
   * 开始录屏，参数为抓取间隔毫秒，默认100毫秒
  */
  async startRecord() {
    this.mediaRecord && this.mediaRecord.start(this.option.intervals || 100)
    // 轮询绘图
    let index = 0 // this.option.fileList.length - 1
    this.timer && clearInterval(this.timer)
    return await new Promise((resolve) => {
      this.timer = setInterval(() => {
        const file = this.option.fileList[index] || null
        if (file) {
          this.drawImage(file)
          index += 1
        } else {
          resolve(this.stopRecord())
        }
      }, this.option.drawIntervals || 1000)
    })
  }

  /**
   * 停止录屏，并返回视频对象
   * @returns Object {name, src}
  */
  stopRecord() {
    this.timer && clearInterval(this.timer)
    this.mediaRecord && this.mediaRecord.stop()
    // console.log('stopRecord this.chunks', this.chunks)
    // 生成视频blob
    const type = `${this.option.fileDownload.fileType || 'mp4'}`
    const name = `${this.option.fileDownload.fileName || 'video'}.${type}`
    const blob = new Blob(this.chunks, {
      type: `video/${type}`
    })
    const src = URL.createObjectURL(blob)
    return { name, blob, src }
  }
}

const imagesTovideo = {
  startRecord,
  downloadVideo
}

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({ app, router, store, Vue }) => {
  // something to do
  Vue.prototype.$imagesTovideo = imagesTovideo
}
