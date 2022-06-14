import {
    HttpClient,
    HttpEvent,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


/** Тип возвращаемый с сервера */
export interface UploadedFileDTO {
    id: string;
    name: string;
    size: number;
    type: string;
    ttl: number;
    create_at: number;
    mustDelete: number;
}

/** Значение требуемое для прогресс бара */
export interface LoadedValue {
    done: boolean;
    type?: 0 | 1 | 2 | 3;
    loaded?: number;
    total?: number;
    name: string;
    id: number;
}

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {

    private process: LoadedValue[] = [];
    fileInProcess = new BehaviorSubject<LoadedValue[]>([]); 

 
    private host = environment.host;
    constructor(
        private http: HttpClient,
    ) { }

    uploadFile(customDescriptionFile: FileList): Observable<UploadedFileDTO[]> {

        if (!customDescriptionFile?.length) NEVER;
 
        let fd = this.createFormData(customDescriptionFile); 
        const count = customDescriptionFile.length;
        const process = this.createProcess(count);
        this.fileInProcess.next(this.process);
        return this.http
            .request<UploadedFileDTO[]>(this.createRequest(fd))
            .pipe(
                switchMap((value: HttpEvent<any>) => {
                    if (value instanceof HttpResponse) return of(value.body as UploadedFileDTO[]);
                    return this.updateProcessState(value, process);
                }),
                tap({
                    error: (e) => {
                        this.removeProcess(process.id);
                    },
                    complete: () => {
                        this.removeProcess(process.id);
                    },
                })
            );
    }
    private createFormData(customDescriptionFile: FileList) {
        let fd = new FormData();

        for (let i = 0; i < customDescriptionFile.length; i++) {
            let file = customDescriptionFile.item(i);
            if (file === null) continue;
            fd.append('file', file, file.name);
        }
        return fd;
    }

    private createRequest(fd: FormData) {
        return new HttpRequest('POST', `${this.host}/api/files`, fd, {
            reportProgress: true,
            responseType: 'json',
        });
    }

    private createProcess(countFiles: number) { 
        let id = Math.random();
        const process: LoadedValue = {
            id: id,
            done: false,
            name: `Загрузка ${countFiles} ${this.formatUnit(countFiles)}`,
        };
        this.addProcess(process);
        return process;
    }

    private formatUnit(n: number) {
        if(n === 1) return "файла"
        if(n%10 == 0) return  "файлов";
        if(n == 11) return  "файлов";
        if(n%10 - 1 == 0) return "файла";
        return "файлов";
    }

    private updateProcessState(value: HttpEvent<any>, process: LoadedValue) {
        switch (value.type) {
            case 1:
                if (process.done) {  
                    return throwError(() => new Error(process.name + ' отменено'));
                }
                if (value.total) {
                    process.total = value.total;
                    process.type = value.type;
                    process.loaded = value.loaded;
                }

                this.fileInProcess.next(this.process);
                return NEVER;
            case 0:
                process.type = value.type; 
                this.fileInProcess.next(this.process);
                return NEVER;
            case 3:
            default:
                return NEVER;
        }
    }

    private addProcess(pr: LoadedValue) {
        return this.process.push(pr);
    }

    private removeProcess(id: number) {
        let index = this.process.findIndex((r) => r.id === id);
        if (~index) {
            this.process.splice(index, 1); 
            this.fileInProcess.next(this.process);
        }
    }
    private getProcessById(id: number) {
        let index = this.process.findIndex((r) => r.id === id);
        if (~index) {
            return this.process[index];
        }
        return null;
    }

    deleteProcess(id: number) {
        let proc = this.getProcessById(id);
        if (!proc) return;
        proc.done = true; 
        this.fileInProcess.next(this.process);
    }
}