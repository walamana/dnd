<template>
    <div class="toolbar">
        <div class="left">
            <i class="material-symbols-outlined menu" @click="opened = !opened">menu</i>
            <h3>
                Children of Durrmarhøn
                <span class="username" v-if="username">- {{username}}</span>
            </h3>

        </div>
        <i class="material-symbols-outlined menu" @click="logout">logout</i>
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
            opened: false,
            username: null
        }
    },
    mounted() {
        console.log(document)
        this.username = document.cookie.split(";").find(c => {
            return c.trim().startsWith("user=");
        }).replace("user=", "")
    },
    methods: {
        logout(){
            document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:01 GMT"
            document.location.reload()
        }
    }
}

</script>

<style lang="less" scoped>

.toolbar {
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 20px;
    background: var(--surface-color);
    opacity: 1;
    user-select: none;
    cursor: pointer;
    border-bottom: 1px solid #2f2f2f;

    display: flex;
    width: calc(100% - 40px);
    z-index: 101;
    .left {
        display: flex;
        align-items: center;
        width: 100%;
        h3{
            display: inline-flex;
            justify-content: start;
            align-items: center;
            margin: 0 0 0 20px;
            padding: 0;
            .username {
                margin-left: 5px;
                opacity: 0.5;
            }
        }
    }
    .right {
        flex-shrink: 0;
    }
}
.side{
    display: flex;
    flex-shrink: 0;
    max-width: 300px;
    height: 100%;
    position: sticky;
    top: 44px;
    .page-tree {
        display: block;
        padding: 14px 40px 20px 36px;
        transition: 200ms transform;
    }
}

@media (max-width: 800px) {
    .side {
        width: 100%;
        max-width: none;
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