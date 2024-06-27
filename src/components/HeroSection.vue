<template>
  <div class="bg-cara-secondary p-5 rounded-md">

  <div class="relative flex gap-3 container justify-between">
    <div class="">
      <div class="relative grid place-items-center h-full">
        <div class="max-w-screen-sm space-y-8">
          <h1 class="text-4xl font-bold  lg:text-5xl">
            The Perfume Expert
          </h1>
          <p class="max-w-xl">The scent of a flower can evoke many different emotions. It can be calming, energizing, or even romantic. It can also remind us of happy memories or special occasions.</p>
            {{success}}

          <Transition name="fade" mode="out-in">
            <div v-if="success!== null">
              <Alert :variant="success ? 'success' : 'destructive'" >
                <MailCheck class="h-4 w-4" />
                <AlertTitle>
                  <span v-if="success">Success</span>
                  <span v-else>Hola!</span>
                </AlertTitle>
                <AlertDescription>
                  You have registered to receive promotional information from us
                </AlertDescription>
              </Alert>
            </div>
          </Transition>
          <div class="button_group flex items-center gap-8">
            <div>
              <div class="max-w-screen-sm" >
                <form @submit.prevent="handleSubmit" class="flex gap-3">

                    <Input
                        id="email"
                        v-model.trim="model.email"
                        type="email"
                        placeholder="example@gmail.com"
                        required
                        class="w-full min-w-[450px]"
                    />
                  <Button variant="outline" class="text-black" >

                    <SendHorizontal  class="w-4 h-4 mr-2" v-if="!loading"/>
                    <LoaderIcon  class="w-4 h-4 mr-2" v-else/>
                    Send
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="https://odor-workdo.myshopify.com/cdn/shop/files/img1.png?v=1675420315" alt="" class="inline-block">
  </div>
  </div>


</template>

<script setup lang="ts">
  import { SendHorizontal , LoaderIcon } from 'lucide-vue-next';
  import {Button} from "@/components/ui/button";
  import {ref, Transition} from "vue";
  import {Input} from "@/components/ui/input";
  import { MailCheck } from 'lucide-vue-next';
  import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirestore,  } from 'vuefire'
  import {checkItemExistence} from "@/lib/utils.ts";
  let timeout: ReturnType<typeof setTimeout>



  const model = ref({
    email: ''
  });
  const loading = ref(false)
  const success = ref<boolean | null>(null);
  const db = useFirestore()

  async function handleSubmit () {
    try{
      clearErrorMessage()
      loading.value = true;
      const exist = await checkItemExistence('notifications','email', model.value.email);
      if(!exist){
        await addDoc(collection(db, 'notifications'), {
          email: model.value.email
        });
        success.value=true
        model.value.email="";
      }else{
        success.value=false;
        model.value.email="";
      }

    }
    catch(error){
      model.value.email="";
      clearErrorMessage()
    }
    finally {
      loading.value = false;
    }
  }

  function clearErrorMessage() {
    timeout = setTimeout(() => {
      success.value=null;
      model.value.email=""
    }, 3000)
  }

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>