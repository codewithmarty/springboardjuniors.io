export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string
  salary: string
  recruiter: {
    name: string
    email: string
    phone: string
  }
}
