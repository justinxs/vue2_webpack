<template>
    <v2-layout>
        <div class="user-page">
            uuuuuuuuuuuuuuuuuu{{formatTime(Date.now())}}
        </div>
    </v2-layout>
</template>
<script>
import request from '@/utils/request';

export default {
    data () {
        return {

        }
    },
    components: {
    },
    created () {
    },
    mounted () {
        request.get('/api/apolloConfig').then(data => {
            console.log(data)
        })
        request.post('/api/login').then(data => {
            console.log(data)
        })
    },
    methods: {
    }
}
</script>