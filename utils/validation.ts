export function validateVideoUpload(title: string, videoFile: File | null): string | null {
    if (!title.trim()) return "Title is required.";
    if (!videoFile || !videoFile.type.startsWith("video/")) return "Only video files are allowed.";
    return null;
  }
  