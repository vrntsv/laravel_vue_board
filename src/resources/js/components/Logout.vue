<template>
    <div>
    </div>
</template>

<script>
    import router from "../routes";

    export default {
        router,
        name: "Logout",
        created() {
            this.$store.commit('logout');
        }
    }
</script>

<style scoped>

</style>
