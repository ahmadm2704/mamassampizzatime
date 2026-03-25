'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Column<T> {
  header: string;
  key: keyof T;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  keyField: keyof T;
}

export function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
  keyField,
}: DataTableProps<T>) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="font-semibold">
                {column.header}
              </TableHead>
            ))}
            {(onEdit || onDelete) && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-8 text-muted-foreground">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={String(item[keyField])} className="hover:bg-muted/50 transition-colors">
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>
                    {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell className="text-right space-x-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(item)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
