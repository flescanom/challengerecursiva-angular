import { Injectable } from '@angular/core';
import { RiverMember } from '../models/riverMember';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  private _socios: Member[] = [];
  
  constructor() { 

    // Si el arreglo de socios se encuentra vacio lo recupera desde el localStorage.

    if(this._socios.length === 0) {
      let sociosTemp: Member[] = [];
      this._socios = [];

      if(localStorage.getItem('socios')){
        sociosTemp = JSON.parse(localStorage.getItem('socios') || '{}');
        sociosTemp.forEach((member: any) => {
          this._socios.push(new Member(member.name, member.age, member.team, member.maritalStatus, member.educationLevel));
        });
      }
    }
  }

  // Funcion para leer el archivo.
  public readFile(file: any): Promise<any> {

    return new Promise( (resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload =  (e) => {
        resolve(this.createArray(e.target?.result));
      }
      fileReader.onerror = () => {
        reject(new Error('No es posible leer el archivo'));
      }
        fileReader.readAsText(file, 'ascii');
      });
  }

  // Funcion para separa el archivo CSV y crear un arreglo con los datos.
  createArray(data: any) {
      this._socios = [];
      const rows = data.split('\n');
      for(let i = 0; i < rows.length - 1; i++) {
        let row = rows[i].split(',');
        let field = row[0].split(';');
        let level = String(field[4]);
        this._socios.push(new Member(field[0], parseInt( field[1], 10), field[2], field[3], level.slice(0, -1)));
      }
      localStorage.clear();
      localStorage.setItem('socios', JSON.stringify(this._socios));
  }

  public getQuantitySocios() {
    return this._socios.length;
  }

  public getSocios() {
    return this._socios;
  }

  public getAverageAgeRacingMembers(team: string): number {
      return this.averageAgeByTeam(team, this._socios);
  }

  // Se filtran los socios casados y con estudios universitarios, se quitan las propiedades no necesarias
  // y se corta el loop cuando se llega a los 100 primeros. Por ultimo, se ordena por edad.
  public getMarriedMembers(): Member[] {
    let tempArray: Member[] = [];

    for (let i = 0; i < this._socios.length; i++) {
      
      if(this._socios[i].maritalStatus === 'Casado' && this._socios[i].educationLevel === 'Universitario') {
        delete this._socios[i].maritalStatus;
        delete this._socios[i].educationLevel;
        tempArray.push(this._socios[i]);
      }

      if(tempArray.length === 100) {
        break;
      }
    }

    tempArray.sort((a, b) => a.age - b.age);

    return tempArray;

  }

  // Primero se filtran todos los socios de River, se quitan los duplicados y se ordena.
  public getCommonNameOfRiverMembers(): RiverMember[] {
    let namesMembers: RiverMember[] = [];

    this._socios.forEach((socio) => {

      if(socio.team === 'River') {
        namesMembers.push(new RiverMember(socio.name, socio.age, socio.team));  
      }  
    });

    const unicos: RiverMember[] = [];

    for(let i = 0; i < namesMembers.length; i++) {

      const member = namesMembers[i];
      let esDuplicado = false;

      for(let j = 0; j < unicos.length; j++) {

        if (unicos[j].name === member.name) {
          esDuplicado = true;
          unicos[j].quantity++;
          break;
        }
      }
      
      if (!esDuplicado) {
        unicos.push(member);
      }
    }

    let top5 = unicos.sort((a, b) => b.quantity - a.quantity).slice(0,5);
    return top5;

  }

  // Se usa reduce para acummular la cantidad de socios y las edades. Se ordena por cantidad de socio
  // y se calculan, el promedio de edad, edad minima y maxima. Por ultimo se eliminan propiedades
  // no necesarias.
  getListByQuantityOfMembers():any[] {
      let result: any;
    
      result = this._socios.reduce( (groups:any, member) => {
          let val = member.team;
          let ages: number[] = []
          groups[val] = groups[val] || {team: member.team, ages , quantityMembers: 0, averageAges: 0, maxAge:0, minAge:0};
          groups[val].ages.push(member.age);
          groups[val].team === member.team ? groups[val].quantityMembers++ : groups[val].quantityMembers = groups[val].quantityMembers;
          return groups;
      }, {});

      let tmpArray:any[] = [];
      tmpArray = Object.values(result);

      tmpArray = tmpArray.sort((a:any, b:any) => b.quantityMembers - a.quantityMembers);

      let sum: number = 0;

      for (let i = 0; i < tmpArray.length; i++) {
        for (let j = 0; j < tmpArray[i].ages.length; j++) {
          sum += tmpArray[i].ages[j];
        }

        tmpArray[i].averageAges = Math.round(sum / tmpArray[i].quantityMembers);
        tmpArray[i].maxAge = Math.max(...tmpArray[i].ages);
        tmpArray[i].minAge = Math.min(...tmpArray[i].ages);
        sum = 0;
        delete tmpArray[i].ages;
        delete tmpArray[i].quantityMembers;
      }

      return tmpArray;
  
  }

  // Funcion para calcular el promedio de edad por equipo
  averageAgeByTeam(team: string, members: Member[] ): number {
    let total: number = 1;
    let ages: number = 1;

    members.forEach((member) => {
      if(member.team === team) {
        total++;
        ages+=member.age;
      }
    });

    return Math.round(ages/total);

  }

  // getTeams() {
  //   this._socios.forEach(socio => {
      
  //   });
  // }
}

