import Vue from "vue"
import { Subject } from "rxjs"
class Lightning {
    constructor() {

    }
    install(vm) {
        // events to $on(_events)
        Vue.mixin({
            beforeCreate() {
                const extendOptions = this.__proto__.constructor.extendOptions
                if (!extendOptions) {
                    return
                }
                if (extendOptions.events) {
                    Object.keys(extendOptions.events).map(
                        key => this.$on(key, extendOptions.events[key])
                    )
                }
                if (extendOptions.eventFlows) {
                    Object.keys(extendOptions.events).map(
                        key => {
                            let flow = new Subject()
                            extendOptions.eventFlows[key].call(this, flow)
                            this.$on(key, event => {
                                flow.next(event)
                            })
                        }
                    )
                }
            }
        })

        Vue.prototype.$whisper = function (event, payload) { //self
            this.$emit(event, payload)
        }
        Vue.prototype.$spread = function (event, payload) {  //direct parent
            this.$children.map(child => child.$emit(event, payload))
        }
        Vue.prototype.$shout = function (event, payload) { //direct children
            this.$parent.$emit(event, payload)
        }
        // all parents upto root
        // to a spec node
        // to root
        // all children
        // all brothors
        // to all
    }
}

// 先用vue的原生事件吧。
// class LightningEvent {
//     constructor() {
//         this.from // vuenode
//         this.name // eventname
//     }
// }

let lightning = new Lightning()
Vue.use(lightning)

// export default new Lightning()