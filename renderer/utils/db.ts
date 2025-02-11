// renderer/utils/db.ts
import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Video } from "../components/types";

// Save a review (in a top-level "reviews" collection)
export const saveReview = async (reviewData: any) => {
  try {
    await addDoc(collection(db, "reviews"), reviewData);
    console.log("Review saved successfully");
  } catch (error) {
    console.error("Error saving review:", error);
  }
};

// Get all reviews
export const getReviews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// Add a reply to an existing review
export const addReply = async (reviewId: string, replyData: any) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, {
      replies: arrayUnion(replyData)
    });
    console.log("Reply added successfully");
  } catch (error) {
    console.error("Error adding reply:", error);
  }
};

// Get uploaded videos (movies) from the "videos" collection
export const getVideos = async (): Promise<Video[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "videos"));
    // Cast the resulting array to Video[]
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Video[];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const saveVideo = async (videoData: any): Promise<void> => {
  try {
    await addDoc(collection(db, "videos"), videoData);
    console.log("Video saved successfully to Firestore");
  } catch (error) {
    console.error("Error saving video:", error);
  }
};
