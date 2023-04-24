import { Component } from '@angular/core';
import { Job } from '../models/job';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { JobService } from '../job.service';

interface JobResponse {
  data: Job;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})

export class ProjectDetailsComponent {
  job: Job | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) this.jobService.getJob(id).subscribe(job => this.job = job);
        this.http.get<JobResponse>(`http://localhost:8000/${id}`).subscribe(resp => {
        console.log(resp.data)
        this.job = resp.data
      })
    })

  }
}
