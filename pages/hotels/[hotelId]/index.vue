<template>
  <div class="container mx-auto">
    <div class="h-header" />

    <div class="grid grid-cols-7 gap-4 py-10">
      <div class="col-span-5 space-y-8">
        <ImagesCarousel
          :images-urls="[
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
          ]"
        />
        <div class="space-y-3">
          <h1 class="text-2xl">Zwierzakowo - Hotel dla Psów i Kotów</h1>
          <p>
            Witamy w "Zwierzakowo", wyjątkowym hotelu dla Twoich czworonożnych przyjaciół, gdzie psy i koty mogą cieszyć
            się luksusem i opieką, gdy Ty jesteś poza domem. Nasz hotel jest zaprojektowany z myślą o zapewnieniu
            maksymalnego komfortu i bezpieczeństwa dla Twoich pupili. Zakwaterowanie: Nasze pokoje są przestronne,
            klimatyzowane i dobrze oświetlone, zapewniając idealne warunki zarówno dla energicznych psów, jak i dla
            spokojnych kotów. Każdy pokój wyposażony jest w wygodne legowiska, świeże miski z wodą oraz zabawki
            dostosowane do potrzeb naszych czworonożnych gości. Opieka i bezpieczeństwo: Zdrowie i bezpieczeństwo
            Twojego zwierzaka są dla nas priorytetem. Hotel jest monitorowany 24 godziny na dobę, a doświadczony
            personel zapewnia stałą opiekę. Regularne spacery dla psów i zabawy dla kotów gwarantują, że Twoje zwierzę
            będzie aktywne i szczęśliwe. Wyżywienie: Oferujemy zbilansowane posiłki dostosowane do indywidualnych
            potrzeb dietetycznych każdego zwierzaka. Nasze menu zostało skonsultowane z weterynarzami, aby zapewnić
            najlepsze odżywianie dla Twojego psa czy kota.
          </p>
        </div>
        <div class="space-y-3">
          <h1 class="text-2xl">Lokalizacja</h1>
          <iframe
            allowfullscreen
            class="h-[500px] w-full overflow-hidden rounded-lg"
            frameborder="0"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBwWgN60dT3J_yh5-ZuxzHIfzEOX1e0b_Q&q=Domowy+Hotel+dla+zwierząt
,Szczecin+Poland"
            style="border: 0"
          />
        </div>
      </div>
      <div class="col-span-2">
        <Card class="flex flex-col overflow-hidden border">
          <CardHeader>
            <CardTitle> Cennik </CardTitle>
            <CardDescription class="flex flex-col gap-2 pt-3">
              <div class="flex"><DogIcon class="mr-1 h-5 w-5" /> Pies - 110zł noc</div>
              <div class="flex"><CatIcon class="mr-1 h-5 w-5" /> Kot - 50zł noc</div>
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-3">
            <DatePicker class="w-full" />
            <div>
              <AnimalsPicker />
            </div>
            <Separator />
          </CardContent>

          <CardFooter class="space-y-5">
            <div class="flex flex-row justify-between">
              <div class="font-semibold">Razem</div>
              <div>600zł</div>
            </div>
            <Button class="w-full" size="lg"> Kontynnuuj</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DogIcon, CatIcon } from 'lucide-vue-next';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
</script>
