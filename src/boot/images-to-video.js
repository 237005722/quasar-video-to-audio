// import something here
/**
 * 实例化图片转视频
 * 步骤：1、实例化 2、调用intance.startRecord() 3、调用intance.stopRecord() 4、下载
 */
const init = (canvas, fileList) => {
  try {
    const intance = new ImagesToVideo(canvas, { fileList })
    return intance
  } catch (error) {
    console.log('init error', error)
  } finally {
    console.log('init finally')
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
    drawIntervals: 2000, // 轮询绘图间隔毫秒
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
      this.chunks.add(e.data)
    }
    console.log('initMedia success')
  }

  /**
   * 将图片绘制到画布
  */
  async drawImage(file) {
    try {
      console.log('drawImage file', file)
      const fileData = new Blob([file])
      // 解析图片流
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsArrayBuffer(fileData)
      })
      // 绘制图片流
      await new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0, img.width, img.height)
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
  startRecord() {
    this.mediaRecord && this.mediaRecord.start(this.option.intervals || 100)
    // 轮询绘图
    let index = 0
    this.timer && clearInterval(this.timer)
    this.timer = setInterval(() => {
      const file = this.option.fileList[index] || null
      file ? (this.drawImage(file) && (index += 1)) : clearInterval(this.timer)
    }, this.option.drawIntervals || 2000)
  }

  /**
   * 停止录屏，并返回视频对象
   * @returns Object {name, blob}
  */
  stopRecord() {
    this.timer && clearInterval(this.timer)
    this.mediaRecord && this.mediaRecord.stop()
    // 生成视频blob
    const type = `${this.option.fileDownload.fileType || 'mp4'}`
    const name = `${this.option.fileDownload.fileName || 'video'}.${type}`
    const blob = new Blob(this.chunks, {
      type: `video/${type}`
    })
    return { name, blob }
  }
}

const imagesTovideo = {
  init,
  downloadVideo
}

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({ app, router, store, Vue }) => {
  // something to do
  Vue.prototype.$imagesTovideo = imagesTovideo
}
