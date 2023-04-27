import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Job } from '../models/job';


interface JobResponse {
  data: any;
  job: Job;
}

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent {
  job = {
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    challenge: '',
  };

  constructor(
    private http: HttpClient, 
    private router: Router,
    private appComponent: AppComponent
    ) {}

  onSubmit() {

    const formData = new FormData();
    formData.append('title', this.job.title);
    formData.append('company', this.job.company);
    formData.append('location', this.job.location);
    formData.append('description', this.job.description);
    formData.append('requirements', this.job.requirements);
    formData.append('salary', this.job.salary);
    formData.append('challenge', this.job.challenge)

    this.http.post<JobResponse>(`http://localhost:8000/${this.appComponent.user.id}/create_job/`, formData).subscribe(
      response => {
        this.router.navigate(['/' + response.data.id]);
      },
      error => {
        console.error(error);
      }
    );
  }
}