import * as ffmpeg from 'fluent-ffmpeg';
import { basename, dirname } from 'path';

// Function to capture the first frame of a video
export async function captureFirstFrame(
  videoPath: string,
  outputImagePath: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: [0], // Capture the first frame
        filename: basename(outputImagePath), // Output filename
        folder: dirname(outputImagePath), // Output directory
      })
      .on('end', () => {
        console.log(`First frame captured at ${outputImagePath}`);
        resolve(outputImagePath);
      })
      .on('error', (err: Error) => {
        console.error('Error capturing the first frame:', err);
        reject(err);
      });
  });
}

// // Usage example
// const videoPath = 'path/to/video.mp4';
// const outputImagePath = 'path/to/output/first_frame.jpg';

// captureFirstFrame(videoPath, outputImagePath)
//     .then(() => console.log('Screenshot saved!'))
//     .catch(console.error);
