<template>
  <div class="mt-20 w-full space-y-4 border border-red-600">
    <div class="grid grid-cols-2 items-start gap-3 w-full">
      <div class="space-y-2">
        <Label for="province">Province</Label>
        <Select
            id="province"
            @update:modelValue=" (v) => currySelected('province',v,'number', mapProvince, 'ProvinceID','ProvinceName')"
        >
          <SelectTrigger >
            <SelectValue placeholder="enter"/>
          </SelectTrigger>
          <SelectContent side="bottom">
            <template v-for="i in listProvince" v-if="listProvince" :key="i.ProvinceID">
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
            id="district"
            @update:modelValue=" (v) => currySelected('district',v,'number', mapDistricts, 'DistrictID','DistrictName')"
        >
          <SelectTrigger >
            <SelectValue placeholder="enter"/>
          </SelectTrigger>
          <SelectContent side="bottom">
            <template v-for="i in listDistricts" v-if="listDistricts" :key="i.DistrictID">
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
          id="ward"
          @update:modelValue=" (v) => currySelected('ward',v,'string', mapWards, 'WardCode','WardName')"
      >
        <SelectTrigger >
          <SelectValue placeholder="enter"/>
        </SelectTrigger>
        <SelectContent side="bottom">
          <template v-for="i in listWards" v-if="listWards" :key="i.WardCode">
            <SelectItem :value="i.WardCode.toString()">
              {{ i.WardName }}
            </SelectItem>
          </template>
        </SelectContent>
      </Select>
    </div>

    <div class=" gap-2">
      <Label for="address">Address</Label>
      <Textarea id="address" v-model="provinceModel.address" placeholder="Type your exactly address." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {onMounted, reactive, ref, watch} from "vue";
import {GHNDistrict, GHNProvince, GHNWard, IUserLocation} from "@/types/user.ts";
import {getDistrict, getProvince, getWard} from "@/third_party_service/location.ts";


const provinceModel = ref<IUserLocation>({
  province: {code: 0, name: ''},
  district: {code: 0, name: ''},
  ward: {code: 0, name: ''},
  address: ""
});

const listProvince = ref<GHNProvince[] | null | undefined>(null)
const mapProvince = reactive<any>(new Map());

const listDistricts = ref<GHNDistrict[] | null | undefined>(null)
const mapDistricts = reactive<any>(new Map());

const listWards = ref<GHNWard[] | null | undefined>(null)
const mapWards = reactive(new Map());


const currySelected = (
    modelName: keyof IUserLocation,
    selectedId: string | number,
    selectedIdType: 'string' | 'number',
    listMapName: Map<string | number, any>,
    codeField: any,
    nameField: any
) => {
  const select = selectedIdType === 'number' ? listMapName.get(Number(selectedId)) : listMapName.get(String(selectedId));
  if (select) {
    //@ts-ignore
    provinceModel.value[modelName]['code'] = select[codeField];
    //@ts-ignore
    provinceModel.value[modelName]['name'] = select[nameField];
  }
};


onMounted(async () => {
  const province = await getProvince() as any;
  listProvince.value = province;
  if (province) {
    province.map((i: GHNProvince) => mapProvince.set(i.ProvinceID, i))
  }
})


watch(() => provinceModel.value.province.code, async () => {
  if (provinceModel.value.province.code !== 0) {
    const districts = await getDistrict(provinceModel.value.province.code);
    listDistricts.value = districts
    if (districts) {
      districts.map((i: GHNDistrict) => mapDistricts.set(i.DistrictID, i))
    }
  }

})

watch(() => provinceModel.value.district.code, async () => {
  if (provinceModel.value.district.code !== 0) {
    const wards = await getWard(provinceModel.value.district.code);
    listWards.value = wards
    if (wards) {
      wards.map((i: GHNWard) => mapWards.set(i.WardCode, i))
    }
  }

})
</script>