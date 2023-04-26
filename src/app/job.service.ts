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

  getJob(id: string): Observable<Job> {
    const job = this.jobs.find(j => j.id.toString() === id);
    console.log(id, job, this.jobs)
    if (!job) {
      return throwError(`Job with id ${id} not found`);
    }
    return of(job);
  }
}
