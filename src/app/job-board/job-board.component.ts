import { Component } from '@angular/core';

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
}

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.component.html',
  styleUrls: ['./job-board.component.css']
})
export class JobBoardComponent {
  jobs: Job[] = [
    {
      title: 'Software Engineer',
      company: 'Acme Corp',
      location: 'San Francisco, CA',
      description: 'We are seeking an experienced software engineer to join our team...',
      requirements: 'Bachelor\'s degree in Computer Science, 5+ years of experience...',
      salary: '$150,000 - $200,000'
    },
    {
      title: 'Product Manager',
      company: 'Big Co',
      location: 'New York, NY',
      description: 'We are seeking a talented product manager to help us build the future...',
      requirements: 'Bachelor\'s degree in Business, 7+ years of experience...',
      salary: '$120,000 - $150,000'
    },
    {
      title: 'Marketing Manager',
      company: 'Small Co',
      location: 'Seattle, WA',
      description: 'We are seeking a creative and data-driven marketing manager to help us...',
      requirements: 'Bachelor\'s degree in Marketing, 3+ years of experience...',
      salary: '$80,000 - $100,000'
    }
  ];
}
