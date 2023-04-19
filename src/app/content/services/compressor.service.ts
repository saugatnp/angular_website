import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressService {

  constructor() { }

  compressImage(file: File, maxSize: number): Observable<File> {
    return new Observable((observer: Observer<File>) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx!.drawImage(img, 0, 0, img.width, img.height);
          canvas.toBlob((blob: Blob | null) => {
            if (blob) {
              if (blob.size > maxSize) {
                const newMaxSize = maxSize / (blob.size / file.size);
                this.compressImage(blob as File, newMaxSize)
                  .subscribe((compressedFile: File) => observer.next(compressedFile));
              } else {
                observer.next(blob as File);
              }
            } else {
              observer.error('Error compressing image.');
            }
          }, file.type, 0.7); // quality of 70%
        };
      };
    });
  }

}
