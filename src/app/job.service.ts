import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Job } from './models/job';

interface JobResponse {
  data: Job[];
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobs: Job[] = [];

  constructor() { }

  getJobs(): Observable<Job[]> {
    return of(this.jobs);
  }

}
