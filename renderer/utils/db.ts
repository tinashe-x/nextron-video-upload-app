import { db } from "./firebase";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";
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
    // Make sure the replyData includes a unique id.
    if (!replyData.id) {
      replyData.id = new Date().getTime().toString(); // simple unique id based on timestamp
    }
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

// EDIT A REVIEW: Update review text and rating (if needed)
export const editReview = async (reviewId: string, updatedData: any): Promise<void> => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, updatedData);
    console.log("Review updated successfully");
  } catch (error) {
    console.error("Error updating review:", error);
  }
};

// DELETE A REVIEW: Remove the entire review document
export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "reviews", reviewId));
    console.log("Review deleted successfully");
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

// EDIT A REPLY: Because replies are stored in an array, we need to fetch the review,
// modify the replies array, and update it.
export const editReply = async (
  reviewId: string,
  replyId: string,
  newText: string
): Promise<void> => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const reviewSnapshot = await getDoc(reviewRef);
    if (reviewSnapshot.exists()) {
      const data = reviewSnapshot.data();
      const replies = data.replies || [];
      const updatedReplies = replies.map((reply: any) =>
        reply.id === replyId ? { ...reply, text: newText, editedAt: new Date().toISOString() } : reply
      );
      await updateDoc(reviewRef, { replies: updatedReplies });
      console.log("Reply updated successfully");
    }
  } catch (error) {
    console.error("Error editing reply:", error);
  }
};

// DELETE A REPLY: Remove a reply from the replies array
export const deleteReply = async (
  reviewId: string,
  replyId: string
): Promise<void> => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const reviewSnapshot = await getDoc(reviewRef);
    if (reviewSnapshot.exists()) {
      const data = reviewSnapshot.data();
      const replies = data.replies || [];
      const updatedReplies = replies.filter((reply: any) => reply.id !== replyId);
      await updateDoc(reviewRef, { replies: updatedReplies });
      console.log("Reply deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting reply:", error);
  }
};
