<template>
  <div>
    <div class="bg-gradient-to-r from-white to-[#FFC6C6]">
      <div class="container mx-auto bg-transparent pt-20">
        <div class="grid max-h-[80vh] grid-cols-2 gap-16">
          <div class="flex flex-col justify-center">
            <h1 class="pb-10 text-6xl font-bold">Znajdź idealne miejsce dla Twojego pupila</h1>
            <p class="text-xl">
              Nasza platforma zawiera tylko sprawdzone i renomowane hotele dla zwierząt, abyś mógł podróżować z pełnym
              spokojem.
            </p>
          </div>
          <img class="max-h-[80vh]" src="/images/dog_n_cat.png" />
        </div>
      </div>
    </div>

    <div id="features" class="flex justify-center gap-16 pt-16">
      <img height="400" src="/images/search_image.svg" width="400" />
      <div class="flex max-w-[400px] flex-col justify-center">
        <h1 class="pb-10 text-6xl font-bold">Wyszukaj</h1>
        <p class="text-xl">Wprowadź swoje preferencje i przeszukaj naszą bazę hoteli dla zwierząt.</p>
      </div>
    </div>

    <div class="flex justify-center gap-16 pt-16">
      <div class="flex max-w-[400px] flex-col justify-center">
        <h1 class="pb-10 text-6xl font-bold">Wybierz</h1>
        <p class="text-xl">Porównaj różne hotele i wybierz ten, który najbardziej Ci odpowiada.</p>
      </div>
      <img height="400" src="/images/choose_image.svg" width="400" />
    </div>

    <div class="flex justify-center gap-16 py-16">
      <img height="400" src="/images/book_image.svg" width="400" />
      <div class="flex max-w-[400px] flex-col justify-center">
        <h1 class="pb-10 text-6xl font-bold">Rezerwuj</h1>
        <p class="text-xl">
          Dokonaj rezerwacji online i zapewnij swojemu zwierzakowi komfortowy pobyt podczas Twojej nieobecności.
        </p>
      </div>
    </div>

    <div id="security" class="bg-gradient-to-r from-[#E1EBFB] to-white">
      <div class="container mx-auto bg-transparent">
        <div class="grid grid-cols-2 gap-16 pt-16">
          <img class="" src="/images/home_image.png" />
          <div class="flex flex-col justify-center">
            <h1 class="pb-10 text-6xl font-bold">Bezpieczeństwo ponad wszystko</h1>
            <p class="text-xl">
              Nasz system oceniania gwarantuje spokój. Tylko zwierzęta z dobrymi opiniami znajdują miejsce w naszych
              hotelach.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
