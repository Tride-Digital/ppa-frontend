// Shared types for director-related services

export interface DirectorListDescription {
  objective?: string | null
  scope?: string[] | null
  deliverables?: string[] | null
  key_kpis?: string[] | null
  expert_composition?: string[] | null
  duration?: string | null
  availability?: string | null
  coverage?: string | null
  support_doc_url?: string | null
}

export interface DirectorListDetail {
  id: number
  name: string
  service_category?: string | null
  img_url?: string | null
  icon_font?: string | null
  short_description?: string | null
  description?: DirectorListDescription | null
}
