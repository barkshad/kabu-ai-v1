import { supabase } from '../../lib/supabase';

// Helper to determine the path: users/{userId}/files/{fileName}
const getFilePath = (userId: string, fileName: string) => {
  return `users/${userId}/files/${fileName}`;
};

const BUCKET_NAME = 'user-files'; // Default bucket name, assume configured in Supabase

export const SupabaseStorage = {
  /**
   * Uploads a file to Supabase Storage
   * @param file The file object to upload
   * @param userId The ID of the logged-in user
   * @param fileName Optional custom file name, defaults to the original file name
   */
  async uploadFile(file: File, userId: string, fileName?: string): Promise<{ path: string, url: string }> {
    const targetName = fileName || `${Date.now()}_${file.name}`;
    const filePath = getFilePath(userId, targetName);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    const url = this.getPublicUrl(data.path);
    return { path: data.path, url };
  },

  /**
   * Deletes a file from Supabase Storage
   * @param path The full storage path of the file (e.g., users/123/files/doc.pdf)
   */
  async deleteFile(path: string): Promise<void> {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  },

  /**
   * Retrieves the public URL for a given file path
   * @param path The full storage path of the file
   */
  getPublicUrl(path: string): string {
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  /**
   * Lists all files for a specific user
   * @param userId The ID of the logged-in user
   */
  async listUserFiles(userId: string): Promise<any[]> {
    // Note: Supabase storage list uses folder path
    const folderPath = `users/${userId}/files`;
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath);

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }

    return data || [];
  }
};
