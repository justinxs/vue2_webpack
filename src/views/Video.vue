<template>
  <video id="videojs-flvjs-player" class="video-js vjs-default-skin" controls>
    
  </video>
</template>
<script>
import 'video.js/dist/video-js.css';
import { videojs, flvjs } from '@/utils/flvVideojs';

export default {
  mounted() {
    // For v5 the tech must be added to the tech order.
    // For v6 this is not needed.
    const player = videojs("videojs-flvjs-player", {
      techOrder: ["html5", "flvjs"],
      flvjs: {
        mediaDataSource: {
          isLive: true,
          cors: true,
          withCredentials: false,
        },
        // config: {},
      },
      sources: [
        {
          type: 'video/x-flv',
          src: '/bbb.flv'
        }
      ],
      autoplay: true,
      muted: true
    });
    alert(flvjs.isSupported())
    alert(JSON.stringify(flvjs.getFeatureList()))

    console.log(player)
  },
};
</script>
<style lang="scss" scoped>
</style>