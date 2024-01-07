<template>
  <div class="rounded-md bg-zinc-50">
    <div>
      <section
        id="main-carousel"
        aria-label="The carousel with thumbnails. Selecting a thumbnail will change the Beautiful Gallery carousel."
        class="splide"
      >
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(imageUrl, index) in imagesUrls" :key="imageUrl" class="splide__slide">
              <img :alt="`${index}hotelPhoto`" class="m-auto max-h-full object-contain" :src="imageUrl" />
            </li>
          </ul>
        </div>
      </section>
      <Separator class="my-3" />
      <section
        id="thumbnail-carousel"
        aria-label="The carousel with thumbnails. Selecting a thumbnail will change the Beautiful Gallery carousel."
        class="splide"
      >
        <div class="splide__track">
          <ul class="splide__list">
            <li v-for="(imageUrl, index) in imagesUrls" :key="imageUrl" class="splide__slide">
              <img :alt="`${index}hotelPhoto`" class="h-full w-full rounded bg-zinc-100 object-cover" :src="imageUrl" />
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-named-as-default
import Splide from '@splidejs/splide';

defineProps<{
  imagesUrls: Array<string>;
}>();

onMounted(() => {
  const main = new Splide('#main-carousel', {
    type: 'fade',
    fixedHeight: 500,
    rewind: true,
    pagination: false,
    arrows: false,
  });

  const thumbnails = new Splide('#thumbnail-carousel', {
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
  });

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();
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
