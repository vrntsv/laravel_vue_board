<template>
    <div>
        <div v-for="post, index in posts">
            <br class="hidden-sm-and-down">
                <PostItem :post="post"></PostItem>
            <br class="hidden-sm-and-down">
        </div>
        <v-pagination
            v-model="pagination.current"
            :length="pagination.total"
            :total-visible="7"
            @input="onPageChange"

        ></v-pagination>
    </div>
</template>
<script>
    import PostItem from "./PostItem";
    export default {
        components: {PostItem},
        data: function () {
            return {
                PostItem,
                posts: null,
                pagination: {
                    current: 1,
                    total: 0
                }
            }

        },
        methods: {
            getPosts() {
                window.axios.get('/api/posts?page=' + this.pagination.current)
                    .then(response => {
                        this.posts = response.data.data;
                        this.pagination.current = response.data.current_page;
                        this.pagination.total = response.data.last_page;
                    });
            },
            onPageChange() {
                this.getPosts();
                this.$vuetify.goTo(0)
            }
        },
        mounted() {
            this.getPosts()
        },
    }
</script>


<style scoped>

</style>
