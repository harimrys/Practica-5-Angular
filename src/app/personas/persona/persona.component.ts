import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Persona } from './../../interfaces/persona';

@Component({
    selector: 'app-persona',
    templateUrl: './persona.component.html',
    styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
    sexoList =[
        {id: 1, value: 'Masculino'},
        {id: 2, value: 'Femenino'},
        {id: 3, value: 'No especificado'},
        {id: 4, value: 'Otro'},
    ];

    do: string = 'insert';
    position: any = 0;

    contacts: Array<Persona> = [];

    contact: Persona = {
        nombre: '',
        apellidos: '',
        edad: '',
        dni: '',
        cumpleanios: '',
        sexo: '',
        notas: '',
        colorFavorito: ''
    };

    constructor(private datePipe: DatePipe) {}

    ngOnInit(): void {}
    add(form: NgForm){
        if (this.do === 'insert') {
            this.contact.cumpleanios = this.datePipe.transform(this.contact.cumpleanios, 'yyyy-MM-dd');
            this.contacts.push(this.contact);
        } else {
            this.contact.cumpleanios = this.datePipe.transform(this.contact.cumpleanios, 'yyyy-MM-dd');
            this.contacts[this.position] = this.contact;
            this.do = 'insert';
        }
        this.contact = {
            nombre: '',
            apellidos: '',
            edad: '',
            dni: '',
            cumpleanios: '',
            colorFavorito: '',
            sexo: '',
            notas: '',
        };
        form.resetForm();
        }
        delete(delPosition: number){
            this.contacts.splice(delPosition, 1);
        }
        update(upPosition: number): void{
            this.contact = this.contacts[upPosition];
            var birthDate = this.contact.cumpleanios.split('/');
            this.contact.cumpleanios = new Date(
                parseInt(birthDate[2], 10),
                parseInt(birthDate[1], 10) - 1,
                parseInt(birthDate[0], 10)
            );
            this.do = 'update';
            this.position = upPosition;
    }
}

