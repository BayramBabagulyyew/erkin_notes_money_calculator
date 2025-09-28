export class PaginationResponseDto<T> {
  currentPage: number;

  skippedRecords: number | null;

  totalPages: number;

  hasNext: boolean;

  content: T[];

  payloadSize: number;

  totalRecords: number;
}
