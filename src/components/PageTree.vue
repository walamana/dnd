<template>

  <div class="tree_part" :class="{collapsed, 'is_root': root.name === '#root'}">
      <a class="header" :class="classes" :href="root.title ? (root.url + '/' ) : null" @click.stop="collapsed = !collapsed" v-if="root.name !== '#root'">
          <i class="material-symbols-outlined" :class="root.name ? 'dir' : 'file'">{{ root.name ? "folder" : "article" }}</i>
          <span class="name">{{root.name ? root.name : root.title}}</span>
      </a>
      <div class="children" v-if="root.name">
          <PageTree v-for="child in root.children" :root="child"/>
      </div>
  </div>

</template>

<script>
export default {
    name: "PageTree",
    props: ["root"],
    data: function() {
        return {
            classes: {
                dir: !!this.root.name,
                file: !this.root.name
            },
            collapsed: false
        }
    },
    mounted() {
        console.log(this.$props.root.name)
    }
}



</script>

<style lang="less" scoped>

.tree_part{
    display: block;
    //border-left: 1px solid var(--color-on-surface-o10);
    //padding-left: 15px;

    .header{
        display: flex;
        align-items: center;
        padding: 8px 0;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        color: var(--color-on-surface);
        &.dir {
          transition: 100ms font-variation-settings;
          font-variation-settings: "FILL" 0;
        }
        i {
            display: inline-block;
            margin-right: 16px;
            font-size: 16px;
            opacity: 0.3;
            transition: 100ms opacity;
            width: 20px;
        }
        .name {
            opacity: 0.6;
            transition: 100ms opacity;
        }

        &:hover {
            i, .name {
                opacity: 1;
                &.file {
                    font-variation-settings: "FILL" 1;
                }
            }
        }
    }

    .children{
        margin-left: 20px;
        overflow: hidden;
    }

    &.collapsed{
        .children {
            height: 0;
        }
        .header.dir {
            font-variation-settings: "FILL" 1;
        }
    }

    &.is_root > .children{
        margin-left: 0 !important;
    }
}


</style>