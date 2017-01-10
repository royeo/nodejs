<!--根组件，包含了Display和Increment两个子组件-->
<template>
    <div>
        <Display></Display>
        <Increment></Increment>
    </div>
</template>

<script>
import Display from './Display.vue'
import Increment from './Increment.vue'
import store from './store'

export default {
    components: {
        Display: Display,
        Increment: Increment
    },

    store: store    //在根组件加入store，让它的子组件和store连接
}
</script>