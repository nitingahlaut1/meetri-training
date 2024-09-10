import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs'; // For file system operations
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class UploadService {
  private readonly uploadPath = './uploads';

  async saveImage(image: Express.Multer.File) {
    const imagePath = path.join(
      this.uploadPath,
      `${Date.now()}_${image.originalname}`,
    );
    await fs.mkdir(this.uploadPath, { recursive: true }); // Ensure the upload directory exists
    const img = await fs.writeFile(imagePath, image.buffer);
    // console.log(img);

    return {
      message: 'Image uploaded successfully',
      path: imagePath,
    };
  }
}
