import React from 'react';

export interface ColumnDef<T> {
  key: string;
  header: string;
  isNumeric?: boolean;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyField: keyof T;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  pageSize?: number;
  currentPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  className?: string;
}
