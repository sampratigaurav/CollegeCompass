import { NextResponse } from "next/server";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export function successResponse<T>(
  data: T,
  options?: { pagination?: PaginationMeta; status?: number }
) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(options?.pagination ? { pagination: options.pagination } : {}),
    },
    { status: options?.status ?? 200 }
  );
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

export function validationError(errors: Record<string, string[]>) {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      details: errors,
    },
    { status: 422 }
  );
}
