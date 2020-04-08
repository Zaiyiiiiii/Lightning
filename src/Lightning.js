import Vue from "vue"
import { Subject } from "rxjs"

// event应有作用域 （Global or Component）
// 局部注册的eventCollection注册在组件内部
// 全局的注册在根组件

class Lightning {
    constructor() {

    }
    pushToCollection() {

    }

    install(vm) {
        // event: {
        //     "ok": ()=>{}
        //     "transfered": [...handlers]，
        //     "transfer-start": {
        //          global: true,
        //          handler: ()=>{}   //  handler: [ ...handers  ] 
        //     },
        //     "transfering": [{global:true, handler:()=>{} }]
        // }
        Vue.mixin({
            beforeCreate() {
                const extendOptions = this.__proto__.constructor.extendOptions
                if (!extendOptions) {
                    return
                }
                this.eventCollection = {}

                extendOptions.events && Object.keys(extendOptions.events).reduce(
                    // 如是Array还需检测元素类型，暂略过，后续改用Typescript限制类型。
                    // 判断Global？ 默认false
                    // 改用reduce遍历处理，global push至全局，本地加工后merge入eventCollection
                    (collection, key) => {
                        switch (extendOptions[key].constructor) {
                            case Function:
                                collection[key] = { vid: this._vid, handler: extendOptions[key] }
                                return collection
                            case Array:
                                break
                            case Object:
                                break
                            default:
                                throw new TypeError("event can only be Function or Function Array")
                        }
                    }, {}
                )
                // noiseBlock 
            }
        })
        Vue.prototype.$broadcast = function (a, v, c, d) {

        }
    }
}
let lightning = new Lightning()
Vue.use(lightning)

// export default new Lightning()