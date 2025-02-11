// renderer/utils/db.ts
import { db, collection, addDoc, getDocs } from "./firebase";

// Save Video Data to Firestore (thumbnail is a Data URL)
export const saveVideo = async (videoData: any) => {
  try {
    await addDoc(collection(db, "videos"), videoData);
    console.log("Video saved successfully to Firestore");
  } catch (error) {
    console.error("Error saving video:", error);
  }
};

// Get All Videos from Firestore
export const getVideos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "videos"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
