import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job';


interface JobResponse {
  data: Job[];
}

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})

export class JobBoardComponent {

  jobs: Job[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    ) {}
  
  ngOnInit(): void {
    this.http.get<JobResponse>('http://localhost:8000/').subscribe(resp => {
      this.jobs = resp.data
    })
  }

  goToJobDetails(id: string) {
    this.router.navigate(['/', id]);
  }

}
 