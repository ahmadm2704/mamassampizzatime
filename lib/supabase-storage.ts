export async function uploadImage(file: File, bucket = 'gallery'): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
