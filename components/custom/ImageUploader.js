"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(new Set()); // Store uploaded images
  const [isUploaded, setIsUploaded] = useState(false); // Track upload status
  const router = useRouter();

  // 📌 Handle File Selection & Show Preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileHash = `${file.name}-${file.size}`;

      // Prevent selecting an already uploaded image
      if (uploadedImages.has(fileHash)) {
        alert("This image has already been uploaded!");
        setIsUploaded(true);
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
      setIsUploaded(false); // Reactivate upload button for new image
    }
  };

  // 📌 Handle Image Upload to Cloudinary
  const handleUpload = async () => {
    if (!image || isUploaded) return; // Prevent duplicate uploads

    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "centre"); // 🛑 Replace with your Cloudinary upload preset

    try {
      const response = await fetch(process.env.CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      //   console.log("Cloudinary Image URL:", data.secure_url);
      localStorage.setItem("imageUrl", data.secure_url);

      // Add uploaded image to the Set to prevent reupload
      setUploadedImages((prev) =>
        new Set(prev).add(`${image.name}-${image.size}`)
      );

      // alert("Image uploaded successfully!");
      router.push("/admin/members");
      setIsUploaded(true); // Disable upload button after successful upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover border"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !image || isUploaded} // Disable button after upload
        className={`px-4 py-2 rounded ${
          uploading || isUploaded
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        {uploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload"}
      </button>
    </div>
  );
}
