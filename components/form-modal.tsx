'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface FormModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  children: ReactNode;
}

export function FormModal({
  isOpen,
  title,
  onClose,
  onSubmit,
  isLoading = false,
  children,
}: FormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl flex flex-col max-h-[90vh] p-0 gap-0">
        {/* Sticky Header */}
        <DialogHeader className="px-6 py-4 border-b border-border shrink-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit as React.FormEventHandler<HTMLFormElement>} className="flex flex-col flex-1 min-h-0">
          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {children}
          </div>

          {/* Sticky Footer */}
          <DialogFooter className="px-6 py-4 border-t border-border shrink-0 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
