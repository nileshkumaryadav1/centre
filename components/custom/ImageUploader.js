"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(new Set());
  const [isUploaded, setIsUploaded] = useState(false);
  const router = useRouter();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileHash = `${file.name}-${file.size}`;
      if (uploadedImages.has(fileHash)) {
        alert("This image has already been uploaded!");
        setIsUploaded(true);
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!image || isUploaded) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "centre");

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      localStorage.setItem("imageUrl", data.secure_url);

      setUploadedImages((prev) => new Set(prev).add(`${image.name}-${image.size}`));
      setIsUploaded(true);
      router.push("/admin/members");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="flex flex-col items-center gap-6 p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-center">Upload Your Profile Photo</h2>

      <div className="w-full p-5 bg-gray-100 border rounded-lg flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded bg-white shadow-sm"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover border rounded-full shadow-md"
          />
        )}

        <button
          onClick={handleUpload}
          disabled={uploading || !image || isUploaded}
          className={`w-full py-2 rounded font-medium transition ${
            uploading || isUploaded
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {uploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload"}
        </button>
      </div>

      {/* 📝 Suggestions for Good Profile Pictures */}
      <div className="w-full p-4 bg-white border rounded-lg shadow-sm text-sm">
        <h3 className="font-semibold mb-2 text-gray-800">📸 Tips for a Great Profile Picture:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Use a clear, high-resolution image.</li>
          <li>Face the camera directly and smile naturally.</li>
          <li>Avoid heavy filters or distracting backgrounds.</li>
          <li>Use a plain or light background for best visibility.</li>
          <li>Make sure your face is centered and well-lit.</li>
        </ul>
      </div>
    </section>
  );
}
