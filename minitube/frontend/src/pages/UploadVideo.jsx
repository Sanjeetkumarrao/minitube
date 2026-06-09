import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publishVideo } from "../services/video.service.js";
import { HiUpload, HiVideoCamera, HiPhotograph } from "react-icons/hi";
import toast from "react-hot-toast";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return toast.error("Please select a video file");
    if (!thumbnail) return toast.error("Please select a thumbnail");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await publishVideo(formData);
      toast.success("Video uploaded successfully!");
      navigate(`/watch/${res.data.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video File */}
        <div className="border-2 border-dashed border-dark-border rounded-xl p-8 text-center hover:border-primary transition-colors">
          {videoFile ? (
            <div className="space-y-2">
              <HiVideoCamera className="w-12 h-12 text-primary mx-auto" />
              <p className="font-medium">{videoFile.name}</p>
              <p className="text-dark-muted text-sm">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              <button
                type="button"
                onClick={() => setVideoFile(null)}
                className="text-red-400 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <HiUpload className="w-12 h-12 text-dark-muted mx-auto mb-3" />
              <p className="font-medium mb-1">Click to upload video</p>
              <p className="text-dark-muted text-sm">MP4, MOV, AVI up to 100MB</p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </label>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail *</label>
          <div className="flex gap-4 items-start">
            <label className="cursor-pointer flex-shrink-0">
              <div className="w-40 aspect-video rounded-lg bg-dark-card border border-dark-border overflow-hidden flex items-center justify-center hover:border-primary transition-colors">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-3">
                    <HiPhotograph className="w-8 h-8 text-dark-muted mx-auto mb-1" />
                    <p className="text-xs text-dark-muted">Upload thumbnail</p>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleThumbnail} />
            </label>
            <p className="text-dark-muted text-sm mt-2">
              Upload a thumbnail that stands out and draws viewers' attention. Recommended: 1280x720px (16:9)
            </p>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Add a title that describes your video"
            required
            maxLength={100}
            className="input"
          />
          <p className="text-dark-muted text-xs mt-1 text-right">{form.title.length}/100</p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell viewers about your video"
            required
            rows={5}
            className="input resize-none"
          />
        </div>

        {/* Loading bar */}
        {loading && (
          <div className="w-full bg-dark-border rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse w-full" />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Uploading..." : "Publish Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
