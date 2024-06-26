<template>
  <Button variant="outline" class="w-full" @click.prevent="createUserProvideGoogle">
    <Github class="w-4 h-4 mr-2"/> Signup with google
  </Button>
</template>

<script lang="ts" setup>
import {type Auth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {FirebaseError} from "firebase/app";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useFirebaseAuth} from "vuefire";
import {Button} from "@/components/ui/button";
import {Github} from "lucide-vue-next";
import { toast } from 'vue-sonner'



const isLoading = ref<boolean>(false)
let timeout: ReturnType<typeof setTimeout>
const googleAuthProvider = new GoogleAuthProvider();
const router = useRouter()
const auth = useFirebaseAuth() as Auth



async function createUserProvideGoogle() {
  isLoading.value = true
  try {
    clearTimeout(timeout)
    await signInWithPopup(auth, googleAuthProvider)
    router.replace({name: 'home'})
  } catch (error) {
    isLoading.value = false
    toast.error('An unknown error occurred.')

    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already exists.')
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters.')
      } else {
        toast.error(error.message)
      }
    } else if (error instanceof Error) {
      toast.error(error.message)
    }
  }
}

</script>