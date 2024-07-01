import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { collection, addDoc } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { checkItemExistence } from "@/lib/utils";
import { toast } from "vue-sonner";
import { IPermissions } from "./permissions";
import { permission } from "process";
import { Database } from "firebase/database";

export type IRoles = {
  name: string;
  permissions: IPermissions[];
};

export const useRoles = defineStore("role", () => {
  const db = useFirestore();
  const loading: Ref<boolean> = ref(false);
  const errors: Ref<{ message: String; code: String }> = ref({
    message: "",
    code: "",
  });

  const endTask: Ref<boolean> = ref(false);
  const roles = useCollection(collection(db, "roles"));

  const createRole = async (value: IRoles) => {
    try {
      loading.value = true;
      const exist = await checkItemExistence("roles", "name", value.name);
      if (!exist) {
        await addDoc(collection(db, "roles"), {
          name: value.name,
          permissions: value.permissions.map((i) => i.id),
        });
        toast.success("roles has been created");
      } else {
        toast.error("Item is already exist");
      }
      endTask.value = true;
    } catch (error) {
      console.log("error", error);
      errors.value.message = "Failed to add new role";
      toast.error("Failed to add new role");
      endTask.value = true;
    } finally {
      loading.value = false;
      endTask.value = true;
    }
  };

  function getAllRoles() {
    const permissions = useCollection(collection(db, "permissions"));
    const roleRef = useCollection(collection(db, "roles"));

    console.log("dalll", permissions.value);
    roles.value = [];
  }

  return { createRole, getAllRoles, loading, errors, endTask, roles };
});
