<template>

  <span class="path" v-if="parts && parts.length > 0">
      <span v-for="path in parts">
          <a :href="path.url" v-if="path.url">{{ path.name }}</a><span v-else>{{path.name}}</span> /
      </span>
  </span>

</template>

<script>
export default {
    name: "PathNavigator",
    props: ["parts"],
    methods: {
        backpoints(n) {
            let s = ""
            for(let i = 0; i < n+1; i++) {
                s += "../";
            }
            return s;
        }
    }
}
</script>

<style lang="less" scoped>

.path {
  display: block;
  span {
    opacity: 0.7;
  }
  padding-bottom: 30px;
}

</style>