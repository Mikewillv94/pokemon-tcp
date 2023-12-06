import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openConfirmDialog(title: string): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title },
    });

    return dialogRef.afterClosed();
  }

  openAlertDialog(title: string): any {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { title },
    });

    return dialogRef.afterClosed();
  }
}
