export interface Job {
  id: number
  title: string
  company: string
  location: string
  description: string
  requirements: string
  salary: string
  challenge: string
  recruiter: {
    id: number
    last_login: string
    username: string
    first_name: string
    last_name: string
    email: string
    is_active: boolean
    date_joined: string
  }
}

