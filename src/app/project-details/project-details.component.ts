import { Component } from '@angular/core';
import { Job } from '../models/job';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JobApplication } from '../models/jobapplication';

import { User } from '../models/user';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';

interface JobResponse {
  data: Job;
}

interface JobApplicationResponse {
  data: JobApplication;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})

export class ProjectDetailsComponent {
  job: Job | null = null;
  user: any;
  jobApplication =  {
    portfolio_link: '',
    github_link: '',
    deployed_link: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private appComponent: AppComponent,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.appComponent.grabUser()
    this.authService.getUser().subscribe((user: User) => {
      this.user = user;
    }); 
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.http.get<JobResponse>(`http://localhost:8000/${id}`).subscribe(resp => {
        this.job = resp.data
      })
      if (this.appComponent.user) this.http.get<JobApplicationResponse>(`http://localhost:8000/${this.appComponent.user.id}/get_applications/${id}/`).subscribe(resp => {
        if (resp.data) {
          this.jobApplication.deployed_link = resp.data.deployed_link
          this.jobApplication.github_link = resp.data.github_link
          this.jobApplication.portfolio_link = resp.data.portfolio_link
        }
      })
    })
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('portfolio_link', this.jobApplication.portfolio_link);
    formData.append('github_link', this.jobApplication.github_link);
    formData.append('deployed_link', this.jobApplication.deployed_link);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.http.post<JobApplicationResponse>(`http://localhost:8000/${this.appComponent.user.id}/apply/${id}/`, formData).subscribe(resp => {
        console.log(resp.data)
      })
    })

  }

}
