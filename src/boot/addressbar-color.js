// import something here
// 较新的移动浏览器可以为地址栏指定颜色
import { LocalStorage, Dark, AddressbarColor } from 'quasar'

const dark = !!LocalStorage.getItem('dark') // ... some logic to determine it (use Cookies Plugin?)
console.log('dark', dark)

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
// export default async (/* { app, router, Vue ... } */) => {
export default (/* { app, router, Vue ... } */) => {
  // something to do
  Dark.set(dark)
  AddressbarColor.set(dark ? '#000000' : '#ffffff')
}
