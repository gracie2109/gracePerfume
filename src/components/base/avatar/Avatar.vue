<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div v-if="displayName" class="flex items-center gap-2">
        {{ displayName }}<IconChevronDown class="size-5" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="() => {$router.push({name: 'profile', params: {}}) }">Profile</DropdownMenuItem>

      <DropdownMenuItem class="cursor-pointer" @click="logout">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FirebaseError } from 'firebase/app'
import { signOut, type Auth } from 'firebase/auth'
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useCurrentUser, useFirebaseAuth} from "vuefire";
import {toast} from "vue-sonner";

const auth = useFirebaseAuth()   as Auth
const user = useCurrentUser()
const router = useRouter()
const displayName = ref<string | null>(null)

onMounted(() => {
  if(user.value){
    displayName.value = user.value?.displayName && user.value?.displayName?.length >=1 ? user.value?.displayName : user?.value.email
  }
});

async function logout() {
  try {
    await signOut(auth)
    router.go(0)
  } catch (error) {
    let errorMessage = 'An unknown error occurred.'

    if (error instanceof FirebaseError) {
      errorMessage = error.message
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    toast.error(errorMessage)
  }
}
</script>