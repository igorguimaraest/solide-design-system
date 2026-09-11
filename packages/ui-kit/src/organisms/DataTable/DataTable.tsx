import React, { useState } from 'react';
import { DataTableProps, ColumnDef } from './DataTable.types';
import { Icon } from '../../atoms/Icon';

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  selectedIds = [],
  onSelectionChange,
  pageSize = 10,
  currentPage = 1,
  totalCount = 0,
  onPageChange,
  onPageSizeChange,
  onSort,
  className = '',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const allSelected = data.length > 0 && data.every(row => selectedIds.includes(String(row[keyField])));
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = data.map(r => String(r[keyField]));
      onSelectionChange?.([...new Set([...selectedIds, ...allRowIds])]);
    } else {
      const rowIdsSet = new Set(data.map(r => String(r[keyField])));
      onSelectionChange?.(selectedIds.filter(id => !rowIdsSet.has(id)));
    }
  };

  const handleSelectRow = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange?.([...selectedIds, id]);
    } else {
      onSelectionChange?.(selectedIds.filter(i => i !== id));
    }
  };

  const handleSort = (key: string) => {
    const nextDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDir(nextDir);
    onSort?.(key, nextDir);
  };

  const totalPages = Math.max(1, Math.ceil((totalCount || data.length) / pageSize));

  return (
    <div className={`w-full bg-solide-surface border border-solide-subtle rounded-[var(--sld-radius-lg,12px)] shadow-[var(--sld-shadow-xs)] flex flex-col font-ui ${className}`}>
      {/* Scrollable table container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[var(--solide-surface-sunken)] border-b border-solide-subtle text-xs font-semibold text-solide-secondary">
              {onSelectionChange && (
                <th className="w-10 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={el => { if (el) el.indeterminate = someSelected; }}
                    onChange={handleSelectAll}
                    aria-label="Selecionar todos os registros vis?veis"
                    className="w-4 h-4 rounded border-[var(--solide-border-strong)] text-[var(--solide-action-primary-bg)] focus:ring-[var(--solide-action-focusRing)] cursor-pointer"
                  />
                </th>
              )}

              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 select-none ${col.isNumeric ? 'text-right' : 'text-left'} ${col.sortable ? 'cursor-pointer hover:text-solide-primary' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.isNumeric ? 'justify-end w-full' : ''}`}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-solide-tertiary">
                        {sortKey === col.key ? (
                          sortDir === 'asc' ? <Icon name="chevron-up" size="sm" /> : <Icon name="chevron-down" size="sm" />
                        ) : (
                          <span className="opacity-30">?</span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--solide-border-default)] text-xs text-solide-primary">
            {data.map(row => {
              const rowId = String(row[keyField]);
              const isSelected = selectedIds.includes(rowId);

              return (
                <tr
                  key={rowId}
                  className={`h-[var(--sld-table-row-h,48px)] transition-colors ${
                    isSelected
                      ? 'bg-[var(--solide-color-primary-50)]'
                      : 'hover:bg-[var(--solide-surface-sunken)]'
                  }`}
                >
                  {onSelectionChange && (
                    <td className="w-10 px-4 py-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => handleSelectRow(rowId, e)}
                        aria-label={`Selecionar registro ${rowId}`}
                        className="w-4 h-4 rounded border-[var(--solide-border-strong)] text-[var(--solide-action-primary-bg)] focus:ring-[var(--solide-action-focusRing)] cursor-pointer"
                      />
                    </td>
                  )}

                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={`px-4 py-2.5 whitespace-nowrap ${col.isNumeric ? 'text-right font-mono tabular-nums' : ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 bg-solide-surface border-t border-solide-subtle flex items-center justify-between flex-wrap gap-3 text-xs text-solide-secondary">
        <div className="flex items-center gap-3">
          <span>
            Mostrando <strong>{data.length}</strong> de <strong>{totalCount || data.length}</strong> registros
          </span>

          {onPageSizeChange && (
            <label className="flex items-center gap-1.5 ml-2">
              <span>Linhas:</span>
              <select
                value={pageSize}
                onChange={e => onPageSizeChange(Number(e.target.value))}
                className="px-2 py-1 bg-[var(--solide-surface-sunken)] border border-solide-subtle rounded text-xs text-solide-primary outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
            aria-label="P?gina anterior"
            className="px-2.5 py-1.5 rounded border border-solide-subtle bg-solide-surface hover:bg-[var(--solide-surface-sunken)] disabled:opacity-40 disabled:cursor-not-allowed sld-focus-ring"
          >
            ?
          </button>

          <span className="px-3 py-1 font-mono font-medium text-solide-primary">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            aria-label="Pr?xima p?gina"
            className="px-2.5 py-1.5 rounded border border-solide-subtle bg-solide-surface hover:bg-[var(--solide-surface-sunken)] disabled:opacity-40 disabled:cursor-not-allowed sld-focus-ring"
          >
            ?
          </button>
        </div>
      </div>
    </div>
  );
}

DataTable.displayName = 'DataTable';
