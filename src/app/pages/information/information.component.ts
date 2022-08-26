import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
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

  constructor( private _members:MemberService) { }

  ngOnInit(): void {
    this.totalMembers = this._members.getQuantityMembers();
    this.ageAverageOfRacingMembers = this._members.getAverageAgeRacingMembers('Racing');
    this.marriedMembers = this._members.getMarriedMembers();
    this.teamsByMembers = this._members.getListByQuantityOfMembers();
    this.commonNamesOfRiverMembers = this._members.getCommonNameOfRiverMembers();
  }

}
