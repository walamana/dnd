<template>

  <span class="path">
      <span v-for="part in parts"> {{ part }} / </span>
  </span>

</template>

<script>
export default {
    name: "PathNavigator",
    props: ["parts"],
    computed: {
        parts() {
            let segments = this.$props.parts.split("/");
            segments.splice(0, 1)
            segments.splice(segments.length - 1, 1)
            return segments
        }
    },
}
</script>

<style lang="less" scoped>

.path {
  span {
    opacity: 0.4;
  }
}

</style>