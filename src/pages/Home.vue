<template>
  <div class="home">
    <div class="list">
      <div class="item" v-for="(item, index) in store.state.list" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    return {store}
  },
  // 已启用类型推断
  data() {
    return {
      count: 0
    }
  },
  methods: {
    countPlus() {
      this.count += 1
    }
  },
  // NOTE: https://www.bilibili.com/read/cv10826071/
  async asyncData(store) {
    return store.dispatch('fetchMessage')
  }
})
</script>

<style scoped>
  h1,
  a {
    color: green;
  }
</style>
