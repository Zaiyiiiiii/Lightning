<template>
    <div class="home">
        <img
            @click="$emit('submit',{a:1})"
            alt="Vue logo"
            src="../assets/logo.png"
        >
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import { throttleTime, timeout } from "rxjs/operators"
    export default {
        name: 'home',
        async mounted() {
            this.$emit("submit")
        },
        events: {
            submit: () => {
                // console.log("submit")
            }
        },
        eventFlows: {
            submit(flow) {
                flow.pipe(throttleTime(500), timeout(500)).subscribe((x) => {
                    console.log("debounced", x, this.cccc)
                }, () => {
                    return
                })
            }
        },
        components: {
            HelloWorld
        },
        data() {
            return {
                cccc: 555
            }
        },
    }
</script>
