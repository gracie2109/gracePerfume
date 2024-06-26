<template>
  <div
      class="custom-bg-img relative grid place-content-center bg-contain bg-fixed bg-center  xs:h-screen sm:px-0"
  >
    <div class="absolute inset-0 w-full bg-custom-bg"></div>
    <AppLogo class="z-10 mx-auto mb-5" />
    <Card  class="z-10 w-[980px]'">
      <CardHeader>
        <CardTitle class="text-2xl text-custom-bg">Login</CardTitle>
        <CardDescription class="text-custom-bg">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="login">
          <Transition name="fade" mode="out-in">
            <Alert v-if="errorMessage" variant="destructive" class="mb-4 border-0 bg-red-50">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {{ errorMessage }}
              </AlertDescription>
            </Alert>
          </Transition>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email" class="text-custom-bg">Email</Label>
              <Input
                  id="email"
                  v-model.trim="models.email"
                  type="email"
                  placeholder="m@example.com"
                  required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password" class="text-custom-bg">Password</Label>
                <!-- <a href="#" class="ml-auto inline-block text-sm text-custom-bg underline">
                  Forgot password?
                </a> -->
              </div>
              <div class="relative w-full">
                <Input
                    id="password"
                    v-model="models.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="pr-10 text-custom-bg"
                    required
                />
                <span
                    role="button"
                    class="absolute inset-y-0 end-0 flex items-center justify-center px-3"
                    @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="!showPassword" class="size-4 text-muted-foreground" />
                  <Eye v-else class="size-4 text-muted-foreground" />
                </span>
              </div>
            </div>
            <Button
                type="submit"
                class="w-full bg-custom"
                :disabled="isLoading"
            >
              <LoaderIcon v-if="isLoading" class="mr-1.5 animate-spin" :size="18" />
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </Button>
          </div>
        </form>

          <Separator class="my-4" label="OR" />

            <Button variant="outline" class="w-full">
             <Github class="w-4 h-4 mr-2"/> Login with google
            </Button>

        <div class="mt-4 text-center text-sm text-custom-bg">
          Don't have an account?
          <RouterLink :to="$router.resolve({name:'register'})" class="underline"> Sign up </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>

</template>

<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth'
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useFirebaseAuth} from "vuefire";
import {Card, CardDescription, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {EyeOff, Eye, LoaderIcon, Github } from "lucide-vue-next"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import AppLogo from "@/components/AppLogo.vue";
import { Separator } from '@/components/ui/separator'



const auth = useFirebaseAuth() as Auth
const router = useRouter();

const models = reactive({
  email: '',
  password: ''
})
const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
let timeout: ReturnType<typeof setTimeout>

async function login() {
  isLoading.value = true
  try {
    clearTimeout(timeout)
    errorMessage.value = null
    await signInWithEmailAndPassword(auth, models.email, models.password)
    router.go(0)
  } catch (error) {
    isLoading.value = false
    errorMessage.value = 'An unknown error occurred.'

    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        errorMessage.value = 'Email or password is incorrect.'
      } else if (error.code === 'auth/user-not-found') {
        errorMessage.value = 'User not found.'
      } else {
        errorMessage.value = error.message
      }
    } else if (error instanceof Error) {
      errorMessage.value = error.message
    }

    clearErrorMessage()
  }
}

function clearErrorMessage() {
  timeout = setTimeout(() => {
    errorMessage.value = null;
    reset()
  }, 3000)
}

function reset(){
  models.email="";
  models.password="";
}

</script>