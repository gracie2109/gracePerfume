<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button variant="destructive" size="icon" >
        <Trash class="w-4 h-4" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{props.title}}?</AlertDialogTitle>
        <AlertDialogDescription v-if="props.description">
          {{props.description}}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('onCancel')">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="emit('onConfirm')">
            <template v-if="props.okText">{{props.okText}}</template>
            <template v-else>Continue</template>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {Button} from "@/components/ui/button"
import {Trash} from "lucide-vue-next"
const emit = defineEmits(['onCancel', 'onConfirm'])
const props = defineProps<{
  title: String,
  description?: String ,
  okText?:String,
  triggerText:String
}>()

</script>