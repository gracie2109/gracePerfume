import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { useCollection, useDocument, useFirestore } from "vuefire";
import { checkItemExistence } from "@/lib/utils";
import { toast } from "vue-sonner";

export type IPermissionsHandle = {
  name: string;
  methods: string[];
};

export type IPermissions = {
  name: string;
  methods: string[];
  id: string;
};

export const usePermissionStore = defineStore("permission", () => {
  const db = useFirestore();
  const loading: Ref<boolean> = ref(false);
  const errors: Ref<{ message: String; code: String }> = ref({
    message: "",
    code: "",
  });
  const permissions = useCollection(collection(db, "permissions"));
  const detailPermission: Ref<any | undefined> = ref(undefined);



  function modifyData(values: IPermissionsHandle) {
    const result: string[] = [];
    const { name, methods } = values;
    if (name && methods) {
      for (const method of methods) {
        result.push(`PERMISSION.${name.toUpperCase()}.${method.toUpperCase()}`);
      }
    }
    return result;
  }

  const createNewPermission = async (value: IPermissionsHandle) => {
    try {
      loading.value = true;
      const exist = await checkItemExistence(
        "permissions",
        "indentity",
        value.name.toUpperCase()
      );

      if (!exist) {
        const newData = modifyData(value);
        await Promise.all(
          newData.map(async (i) => {
            await addDoc(collection(db, "permissions"), {
              name: i,
              indentity: i.split(".")[1],
              method: i.split(".").at(-1),
            });
          })
        );
        toast.success("Permission has been created");
      } else {
        toast.error("Item is already exist");
      }
    } catch (error) {
      console.log("error", error);
      errors.value.message = "Failed to create permission";
      toast.error("Failed to create permission");
    } finally {
      loading.value = false;
    }
  };

  const deletePermissions = async (id: string) => {
    try {
      loading.value = true;

      await deleteDoc(doc(db, "permissions", id)).then(() =>
        toast.success("Delete success")
      );
    } catch (e) {
      console.log("error", e);
    } finally {
      loading.value = false;
    }
  };

  const getDetailPermission = async (id: string) => {
    try {
      loading.value = true;
      const brandDoc = await doc(getFirestore(), "permissions", id);      
      const detail = await useDocument(brandDoc);
      detailPermission.value = detail
    } catch (err) {
      console.log("err",err);
    } finally {
      loading.value = false;
    }
  };

  return {
    permissions,
    loading,
    detailPermission,
    createNewPermission,
    modifyData,
    deletePermissions,
    getDetailPermission,
  };
});
