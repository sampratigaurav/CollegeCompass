export type CollegeType = "GOVERNMENT" | "PRIVATE" | "DEEMED" | "AUTONOMOUS";

export interface CollegeCard {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  city: string;
  fees_min: number;
  fees_max: number;
  rating: number;
  nirf_rank: number | null;
  placement_percentage: number;
  avg_salary: number | null;
  image_url: string | null;
  type: CollegeType;
  accreditation: string | null;
  exam: string[];
  established: number | null;
  tags: string[];
  best_for: string[];
  ai_summary: string | null;
  _count: { reviews: number; courses: number };
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats: number | null;
  collegeId: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  batch: string | null;
  verified: boolean;
  collegeId: string;
  createdAt: string;
}

export interface CollegeDetail extends CollegeCard {
  description: string;
  website: string | null;
  min_rank: number | null;
  max_rank: number | null;
  courses: Course[];
  reviews: Review[];
}

export type AdmissionChance = "High" | "Medium" | "Low";

export interface PredictedCollege extends CollegeCard {
  min_rank: number | null;
  max_rank: number | null;
  chance: AdmissionChance;
  match_score: number;
  courses?: Array<{ name: string; fees: number; duration: string }>;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type SortOption =
  | "nirf_rank"
  | "rating"
  | "fees_min"
  | "placement_percentage"
  | "name";
