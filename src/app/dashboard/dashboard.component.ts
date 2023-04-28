import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Job } from '../models/job';

interface JobResponse {
  data: Job[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  

  jobsApplied: Job[] = [];

  jobsCreated: Job[] = [];

  profile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'San Francisco, CA'
  };

  constructor(
    private authService: AuthService, 
    private http: HttpClient
    ) { }

  user: any;

  selectedJobId: number | null = null;

  ngOnInit(): void {
    this.authService.getUser().subscribe(resp => {
      this.user = resp;
      this.getJobsCreated()
      this.getJobsApplied()
    });
  }

  getJobsCreated() {
    if (this.user) this.http.get<JobResponse>(`http://localhost:8000/${this.user.id}/my_created_jobs/`).subscribe(resp => {
      this.jobsCreated = resp.data
    },
    error => console.log(error)
    )
  }

  getJobsApplied() {
    if (this.user) this.http.get<JobResponse>(`http://localhost:8000/${this.user.id}/my_applied_jobs/`).subscribe(resp => {
      this.jobsApplied = resp.data
    },
    error => console.log(error)
    )
  }

  toggleButton(incomingId: number) {
    if (incomingId === this.selectedJobId) {
      this.selectedJobId = null;
    } else {
      this.selectedJobId = incomingId;
    }
  }

  isDeleteButtonVisible(jobId: number): boolean {
    return this.selectedJobId === jobId;
  }

  deleteJob(jobId: number) {
    this.http.get<any>(`http://localhost:8000/${this.user.id}/${jobId}/delete/`).subscribe(resp => {
      this.getJobsCreated()
      this.getJobsApplied()
    })
  }

}
