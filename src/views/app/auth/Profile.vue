<template>
  <div v-if="user" class="space-y-8">
    <UserAvatar/>
    <div class="grid grid-cols-3 gap-8 ">
      <div class="space-y-3 col-span-2">
        <div>
          <Label>User name</Label>
          <Input v-model="profileModel.userName" type="text"/>
        </div>
        <div>
          <Label>Email</Label>
          <Input v-model="profileModel.email" type="text"/>
        </div>
        <div>
          <Label>Phone number</Label>
          <Input v-model="profileModel.phoneNumber" type="text"/>
        </div>
        <div>
          <Label>Gender</Label>
          <RadioGroup :default-value="gender[0]" class="flex gap-x-6 mt-2">
            <div v-for="i in gender" :key="i" class="flex items-center space-x-2">
              <RadioGroupItem :id="i" :value="i"/>
              <Label :for="i" class="capitalize font-medium cursor-pointer">{{ i }}</Label>
            </div>

          </RadioGroup>
        </div>
      </div>
      <div id="providerData" class="col-span-1">
        <h4 class="font-semibold">Provider</h4>
        <div v-for="(i, j) in providerGate" :key="j">
          <div v-for="(k, kk) in user.providerData" :key="kk">
            <div v-if="k.providerId === i.providerId"
                 class="flex gap-x-6 mt-2 border items-center p-1 rounded-lg cursor-pointer">
              <img :src="i.img" alt="">
              <span> {{ k.email }}</span>
            </div>

            <div v-else class="flex gap-x-6 mt-2 border items-center p-1 rounded-lg grayscale	">
              <img :src="i.img" alt="">
              <span> NOT ACTIVE</span>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>

</template>


<script lang="ts" setup>
import UserAvatar from "@/components/base/avatar/UserAvatar.vue";
import {inject, onMounted, Ref, ref} from "vue";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {providerGate} from "@/lib/constant"
import { User  } from 'firebase/auth';

const user = inject('user') as Ref<User>
const gender = ['male', 'female'];

const profileModel = ref({
  userName: '',
  email: '',
  phoneNumber: '',
  gender: typeof gender[0]
})

onMounted(() => {
  if (user.value) {
    Object.assign(profileModel.value, user.value);
    profileModel.value.userName = user.value?.displayName || ''
  }
})

</script>

<style scoped>
.disable_provider {
  user-select: none;
  background: red
}
</style>