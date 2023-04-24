import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Job } from './models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobs: Job[] = [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Acme Corp',
      location: 'San Francisco, CA',
      description: 'We are seeking an experienced software engineer to join our team...',
      requirements: 'Bachelor\'s degree in Computer Science, 5+ years of experience...',
      salary: '$150,000 - $200,000',
      recruiter: {
        name: 'Martha Taylor',
        email: 'marthataylor@gmail.com',
        phone: '4039723922'
      }
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Big Co',
      location: 'New York, NY',
      description: 'We are seeking a talented product manager to help us build the future...',
      requirements: 'Bachelor\'s degree in Business, 7+ years of experience...',
      salary: '$120,000 - $150,000',
      recruiter: {
        name: 'Jack Marshall',
        email: 'jackmarshall@gmail.com',
        phone: '4039724922'
      }
    },
    {
      id: '3',
      title: 'Marketing Manager',
      company: 'Small Co',
      location: 'Seattle, WA',
      description: 'We are seeking a creative and data-driven marketing manager to help us...',
      requirements: 'Bachelor\'s degree in Marketing, 3+ years of experience...',
      salary: '$80,000 - $100,000',
      recruiter: {
        name: 'Christopher Fernandes',
        email: 'fernandeschris@protonmail.com',
        phone: '4039725922'
      }
    }
  ];

  constructor() { }

  getJobs(): Observable<Job[]> {
    return of(this.jobs);
  }

  getJob(id: string): Observable<Job> {
    const job = this.jobs.find(j => j.id === id);
    if (!job) {
      return throwError(`Job with id ${id} not found`);
    }
    return of(job);
  }
}
