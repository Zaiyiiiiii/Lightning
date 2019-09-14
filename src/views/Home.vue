<template>
    <div class="home">
        <img
            @click="$emit('submit','cc')"
            alt="Vue logo"
            src="../assets/logo.png"
        >
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import { throttleTime } from "rxjs/operators"
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
            submit: (flow) => {
                flow.pipe(throttleTime(1500)).subscribe((x) => {
                    console.log("debounced", x)
                })
            }
        },
        components: {
            HelloWorld
        }
    }
</script>
