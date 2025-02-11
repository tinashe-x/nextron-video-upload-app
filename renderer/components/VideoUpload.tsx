// renderer/components/VideoUpload.tsx
import React, { useState } from "react";
import { saveVideo } from "../utils/db";
import {
  Button,
  Container,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";

export default function VideoUpload() {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailDataURL, setThumbnailDataURL] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  // Handle Thumbnail Upload: Convert file to Data URL for Firestore storage
  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      const previewURL = URL.createObjectURL(file);
      setThumbnailPreview(previewURL);

      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailDataURL(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Error converting thumbnail to Data URL:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Video Upload: Extract video duration
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        setDuration(`${Math.floor(videoElement.duration)} sec`);
      };
    }
  };

  // Save Video to Firestore (thumbnail stored as Data URL)
  const handleSaveVideo = async () => {
    if (!title || !videoFile || !thumbnail || !thumbnailDataURL) {
      alert("Title, Thumbnail, and Video are required!");
      return;
    }

    const videoData = {
      title,
      description,
      category,
      duration,
      isPublic,
      videoFile: videoFile.name,
      thumbnail: thumbnailDataURL, // Data URL string
    };

    await saveVideo(videoData);
    alert("Video saved successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} padding={4}>
        <Typography variant="h4" gutterBottom>
          Upload Your Video
        </Typography>

        {/* Thumbnail Upload (First Input) */}
        <Button variant="outlined" component="label" fullWidth>
          Upload Thumbnail
          <input type="file" hidden accept="image/*" onChange={handleThumbnailUpload} />
        </Button>

        {/* Thumbnail Preview */}
        {thumbnailPreview && (
          <Box mt={2}>
            <Typography variant="subtitle1">Thumbnail Preview:</Typography>
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{ width: "100%", maxWidth: "200px", borderRadius: "8px", marginTop: "8px" }}
            />
          </Box>
        )}

        {/* Title Input */}
        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        {/* Description Input */}
        <TextareaAutosize
          minRows={3}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "96%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" }}
        />

        {/* Category Dropdown */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
          </Select>
        </FormControl>

        {/* Video Upload */}
        <Button variant="contained" component="label" fullWidth>
          Upload Video
          <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
        </Button>
        {videoFile && <Typography>Selected Video: {videoFile.name}</Typography>}
        {duration && <Typography>Duration: {duration}</Typography>}

        {/* Public Checkbox */}
        <FormControlLabel
          control={<Checkbox checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
          label="Public"
        />

        {/* Save Button */}
        <Button variant="contained" color="primary" fullWidth onClick={handleSaveVideo}>
          Save Video
        </Button>
      </Box>
    </Container>
  );
}
