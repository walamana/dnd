<template>
    <div class="toolbar">
        <i class="material-symbols-outlined menu" @click="opened = !opened">menu</i>
    </div>
    <div class="side" :class="{opened}" @click="opened = false">
        <div class="page-tree">
            <PageTree :root="pageTree" client:load/>
        </div>
    </div>
</template>

<script>
import PageTree from "./PageTree.vue";

export default {
    name: "SidePanel",
    components: {PageTree},
    props: ["pageTree"],
    data: function() {
        return {
            opened: false
        }
    }
}
</script>

<style lang="less" scoped>

.toolbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    background: var(--surface-color);
    opacity: 1;
    user-select: none;
    cursor: pointer;
    display: none;
    border-bottom: 1px solid #2f2f2f;
}
.side{
    display: flex;
    flex-shrink: 0;
    max-width: 300px;
    height: 100%;
    position: sticky;
    top: 0;
    .page-tree {
        display: block;
        padding: 14px 40px 20px 36px;
        transition: 200ms transform;
    }
}

@media (max-width: 800px) {
    .toolbar {
        display: block;
        z-index: 101;
    }
    .side {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        background: transparent;
        transition: 200ms background-color;
        pointer-events: none;

        font-size: 20px;

        .page-tree {
            background: var(--surface-color);
            border-right: 1px solid #2f2f2f;
            transform: translateX( calc(-100% - 76px) );
            padding: 62px 40px 20px 36px;
        }

        &.opened {
            pointer-events: auto;
            background: rgba(0, 0, 0, 0.5);
            .page-tree{
                transform: translateX(0);
            }
        }
    }
}
</style>