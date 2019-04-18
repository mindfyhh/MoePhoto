const VERSION = '4.6'
import('bootstrap/dist/css/bootstrap.min.css')
import('../css/style.css')
import('../css/font-awesome.css')
import('../css/loader.css')
import('../css/component.css')
import('../css/Yanone Kaffeesatz-200,300,400,700.css')
import('../css/Roboto-400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic.css')
import $ from 'jquery'
window.$ = $
import 'bootstrap'
import { jarallax } from 'jarallax'
import './jquery.totemticker.js'
import './move-top.min.js'
import './easing.js'
import './numscroller-1.0.js'
import './custom-file-input.js'
import { getSession, newMessager } from './message.js'
const compareVersion = (a, b) => {
  a = a.split('.')
  b = b.split('.')
  var i = 0
  while (i < a.length && i < b.length) {
    let n0 = +a[i], n1 = +b[i]
    let res = n0 < n1 ? -1 : n0 > n1 ? 1 : 0
    if (res) return res
  }
  let res = a.length < b.length ? -1 : a.length > b.length ? 1 : 0
  return res
}
jarallax($('.jarallax'), {
  speed: 0.5,
  imgWidth: 1366,
  imgHeight: 768
})
$(_ => {
  $('#vertical-ticker').totemticker({
    row_height: '100px',
    next: '#ticker-next',
    previous: '#ticker-previous',
    stop: '#stop',
    start: '#start',
    mousestop: true
  })
})
$(document).ready($ => {
  $(".scroll ").click(function (event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000)
  })
  $().UItoTop({
    easingType: 'easeOutQuart'
  })
})
const getResource = path => [path, '?', (new Date()).getTime()].join('')
const processingMsg = '处理中'
const genOnProgress = (unit, msg = processingMsg) => (gone, total) => `${msg}，共${total}${unit}，已处理${gone}${unit}`
const texts = {
  step: '步骤',
  add: '点击添加...',
  fetching: '正在获取',
  delete: '删除',
  labelSplitter: '：',
  pixel: '像素',
  fps: '帧每秒',
  second: '秒',
  noFileMsg: '缺少输入文件',
  errorMsg: '出错啦',
  empty: '暂时没有',
  idle: '空闲中',
  finish: '完成啦',
  running: '正在处理您的任务',
  processing: processingMsg,
  stopping: '等待保存已处理部分',
  logWritten: '日志已写入浏览器控制台，请按<kbd>F12</kbd>查看',
  noMoreLog: '没有新的日志',
  needRefresh: '请在空闲后刷新',
  onBusy: gone => '忙碌中' + (gone == null ? '' : `，已经过${gone}秒`),
  timeFormatter: time => `，预计还需要${time.toFixed(2)}秒`,
  batchSucc: result => [
    result[0] === 'Success' ? texts.finish : '中途被打断了',
    `，处理了${result[1]}张图片`,
    result[2] ? `，然而有${result[2]}张失败了` : '',
    `，请<a href="/gallery?dir=${result[3]}">查看这里</a>`
  ].join(''),
  videoSucc: result => `完成啦，处理到第${result[1]}帧`,
  batchRunning: genOnProgress('张'),
  videoRunning: genOnProgress('帧'),
  lockRunning: genOnProgress('秒', '锁定中')
}
const appendText = key => text => text + texts[key]
const [setLanguage, registryLanguageListener] = (_ => {
  const listeners = []
  return [language => {
    for (let key of language)
      key in texts && (texts[key] = language[key])
    listeners.forEach(language)
  },
  listener => {
    listener in listeners || listeners.push(listener)
  }]
})()
export {
  getResource, getSession, newMessager, appendText, texts
  , setLanguage, registryLanguageListener, VERSION, compareVersion
}