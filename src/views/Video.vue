<template>
  <video ref="h5Video" class="video-js vjs-background-skin">
    
  </video>
</template>
<script>
import 'video.js/dist/video-js.css';
import '@styles/modules/videojs.scss';
import videojs from 'video.js';
import flvjs from 'flv.js';
import { flvjsTech } from '@/utils/videojsTech';

videojs.registerTech('flvjs', flvjsTech(videojs, flvjs));

export default {
  mounted() {
    // For v5 the tech must be added to the tech order.
    // For v6 this is not needed.
    const player = videojs(this.$refs.h5Video, {
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
      controls: true,
      autoplay: true,
      muted: true
    });
    // // alert(flvjs.isSupported())
    // // alert(JSON.stringify(flvjs.getFeatureList()))

    // console.log(player)
  },
};
</script>
<style lang="scss" scoped>
</style>