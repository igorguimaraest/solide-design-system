import React, { useState } from 'react';
import { DataTableProps, ColumnDef } from './DataTable.types';
import { Icon } from '../../atoms/Icon';
import { Checkbox } from '../../atoms/Checkbox';

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
  const someSelected = data.some(row => selectedIds.includes(String(row[keyField]))) && !allSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allRowIds = data.map(r => String(r[keyField]));
      onSelectionChange?.([...new Set([...selectedIds, ...allRowIds])]);
    } else {
      const rowIdsSet = new Set(data.map(r => String(r[keyField])));
      onSelectionChange?.(selectedIds.filter(id => !rowIdsSet.has(id)));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
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
    <div className={`w-full bg-solide-surface border border-solide-subtle rounded-[var(--sld-radius-lg)] shadow-[var(--sld-shadow-xs)] flex flex-col font-ui ${className}`}>
      {/* Scrollable table container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[var(--sld-surface-sunken)] border-b border-solide-subtle text-xs font-semibold text-solide-secondary">
              {onSelectionChange && (
                <th className="w-10 px-4 py-3 text-center">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Selecionar todos os registros visíveis"
                  />
                </th>
              )}

              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-3 select-none ${col.isNumeric ? 'text-right' : 'text-left'} ${col.sortable ? 'cursor-pointer [@media(hover:hover)_and_(pointer:fine)]:hover:text-solide-primary' : ''}`}
                  aria-sort={col.sortable ? (sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : "none") : undefined}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.isNumeric ? 'justify-end w-full' : ''}`}>
                    {col.sortable ? <button type="button" className="sld-focus-ring" onClick={() => handleSort(col.key)}>{col.header}</button> : <span>{col.header}</span>}
                    {col.sortable && (
                      <span className="text-solide-tertiary">
                        {sortKey === col.key ? (
                          sortDir === 'asc' ? <Icon name="chevron-up" size="sm" /> : <Icon name="chevron-down" size="sm" />
                        ) : (
                          <Icon name="chevron-down" size="sm" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--sld-border-default)] text-xs text-solide-primary">
            {data.length === 0 && <tr><td colSpan={columns.length + (onSelectionChange ? 1 : 0)} className="p-6 text-center text-solide-secondary">Nenhum registro encontrado.</td></tr>}
            {data.map(row => {
              const rowId = String(row[keyField]);
              const isSelected = selectedIds.includes(rowId);

              return (
                <tr
                  key={rowId}
                  className={`h-[var(--sld-table-row-h)] transition-colors ${
                    isSelected
                      ? 'bg-[var(--sld-selection-bg)]'
                      : '[@media(hover:hover)_and_(pointer:fine)]:hover:bg-[var(--sld-surface-sunken)]'
                  }`}
                >
                  {onSelectionChange && (
                    <td className="w-10 px-4 py-2.5 text-center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={checked => handleSelectRow(rowId, checked)}
                        aria-label={`Selecionar registro ${rowId}`}
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
                className="px-2 py-1 bg-[var(--sld-surface-sunken)] border border-solide-subtle rounded text-xs text-solide-primary sld-focus-ring"
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
            aria-label="Página anterior"
            className="px-2.5 py-1.5 rounded border border-solide-subtle bg-solide-surface [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:bg-[var(--sld-surface-sunken)] disabled:bg-[var(--sld-disabled-bg)] disabled:text-[var(--sld-disabled-fg)] disabled:border-[var(--sld-border-subtle)] disabled:cursor-not-allowed sld-focus-ring"
          >
            <Icon name="arrow-left" size="sm" />
          </button>

          <span className="px-3 py-1 font-mono font-medium text-solide-primary">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            aria-label="Próxima página"
            className="px-2.5 py-1.5 rounded border border-solide-subtle bg-solide-surface [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:bg-[var(--sld-surface-sunken)] disabled:bg-[var(--sld-disabled-bg)] disabled:text-[var(--sld-disabled-fg)] disabled:border-[var(--sld-border-subtle)] disabled:cursor-not-allowed sld-focus-ring"
          >
            <Icon name="chevron-right" size="sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

DataTable.displayName = 'DataTable';
