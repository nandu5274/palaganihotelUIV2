import { Component, OnInit } from '@angular/core';
import { HttpModule, Response, RequestOptionsArgs, Headers, Http, RequestOptions } from '@angular/http';
import{DashboardService} from '../dashboard/dashboard.service';
import {Urlsconstnats} from '../common/app.urls';
import {budgetdetailsResponseDTO} from '../dtos/budgetdetailsResponseDTO';
import {budgetdetailsDTO} from '../dtos/budgetdetailsDTO';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  urlsconstnats : Urlsconstnats;
  FinalAmount : String = "";
  lastmantamount : String = "";
  NextmntAmount: String = "";

  budgetdetailsResponseDTO: budgetdetailsResponseDTO;
  budgetdetailsDTO:budgetdetailsDTO[] = [];





  constructor(private DashboardService : DashboardService) { }

  ngOnInit() {
    this.urlsconstnats = new Urlsconstnats();

     this.budgetdetailsResponseDTO = new budgetdetailsResponseDTO();
    


    this.getcurrentmnthbudget();
  }


  getcurrentmnthbudget()
  {

  


    
    let headers = new Headers();
  
    let requestOptions = new RequestOptions({ headers: headers });
    headers.append('Content-Type', 'application/json');
    this.DashboardService.getbudgetdetails( this.urlsconstnats.url + "/getcurentmnthbudeget",requestOptions).subscribe(
      (data)  => {
          //sucess
          console.log(data);
          this.getcurrentmnthbudgetSucess(data);

      },
      error => {
    
      });
        

  }


  getcurrentmnthbudgetSucess(data : any)
  {

    this.budgetdetailsResponseDTO = data;
    this.budgetdetailsDTO = this.budgetdetailsResponseDTO.budgetdetailsDTOList;
    this.FinalAmount = this.budgetdetailsResponseDTO.finalAmount;
    this.lastmantamount = this.budgetdetailsResponseDTO.lastMnthAdvanceAMount;
    this.NextmntAmount = this.budgetdetailsResponseDTO.nextMnthpaidAMount;
    console.log( this.budgetdetailsResponseDTO.finalAmount)

  }









}
