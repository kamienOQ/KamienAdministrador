import { deleteObject, ref } from "firebase/storage";
import { FirebaseStorage } from "../firebase/config";

export const deleteFileUpload = (name) => {
  try {
    let fileRef = ref(FirebaseStorage, name);
    console.log(`Eliminó el archivo "${fileRef}"`);

    deleteObject(fileRef)
      .then(() => {
        console.log(`Eliminó el archivo "${fileRef}"`);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(`Error eliminando el archivo: "${fileRef}"`, error);
  }
};
