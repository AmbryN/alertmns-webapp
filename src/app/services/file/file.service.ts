import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FileFormat } from '../../models/FileFormat';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  downloadFile(
    channelId: number,
    format: FileFormat
  ): Observable<HttpResponse<Blob>> {
    return this.http
      .get<HttpResponse<Blob>>(
        environment.serverUrl + `/export/${channelId}?format=${format}`,
        {
          observe: 'response',
          responseType: 'arraybuffer' as 'json',
        }
      )
      .pipe(
        map((response: any) => {
          const contentDisposition: string = response.headers.get(
            'content-disposition'
          );
          const filename = contentDisposition.substring(21);
          const file = new File([response.body], filename, {
            type: response.body.type,
          });

          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(file);
          downloadLink.download = filename;
          downloadLink.click();

          return response;
        })
      );
  }
}
