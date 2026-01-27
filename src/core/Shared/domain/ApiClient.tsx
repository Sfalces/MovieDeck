type Headers =
  | {
      'Content-Type': 'application/x-www-form-urlencoded'
      Authorization: string
      'X-acf-sensor-data': string
    }
  | Record<string, string>

type Config = { headers?: Headers; signal?: AbortSignal }

export interface ApiClient {
  get: <T>(endpoint: string, config?: Config) => Promise<{ data: T; status: number }>
}
