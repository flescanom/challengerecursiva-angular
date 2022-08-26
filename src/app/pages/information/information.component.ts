import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { SociosService } from 'src/app/services/socios.service';
import { RiverMember } from 'src/app/models/riverMember';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  totalMembers = 0;
  ageAverageOfRacingMembers = 0;
  marriedMembers: Member[] = [];
  teamsByMembers: any[] = [];
  commonNamesOfRiverMembers: RiverMember[] = [];

  constructor( private _socios:SociosService) { }

  ngOnInit(): void {
    this.totalMembers = this._socios.getQuantitySocios();
    this.ageAverageOfRacingMembers = this._socios.getAverageAgeRacingMembers('Racing');
    this.marriedMembers = this._socios.getMarriedMembers();
    this.teamsByMembers = this._socios.getListByQuantityOfMembers();
    this.commonNamesOfRiverMembers = this._socios.getCommonNameOfRiverMembers();
  }

}
