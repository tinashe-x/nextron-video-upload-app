import React, { useState } from "react";
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
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const handleVideoUpload = (event) => {
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

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        gap={2} 
        padding={4}
      >
        <Typography variant="h4" gutterBottom>
          Upload Your Video
        </Typography>

        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <TextareaAutosize
          minRows={3}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "96%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="entertainment">Entertainment</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" component="label" fullWidth>
          Upload Video
          <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
        </Button>
        {duration && <Typography>Duration: {duration}</Typography>}

        <Button variant="outlined" component="label" fullWidth>
          Upload Thumbnail
          <input type="file" hidden accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
        </Button>

        <FormControlLabel
          control={<Checkbox checked={isPublic} onChange={() => setIsPublic(!isPublic)} />}
          label="Public"
        />

        <Button variant="contained" color="primary" disabled={!title || !videoFile} fullWidth>
          Upload
        </Button>
      </Box>
    </Container>
  );
}
