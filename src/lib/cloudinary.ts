import { v2 as cloudinary } from "cloudinary";

const isConfigured = import.meta.env.CLOUDINARY_CLOUD_NAME && import.meta.env.CLOUDINARY_API_KEY && import.meta.env.CLOUDINARY_API_SECRET;

if (isConfigured) {
  cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export { cloudinary };

export async function uploadImage(file: File, folder = "pom-penthouse") {
  if (!isConfigured) throw new Error("Cloudinary not configured — add CLOUDINARY_* env vars");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result!.secure_url, public_id: result!.public_id });
      },
    );
    stream.end(buffer);
  });
}

export async function deleteImage(publicId: string) {
  if (!isConfigured) throw new Error("Cloudinary not configured");
  return cloudinary.uploader.destroy(publicId);
}
