import { formatTime } from '@/filters';

export default {
    methods: {
        formatTime() {
            return formatTime(...arguments)
        }
    }
};