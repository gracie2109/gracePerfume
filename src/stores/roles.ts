import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import {collection, addDoc, doc, getDoc, deleteDoc} from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { checkItemExistence } from "@/lib/utils";
import { toast } from "vue-sonner";
import { IPermissions } from "./permissions";

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
  const roles:Ref<any | null>= ref(null)

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


  const fetchPermissionsDetail = async () => {
    const rolesData = await useCollection(collection(db, "roles"));
    let permissionsDetail:any = []
    for (let role of rolesData.value) {

      for (let permissionId of role.permissions) {
        const docRef = await doc(db, 'permissions', permissionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          permissionsDetail.push({ ...role, permission:[{...docSnap.data()}] });
        } else {
          console.log('No such document!');
        }
      }

    }
    roles.value= permissionsDetail
  };
  const fetchPermissionsDetail2 = async () => {
    const rolesDataSnapshot = await useCollection(collection(db, "roles"));
      const rolesData:any= []
    for (let role of rolesDataSnapshot.value) {

      for (let permissionId of role.permissions) {
        const docRef = doc(db, 'permissions', permissionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          rolesData.push({ id: permissionId, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      }
    }

    roles.value = rolesData;
  };

  const deleteRole = async(id: string) => {
    try {
      loading.value = true;
        await deleteDoc(doc(db, 'roles', id))
            .then(() => toast.success('Delete success'))
    } catch (e) {
      console.log("error", e);
    } finally {
      loading.value = false;
    }
  }
  return { deleteRole,createRole, fetchPermissionsDetail, fetchPermissionsDetail2,loading, errors, endTask, roles };
});
