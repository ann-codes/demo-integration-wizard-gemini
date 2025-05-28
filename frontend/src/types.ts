export type Topic = string;

export interface AnalyzeResponse {
  topics: Topic[];
}

export interface HubspotFieldsResponse {
  success: boolean;
  fields?: string[];
  error?: string;
}
