<template>
    <div>
      <form  class="space-y-4  max-w-screen-sm">
        <div>
          <Label>Address</Label>
          <Select class="relative"  v-model="formModel.address.id">
            <SelectTrigger class="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent  class="relative">
              <SelectGroup>
                <SelectItem value="apple">
                  Apple
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>User name</Label>
          <Input type="text" v-model="formModel.userName" />
        </div>
        <div>
          <Label>Phone number</Label>
          <Input type="tel"  v-model="formModel.phoneNumber"  />
        </div>
        <div>
          <Label>Address</Label>
          <Input type="text"   v-model="formModel.address.address" />
        </div>
        <div class="grid grid-cols-2 items-center justify-between gap-3 w-full">
          <div>
            <Label>Province</Label>
            <Input type="tel" v-model="formModel.address.province" />
          </div>
          <div>
            <Label>Ward</Label>
            <Input type="tel"    v-model="formModel.address.ward" />
          </div>
        </div>
      </form>
    </div>
</template>


<script lang="ts" setup>
    import {Input} from "@/components/ui/input";
    import {Label} from "@/components/ui/label";
    import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select'
    import {onMounted, ref} from "vue"
    import {useCurrentUser} from 'vuefire'


    const user = useCurrentUser() as any;

    const formModel =ref( {
      phoneNumber:'',
      userName:'',
      address:{
        id: '',
        ward: '',
        address:'',
        province: ''
      }
    })

    onMounted(() => {
      if(user){
        formModel.value.userName = user.value.displayName;
        formModel.value.phoneNumber = user.value.phoneNumber

      }
    })

</script>