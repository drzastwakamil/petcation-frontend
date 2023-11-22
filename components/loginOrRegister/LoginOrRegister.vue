<template>
  <AlertDialog
    :open="isDialogOpen"
    @update:open="
      (open) => {
        isDialogOpen = open;
      }
    "
  >
    <AlertDialogTrigger as-child>
      <Button size="icon" variant="ghost">
        <LogIn />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent
      :on-outside-dialog-click="
        () => {
          if (isDialogOpen) {
            isDialogOpen = false;
          }
        }
      "
    >
      <Tabs default-value="login">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="login"> Logowanie </TabsTrigger>
          <TabsTrigger value="register"> Rejestracja </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <CardTitle class="pt-4">Logowanie</CardTitle>
          <CardDescription class="pt-2"> Wprowadź dane logowania. </CardDescription>
          <div class="space-y-3 pt-5">
            <div class="space-y-1">
              <Label for="email"> Email </Label>
              <Input id="email" placeholder="Wprowadź swój email" type="email" />
            </div>
            <div class="space-y-1">
              <Label for="new">Hasło</Label>
              <Input id="password" placeholder="Wprowadź hasło" type="password" />
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 pt-12">
            <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
            <Button
              class="col-span-3"
              :onclick="
                () => {
                  useUserSessionStore().logIn();
                }
              "
            >
              Zaloguj
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="register">
          <CardTitle class="pt-4">Rejestracja</CardTitle>
          <CardDescription class="pt-2"> Podaj swoje dane, aby się zarejestrować. </CardDescription>
          <div class="space-y-3 pt-5">
            <div class="space-y-1">
              <Label for="name"> Imię </Label>
              <Input id="name" placeholder="Podaj swoje imię" />
            </div>
            <div class="space-y-1">
              <Label for="surname"> Nazwisko </Label>
              <Input id="surname" placeholder="Podaj swoje nazwisko" />
            </div>
            <div class="space-y-1">
              <Label for="email"> Email </Label>
              <Input id="email" placeholder="Podaj swój email" type="email" />
            </div>
            <div class="space-y-1">
              <Label for="password">Hasło</Label>
              <Input id="password" placeholder="Podaj hasło" type="password" />
              <Input id="password-repeat" placeholder="Powtórz hasło" type="password" />
            </div>

            <div class="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="terms"
              >
                <span>
                  Akceptuję <NuxtLink class="underline" target="_blank" to="/statue.pdf">Regulamin</NuxtLink>
                  serwisu oraz
                  <NuxtLink class="underline" target="_blank" to="/privacy-policy.pdf"> Politykę prywatności </NuxtLink>
                </span>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 pt-12">
            <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
            <Button
              class="col-span-3"
              :onclick="
                () => {
                  useUserSessionStore().logIn();
                }
              "
            >
              Zarejestruj
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { LogIn } from 'lucide-vue-next';
import { AlertDialogCancel, AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const isDialogOpen = ref(false);
</script>
