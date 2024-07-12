import { storage } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadProfilePicture = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `profilePictures/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};

export default uploadProfilePicture;
