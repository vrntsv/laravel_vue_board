<template>
    <div>
    </div>
</template>

<script>
    import router from "../routes";

    export default {
        name: "Logout",
        created() {
                let config = { headers: { 'Accept': 'application/json' } }
                axios.post('/api/auth/logout',  config)
                    .then(function(response) {
                        router.push('/')
                    })
                    .catch(error => console.log(error));
                console.log('1')
        }
    }
</script>

<style scoped>

</style>
