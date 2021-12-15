<template>
    <layout>
        <div class="user-page">
            uuuuuuuuuuuuuuuuuu{{formatTime(Date.now())}}
        </div>
    </layout>
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
        request.get('/api/apolloConfig')
        // request.post('/api/lever')
    },
    methods: {
    }
}
</script>