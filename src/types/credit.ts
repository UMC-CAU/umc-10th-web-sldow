export type Cast = {
  id: number
  name: string
  character: string
  profile_path: string
}

export type Crew = {
  id: number
  name: string
  job: string
  profile_path: string
}

export type Credits = {
  cast: Cast[]
  crew: Crew[]
}