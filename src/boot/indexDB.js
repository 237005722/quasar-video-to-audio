// import something here

// 配置
const myDB = {
  name: 'my_videoData',
  version: 1,
  db: null,
  ojstore: {
    name: 'videoData', // 存储空间表的名字
    keypath: 'id' // 主键
  }
}

// 实例化
const indexDB = {
  myDB: null,
  indexedDB: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
  IDBTransaction: window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
  IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange, // 键范围

  // 初始化
  initDB (myDB, callback) {
    if (!this.myDB) {
      this.openDB(myDB, callback)
    } else {
      console.log('initDB had opened:' + this.myDB.name + ' version' + this.myDB.version)
      callback()
    }
  },
  // 建立或打开数据库，建立对象存储空间(ObjectStore)
  openDB (myDB, callback) {
    this.myDB = myDB
    const version = this.myDB.version || 1
    const request = this.indexedDB.open(this.myDB.name, version)
    request.onerror = (e) => {
      console.log('openDB onerror:', e.currentTarget.error.message)
    }
    request.onsuccess = (e) => {
      this.myDB.db = e.target.result
      console.log('openDB onsuccess:', this.myDB.name + ' version' + version)
      callback()
    }
    request.onupgradeneeded = (e) => {
      const db = this.myDB.db = e.target.result
      if (!db.objectStoreNames.contains(this.myDB.ojstore.name)) {
        // 没有该对象空间时创建该对象空间
        db.createObjectStore(this.myDB.ojstore.name, {
          keyPath: this.myDB.ojstore.keypath
        })
        console.log('openDB onupgradeneeded:', this.myDB.ojstore.name)
      }
    }
  },

  // 删除数据库
  deleteDB () {
    this.myDB && this.indexedDB.deleteDatabase(this.myDB.name)
    console.log('deleteDB', this.myDB.name)
    this.myDB = null
  },

  // 关闭数据库
  closeDB () {
    this.myDB && this.myDB.db.close()
    console.log('closeDB', this.myDB.db)
    this.myDB = null
  },

  // 添加数据，重复添加会报错
  addData (data) {
    const store = this.myDB.db.transaction(this.myDB.ojstore.name, 'readwrite').objectStore(this.myDB.ojstore.name)
    let request
    for (var i = 0; i < data.length; i++) {
      request = store.add(data[i])
      request.onerror = () => {
        console.log('addData onerror')
        this.putData(this.myDB.db, this.myDB.ojstore.name, data)
      }
      request.onsuccess = () => {
        console.log('addData库 onsuccess')
      }
    }
  },

  // 添加数据，重复添加会更新原有数据
  putData (modData) {
    if (modData.id) {
      this.getDataByKey(modData.id, (store, res) => {
        if (res) {
          res.data = modData.data // 更新数据
        } else {
          res = modData
        }
        store.put(res).onsuccess = () => {
          console.log('putData onsuccess')
        }
      })
    }
  },

  // 获取所有数据
  getAllData (callback) {
    const store = this.myDB.db.transaction(this.myDB.ojstore.name, 'readwrite').objectStore(this.myDB.ojstore.name)
    const allRecords = store.getAll()
    allRecords.onsuccess = () => {
      console.log('getAllData allRecords', allRecords.result)
      if (typeof (callback) === 'function') {
        callback(allRecords.result)
      }
    }
  },

  // 根据存储空间的键找到对应数据
  getDataByKey (key, callback) {
    const store = this.myDB.db.transaction(this.myDB.ojstore.name, 'readwrite').objectStore(this.myDB.ojstore.name)
    const request = store.get(key)
    request.onerror = (error) => {
      console.log('getDataByKey error', error)
      if (typeof (callback) === 'function') {
        callback(store, null)
      }
    }
    request.onsuccess = (e) => {
      const result = e.target.result
      console.log('getDataByKey result', result)
      if (typeof (callback) === 'function') {
        callback(store, result)
      }
    }
  },

  // 删除某一条记录
  deleteData (key) {
    const store = this.myDB.db.transaction(this.myDB.ojstore.name, 'readwrite').objectStore(this.myDB.ojstore.name)
    store.delete(key)
    console.log('deleteData' + this.myDB.ojstore.name + '中' + key + '记录')
  },

  // 删除存储空间全部记录
  clearData () {
    const store = this.myDB.db.transaction(this.myDB.ojstore.name, 'readwrite').objectStore(this.myDB.ojstore.name)
    store.clear()
    console.log('clearData' + this.myDB.ojstore.name + '全部记录')
  }

}

// "async" is optional
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ app, router, store, Vue }) => {
  // something to do
  Vue.prototype.$myDB = myDB
  Vue.prototype.$indexDB = indexDB
}
