<template>
  <div class="container mx-auto bg-transparent">
    <div class="h-header" />
    <div class="flex justify-center gap-2 pt-10"><Combobox /> <DatePicker /> <AnimalsPicker /></div>
    <div class="grid grid-cols-4 gap-5 py-10">
      <HotelCard
        v-for="n in 30"
        :key="n"
        :location="'Głogowska 145, Poznań'"
        :photo-url="`https://loremflickr.com/500/500/dog?idk=${Date.now() + Math.random()}`"
        :price-per-night="150"
        :price-total="7 * 150"
        :range="8.5"
        :review-average="4.56"
        :title="'Hotel Psitulas'"
      />
    </div>
  </div>
</template>

<script></script>
