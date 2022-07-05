import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from "../client.service";
import { Client } from '../model/Client';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import {MatTableDataSource} from "@angular/material/table";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  // @ts-ignore
  client : Client;

  // @ts-ignore
  //dataSource : MatTableDataSource<Client>;

  matcher = new MyErrorStateMatcher();

  // @ts-ignore
  //duplicate : boolean;


  /*titleFormControl = new FormControl('', {
    validators: [
      Validators.required,
      this.isNameDuplicate.bind(this)
    ],
  });*/

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    if (this.data.client != null) {
      this.client = Object.assign({}, this.data.client);
      //this.dataSource = Object.assign({}, this.data.dataSource)
    }
    else {
      // @ts-ignore
      this.client = new Client();
      //this.dataSource = Object.assign({}, this.data.dataSource)
    }
  }

  onSave(){
    this.clientService.saveClient(this.client).subscribe(result => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  /*onChange(){
    let objects : Client[] = this.dataSource.filteredData;

    for(let i = 0; i < objects.length; i++){
      if(objects[i].name==this.client.name){
        this.duplicate = true;
        break;
      }else{
        this.duplicate = false;
      }
    }

    console.log(this.duplicate);
  }*/


  // @ts-ignore
  /*
  isNameDuplicate(control:AbstractControl):{[key:string]:boolean}|null{
    if(this.duplicate==true){
      return {duplicate:true};
    }
    return null;
  }*/

}
