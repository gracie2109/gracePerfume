<template>
  <div class="mt-2 w-full space-y-4">
    <div class="grid grid-cols-2 items-start gap-3 w-full">

      <div class="space-y-2">
        <Label for="province">Province</Label>
        <Select
            :model-value="props.form.province.ProvinceID"
            id="province"
            @update:modelValue=" (v) => currySelected('province',v,'string', mapProvince, 'ProvinceID','ProvinceName')"
        >
          <SelectTrigger >
            <SelectValue :placeholder="props.form.province.ProvinceName"/>
          </SelectTrigger>
          <SelectContent side="bottom">
            <template v-for="i in listProvince" v-if="listProvince" :key="i.ProvinceID" >
              <SelectItem :value="i.ProvinceID.toString()">
                {{ i.ProvinceName }}
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <Label for="district">District</Label>
        <Select
            :model-value="props.form.district.DistrictID"
            id="district"
            @update:modelValue=" (v) => currySelected('district',v,'string', mapDistricts, 'DistrictID','DistrictName')"
        >
          <SelectTrigger >
            <SelectValue :placeholder="props.form.district.DistrictName"/>
          </SelectTrigger>
          <SelectContent side="bottom">
            <template v-for="i in listDistricts" v-if="listDistricts" :key="i.DistrictID" >
              <SelectItem :value="i.DistrictID.toString()">
                {{ i.DistrictName }}

              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>

    </div>

    <div class="space-y-2">
      <Label for="ward">Ward</Label>
      <Select
          :model-value="props.form.ward.WardCode"
          id="ward"
          @update:modelValue=" (v) => currySelected('ward',v,'string', mapWards, 'WardCode','WardName')"
      >
        <SelectTrigger >
          <SelectValue :placeholder="props.form.ward.WardCode"/>
        </SelectTrigger>
        <SelectContent side="bottom">
          <template v-for="i in listWards" v-if="listWards" :key="i.WardCode" >
            <SelectItem :value="i.WardCode.toString()">
              {{ i.WardName }}

            </SelectItem>
          </template>
        </SelectContent>
      </Select>
    </div>

    <div class=" gap-2" v-if="props.form">
      <Label for="address">Address</Label>
      <Textarea id="address" v-model="props.form.address" placeholder="Type your exactly address." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {onMounted, reactive, ref, watch} from "vue";
import {GHNDistrict, GHNProvince, GHNWard, IAddress} from "@/types/location.ts";
import {getDistrict, getProvince, getWard} from "@/services/location.ts";


const listProvince = ref<GHNProvince[] | null | undefined>(null)
const mapProvince = reactive(new Map());

const listDistricts = ref<GHNDistrict[] | null | undefined>(null)
const mapDistricts = reactive(new Map());

const listWards = ref<GHNWard[] | null | undefined>(null)
const mapWards = reactive(new Map());

const props = defineProps<{
  form: any
}>()

const currySelected = (
    modelName: keyof IAddress,
    selectedId: string | number,
    selectedIdType: 'string' | 'number',
    listMapName: Map<string | number, any>,
    codeField: any,
    nameField: any
) => {
  const select = selectedIdType === 'number' ? listMapName.get(Number(selectedId)) : listMapName.get(String(selectedId));
  if (select && props.form) {
    //@ts-ignore
    props.form[modelName][codeField] = select[codeField];
    //@ts-ignore
    props.form[modelName][nameField] = select[nameField];
  }
};


onMounted(async () => {
  const province = await getProvince() as any;
  listProvince.value = province;
  if (province) {
    province.map((i: GHNProvince) => mapProvince.set(i.ProvinceID, i))
  }
})


watch(() => props.form?.province?.ProvinceID, async () => {
  if (props.form?.province?.ProvinceID !== 0 ) {
    const districts = await getDistrict(props.form?.province?.ProvinceID);
    listDistricts.value = districts
    if (districts) {
      districts.map((i: GHNDistrict) => mapDistricts.set(i.DistrictID, i))
    }
  }

})

watch(() => props.form?.district?.DistrictID, async () => {
  if (props.form?.district?.DistrictID !== 0) {
    const wards = await getWard(props.form?.district?.DistrictID);
    listWards.value = wards
    if (wards) {
      wards.map((i: GHNWard) => mapWards.set(i.WardCode, i))
    }
  }

});

</script>