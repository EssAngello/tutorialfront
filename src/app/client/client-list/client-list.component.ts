import { Component, OnInit } from '@angular/core';
import {Client} from '../model/Client'
import { ClientService } from '../client.service';
import {MatTableDataSource} from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(private clientService: ClientService, public dialog: MatDialog,) { }

  createClient() {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editCategory(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar cliente", description: "Atención si borra el cliente se perderán sus datos.<br> ¿Desea eliminar al cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.dataSource.data = clients
    );
  }

}
