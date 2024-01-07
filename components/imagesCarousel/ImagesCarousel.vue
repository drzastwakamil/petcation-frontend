<template>
  <div class="wrapper">
    <Splide ref="main" aria-labelledby="thumbnail-example-heading" :options="mainOptions">
      <SplideSlide v-for="(url, index) in imagesUrls" :key="index">
        <img :alt="`hotelImage${index}`" class="m-auto h-full max-h-full object-contain" :src="url" />
      </SplideSlide>
    </Splide>
    <Separator class="my-3" />

    <Splide
      ref="thumbs"
      aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
      :options="thumbsOptions"
    >
      <SplideSlide v-for="(url, index) in imagesUrls" :key="index">
        <img :alt="`hotelImage${index}`" :src="url" />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide, type Options } from '@splidejs/vue-splide';
defineProps<{
  imagesUrls: Array<string>;
}>();

const mainOptions: Options = {
  type: 'fade',
  fixedHeight: 500,
  rewind: true,
  pagination: false,
  arrows: false,
};

const thumbsOptions: Options = {
  type: 'slide',
  cover: true,
  updateOnMove: true,
  fixedWidth: 100,
  fixedHeight: 60,
  gap: 10,
  rewind: true,
  pagination: false,
  isNavigation: true,
  focus: 'center',
  breakpoints: {
    600: {
      fixedWidth: 60,
      fixedHeight: 44,
    },
  },
};

const main = ref<InstanceType<typeof Splide>>();
const thumbs = ref<InstanceType<typeof Splide>>();
onMounted(() => {
  const thumbsSplide = thumbs.value?.splide;

  if (thumbsSplide) {
    main.value?.sync(thumbsSplide);
  }
});
</script>

<style>
.splide__slide {
  opacity: 30%;
  border: 0px !important;
}

.splide__slide.is-active {
  opacity: 100%;
}
</style>
