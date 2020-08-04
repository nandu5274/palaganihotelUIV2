import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpModule, Response, RequestOptionsArgs, Headers, Http, RequestOptions } from '@angular/http';
import{DashboardService} from './dashboard.service';
import {Observable} from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import {RoomBookingDto} from '../dtos/roomBookingDto';
import {RoomDetailsDTO} from '../dtos/roomDetailsDTO';
import {RoomstatsDTO} from '../dtos/RoomstatsDTO';
import {InvoiceResponseDTO} from '../dtos/invoiceResponseDTO';
import {checkoutReqDTO} from '../dtos/checkoutReqDTO';

import {paymentHoldDetailsResponseDTO} from '../dtos/paymentHoldDetailsResponseDTO';
import {checkinRoomDetailsResponseDTO} from '../dtos/checkinRoomDetailsResponseDTO';
import {Urlsconstnats} from '../common/app.urls';
import { DatePipe } from '@angular/common';
import { localizedString } from '@angular/compiler/src/output/output_ast';
import { ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';


declare var $: any;


interface paymenttypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;

  math = Math;

  paymenttypes: paymenttypes[] = [
    {value: 'card', viewValue: 'card'},
    {value: 'cash', viewValue: 'cash'},
    {value: 'wallet', viewValue: 'wallet'}
  ];
  
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;
  type:any;
  count:any;
  myDate:any;
  roomBookingDtoRequest : RoomBookingDto;
  RoomDetailsRequestDto  : RoomDetailsDTO;
  FinalroomBookingDtoRequest :RoomBookingDto;
  createdropdwonbtnname: any;
  invoiceResponseDTO : InvoiceResponseDTO;
  RoomstatsDTO: RoomstatsDTO;
  FinalroomBookingspiingwheel :any;
  bookingRoomID : any;
  bookingConfirmationID : any;
  CustomerBooikngConfirmname : any;
  bookroombtnname:String = "Book Room";
  checkinRoomDetailsResponseDTO: checkinRoomDetailsResponseDTO
  paymentPendingRoomDetailsResponseDTO: paymentHoldDetailsResponseDTO
  checkoutconfrimation:checkinRoomDetailsResponseDTO;
  checkoutconfrimationname:any;
  checkoutconfrimationroom:any;
  checkoutsucessflg:boolean = false;
  makeroomcleanflg:boolean = false;
  cleaningroomflg:boolean = false;
  RoomDetailsRequestDtoList : any;
  CleanRoomDetailsResponseDtoList=[];
  Cleanroomavailabledto:any;
  Cleanroomnnumbe:any = "";
  gettingRoomsloading : boolean = false;
  paymentholdpayfalg : boolean = false;
  invoicename:any;
  checkoutReqDTO:checkoutReqDTO
  disblwhenservicecallforroombookbtn:boolean = false;
cardavailablecount : any = "loading..";
cardcleancount : any = "loading..";
cardcheckincount : any = "loading..";
cardtotalcount : any = "loading..";
progresspercentage : any
uploadphotobuttonname:any;
uploadAdharButton : any
adharconfrimmationflag:  boolean = false;
photoconfrimmationflag:  boolean = false;
documnetonfrimmationflag:  boolean = false;


WhileuploadingClick : boolean = true;

adharphotoname : any;

photocopyname : any;

spinningwheeluploading : boolean = false;
spinningwheelforbookroombtn : boolean = false;



WhilephotouploadingClick : boolean = true;
photospinningwheeluploading : boolean = false;


//// book a room variables start///

username : String ;
emailadress : String;
firstname : String;
lastname : String;
advanceamount:any;
Adress : String;
city : String;
country : String;
postalcode :String;
adharnumber : String;
mobilenumber : String;
purposeofvist : String;
manditaryfields : String;
noofpersons : any;
extrabeds : any;
paidamount : any;
advanceamountpamenttype :any;
urlsconstnats : Urlsconstnats;


//// book a room variables complted///


//// payment variables///

paymentadvanceamount : any = 0;
extrapersonscount:any = 0;
paymentrentamount : any= 0;
paymentextrapersonamount : any= 0;
luxurytax :any= 0;
servicetax:any= 0;
tellcallCharges:any = 0;
LaundryCharges:any = 0;
roomServiceChargres:any = 0;
othercharges:any = 0;
Totalcharges:any = 0;
//// payment variables///

///pdfvariables////

invbillno:any;
invdate:any;
invconactname:any;
invaddress:any;
invphoneno:any;
invemaild:any;
invroomno:any;
invcheckintime:any;
invinvoicedate:any;
invduedate:any;
invcheckouttime:any;



///pdfvariables////










  imageUrl: string | ArrayBuffer =
    "";
  fileName: string = "No file selected";




  passportphotoimageUrl: string | ArrayBuffer =
    "";
  passportphotofileName: string = "No file selected";



  constructor(private DashboardService : DashboardService,private datePipe: DatePipe) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      
      this.urlsconstnats = new Urlsconstnats();
      this.checkoutReqDTO = new checkoutReqDTO();
      this.paymentPendingRoomDetailsResponseDTO = new  paymentHoldDetailsResponseDTO();
   
      this.getallcheckinrecords();
      this.getallPaymentPendingcrecords();
      this.roomstatusdetails();    
      this.createdropdwonbtnname  = 'Payment type'
  }

  /*private delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async testdelay()   {

    this.count =5 ;
  for(var i=0;i<10;i++)
  {
    setTimeout(() => "",5500); // 2500 is millisecond
    await this.delay(3000);

  this.count = this.count + 5;
  this.progresspercentage = this.count + '%';
    // something
  }
  }*/



  opencustomerdetail()
  {
    this.openRoomBookingopop();
   
  }


  opencustomerbooking(value:any)
  {
    if(value.roomstatusmodname == 'AVAILABLE')
    {

      this.openRoomBookingopop();

    }

    this.bookRoom(value);

  }

  closeRoomBookingopop()
  {

    $("#RoomBookingopopmyModal").modal('hide');

  }

  openRoomBookingopop()
  {

    $("#RoomBookingopopmyModal").modal('show');

  

  }

  openRoomBookingopop2()
  {

    this.uploadAdharButton = 'upload adhar copy'
    this.uploadphotobuttonname = 'upload photo copy'
    this.progresspercentage = '0%';
    
    this.count = 0;
    $("#RoomBookingopopmyModal2").modal('show');

  }


  openRoomBookingopop3()
  {
    this.getRoomDetails()
    this.clearingFiledsafterOrderConfirmation()
  }

  closeRoomBookingopop3()
  {
    $("#RoomBookingopopmyModal3").modal('hide');

  }


  fileChange(event) {
    this.photospinningwheeluploading = true;
    this.uploadphotobuttonname = 'uploading..'
    this.WhilephotouploadingClick = false;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        if (file) {
          this.passportphotofileName = file.name;
          this.file = file;
    
          const reader = new FileReader();
          const reader2 = new FileReader();
          
          reader.readAsDataURL(file);
    
          reader.onload = event => {
            this.passportphotoimageUrl = reader.result;
          };
          let testData:FormData = new FormData();
          testData.append('file_upload', this.file, this.file.name);
          this.UploadPhotoFileToDropBox(this.file,this.passportphotofileName);
        }
   
    }
}


   onChange(file: File) {
    this.spinningwheeluploading = true;
    this.uploadAdharButton = 'uploading..'
    this.WhileuploadingClick = false;
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
      this.UploadAdharFileToDropBox(this.file,this.file);
    }
  }


  createdropdown(data:any)
  {
    this.advanceamountpamenttype = data;
  this.createdropdwonbtnname = data;
    console.log( this.advanceamountpamenttype);
  }


  UploadAdharFileToDropBox (data:any,filename:any)
  {
    this.adharphotoname  = this.bookingConfirmationID +'-'+ this.CustomerBooikngConfirmname +'-'+'adharcopy' +'.jpg';
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    let headers = new Headers();
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/octet-stream');
    headers.append('Dropbox-API-Arg', '{"path":"\/hotelpalaganicutomerDocuments\/'+this.myDate+'\/'+this.bookingConfirmationID+'\/'+this.adharphotoname +'\","mode":"add","autorename":true,"mute":false,"strict_conflict":false}');
    headers.append('Authorization','Bearer hvOUtIzzOhEAAAAAAAABK4o-UwTp4D_AWh8B6VQHcdBmnexU7cDy4LDVo6XPLx-F');
    this.DashboardService.uploadPhotoToDropBox('https://content.dropboxapi.com/2/files/upload',data, requestOptions).subscribe(
      (data)  => {
      //sucess
    
    this.count = this.count + 50;
    this.progresspercentage = this.count + '%';
    this.uploadAdharButton = 'upload sucessful'
    this.WhileuploadingClick = false;
    this.spinningwheeluploading = false;

    this.adharconfrimmationflag =  true;
    this.documnetconfrimation();
 
			},
			error => {
        this.progresspercentage = '0%';
        this.uploadAdharButton = 'upload failed, try again';
        this.WhileuploadingClick = true;
        this.spinningwheeluploading = false;
        this.adharconfrimmationflag =  false;
        
			//error
			});

  }


  UploadPhotoFileToDropBox (data:any,filename:any)
  {
   

this.photocopyname =this.bookingConfirmationID +'-'+ this.CustomerBooikngConfirmname +'-'+'Photocopy' +'.jpg';
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    let headers = new Headers();
    
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/octet-stream');
    headers.append('Dropbox-API-Arg', '{"path":"\/hotelpalaganicutomerDocuments\/'+this.myDate+'\/'+this.bookingConfirmationID+'\/'+this.photocopyname+'\","mode":"add","autorename":true,"mute":false,"strict_conflict":false}');
    headers.append('Authorization','Bearer hvOUtIzzOhEAAAAAAAABK4o-UwTp4D_AWh8B6VQHcdBmnexU7cDy4LDVo6XPLx-F');
    this.DashboardService.uploadPhotoToDropBox('https://content.dropboxapi.com/2/files/upload',data, requestOptions).subscribe(
      (data)  => {
      //sucess
    this.count = this.count + 50;
    this.progresspercentage = this.count + '%';
    this.photospinningwheeluploading = false;
    this.uploadphotobuttonname = 'upload sucessful'
    this.WhilephotouploadingClick = false;
    this.photoconfrimmationflag = true;
  this.documnetconfrimation();


    
			},
			error => {
        this.progresspercentage = '50%';
      //error
      this.photospinningwheeluploading = true;
      this.uploadphotobuttonname = 'upload failed, try again'
      this.WhilephotouploadingClick = false;
      this.photoconfrimmationflag =  false;
			});

  }



  documnetconfrimation()
{

    if(this.photoconfrimmationflag == true &&  this.adharconfrimmationflag == true)
{
   this.documnetonfrimmationflag = true;
   this.FinalroomcreatingService();
}
else
{

  this.documnetonfrimmationflag = false;
}

}


clearingFiledsafterOrderConfirmation()
{

  this.username = "";
  this.emailadress = "";
  this.firstname = "";
  this.lastname = "";
  this.Adress = "";
  this.city = "";
  this.country = "";
  this.postalcode= "";
  this.adharnumber = "";
  this.mobilenumber = "";
  this.purposeofvist = "";
  this.manditaryfields = "";
  this.adharphotoname = "";
  this.photocopyname = "";
  this.noofpersons = "";
  this.extrabeds  = "";
  this.paidamount  = "";
  this.bookingRoomID = "";
  this.bookingConfirmationID = "";
  this.CustomerBooikngConfirmname = "";
  this.file = undefined;
  this.imageUrl = "";
  this.passportphotofileName = "";
  this.advanceamount ="";
  this.passportphotoimageUrl= "";
  this.WhilephotouploadingClick = true;
  this.WhileuploadingClick = true;
  this.fileName = "";
  this.advanceamountpamenttype =undefined;
  this.createdropdwonbtnname =undefined;
  this.photoconfrimmationflag = false; 
this.adharconfrimmationflag = false;


}




FinalroomcreatingService()
{
  this.FinalroomBookingDtoRequest = new RoomBookingDto();
  this.FinalroomBookingDtoRequest.id = this.bookingConfirmationID;
  this.FinalroomBookingDtoRequest.photocopy = this.photocopyname;
  this.FinalroomBookingDtoRequest.adhacopy = this.adharphotoname;

  this.FinalroomBookingspiingwheel = true;

  let headers = new Headers();
    
  let requestOptions = new RequestOptions({ headers: headers });
  headers.append('Content-Type', 'application/json');
  this.DashboardService.saveRoomBooking( this.urlsconstnats.url + "/updatecheckinorder",this.FinalroomBookingDtoRequest,requestOptions).subscribe(
    (data)  => {
        //sucess
        this.FinalroomcreatingServicesucess(data);

    },
    error => {

    });
      

  

}

FinalroomcreatingServicesucess(data: any)
{
  this.getallcheckinrecords();

  this.roomstatusdetails();   
  $("#RoomBookingopopmyModal2").modal('hide');
  this.FinalroomBookingspiingwheel = false;
  $("#RoomBookingopopmyModalFinalOrdeCOnfirmation").modal('show');


  
}


      bookRoom(roomdetails : any)
      {

        /// assging values to variables  started ///
         this.roomBookingDtoRequest = new RoomBookingDto(); 
         this.roomBookingDtoRequest.roomid = roomdetails.id;
         this.roomBookingDtoRequest.roomstatus = roomdetails.roomstatus;
         this.roomBookingDtoRequest.loginby = "2";
         this.roomBookingDtoRequest.roomnumber = roomdetails.roomnumber;

         this.bookingRoomID = roomdetails.roomnumber
  
      }
   

      roomBookingsavecall()
      {


       this.roomBookingDtoRequest.firstname = this.firstname;
       this.roomBookingDtoRequest.customername = this.username;
       this.roomBookingDtoRequest.emailid = this.emailadress;
       this.roomBookingDtoRequest.lastname = this.lastname;
       this.roomBookingDtoRequest.address = this.Adress;
       this.roomBookingDtoRequest.city = this.city;
       this.roomBookingDtoRequest.country = this.country;
       this.roomBookingDtoRequest.postalcode = this.postalcode;
       this.roomBookingDtoRequest.adharnumber = this.adharnumber;
       this.roomBookingDtoRequest.mobilenumber = this.mobilenumber;
       this.roomBookingDtoRequest.purposeofvist = this.purposeofvist;
       this.roomBookingDtoRequest.adhacopy = "n/a";
       this.roomBookingDtoRequest.photocopy= "n/a";
       this.roomBookingDtoRequest.extrabeds = this.extrabeds;
       this.roomBookingDtoRequest.noofpersons = this.noofpersons;
       this.roomBookingDtoRequest.advanceamount = this.advanceamount;
       this.roomBookingDtoRequest.advanceamounttype = this.advanceamountpamenttype;
       this.roomBookingDtoRequest.manditoryfields = this.manditaryfields;
       this.spinningwheelforbookroombtn = true;
       this.bookroombtnname = "Booking..."
       this.roomBookingService(this.roomBookingDtoRequest);
       this.disblwhenservicecallforroombookbtn = true;
      }



      roomBookingService(roomBookingDtoRequest:any)
      {


        let headers = new Headers();
    
        let requestOptions = new RequestOptions({ headers: headers });
        headers.append('Content-Type', 'application/json');
        this.DashboardService.saveRoomBooking( this.urlsconstnats.url + "/customercheckin",roomBookingDtoRequest,requestOptions).subscribe(
          (data)  => {
              //sucess
              this.spinningwheelforbookroombtn = false;
              this.disblwhenservicecallforroombookbtn = false;
              this.bookroombtnname = "Book Room"
                console.log("creating room " + data);
    
                this.openDocumentsmodal(data);

          },
          error => {
            this.disblwhenservicecallforroombookbtn = false;
            this.spinningwheelforbookroombtn = false;
            this.bookroombtnname = "Book Room"
          });
            
          

      }

      openDocumentsmodal(data:any)
      {

        $("#RoomBookingopopmyModal").modal('hide');
        this.bookingConfirmationID = data.bookingid;
        this.CustomerBooikngConfirmname = data.username;
        this.openRoomBookingopop2();


      }




      getRoomDetails()
      {
      /// get all roomdetails and select a room///
       this.RoomDetailsRequestDtoList = this.getRoomDetailsRequest();

       $("#RoomBookingopopmyModal3").modal('show');
       this.gettingRoomsloading = true;


      }

      selectRooms(data:any)
      {
        this.RoomDetailsRequestDtoList =   data ;
        this.gettingRoomsloading = false;
  for(let i =0 ; i< data.length ; i++)
  {

    if(this.RoomDetailsRequestDtoList[i].roomstatus == 'AVAILABLE')
    {
    this.RoomDetailsRequestDtoList[i].css = 'card-header-success'; 
    this.RoomDetailsRequestDtoList[i].roomstatusnamecolorcss  = 'green'
    this.RoomDetailsRequestDtoList[i].roomstatusmodname ='AVAILABLE'
    this.RoomDetailsRequestDtoList[i].opc ='1'
    this.RoomDetailsRequestDtoList[i].click =true;
    this.RoomDetailsRequestDtoList[i].closetag = 'modal';
    this.RoomDetailsRequestDtoList[i].clickmethod = "opencustomerdetail()";
    this.RoomDetailsRequestDtoList[i].cursorvalue = 'pointer';
    
    
    }
    else if (this.RoomDetailsRequestDtoList[i].roomstatus == 'CHECK_IN')
    {

      this.RoomDetailsRequestDtoList[i].css = 'card-header-danger'; 
      this.RoomDetailsRequestDtoList[i].roomstatusnamecolorcss  = 'red'
      this.RoomDetailsRequestDtoList[i].roomstatusmodname = 'CHECK-IN'
      this.RoomDetailsRequestDtoList[i].opc ='0.6'
      this.RoomDetailsRequestDtoList[i].click =false;
      this.RoomDetailsRequestDtoList[i].clickmethod = "noactioncustomerdetail()";
      this.RoomDetailsRequestDtoList[i].cursorvalue = 'not-allowed';
    }
    else if (this.RoomDetailsRequestDtoList[i].roomstatus == 'CLEAN')
    {

      this.RoomDetailsRequestDtoList[i].css = 'card-header-warning'; 
      this.RoomDetailsRequestDtoList[i].roomstatusnamecolorcss  = 'orange'
      this.RoomDetailsRequestDtoList[i].roomstatusmodname = 'CLEANING'
      this.RoomDetailsRequestDtoList[i].opc ='0.6'
      this.RoomDetailsRequestDtoList[i].click =false;
      this.RoomDetailsRequestDtoList[i].clickmethod = "noactioncustomerdetail()";
      this.RoomDetailsRequestDtoList[i].cursorvalue = 'not-allowed';
      

    }
     
     
  }

  console.log("selection class" +  this.RoomDetailsRequestDtoList);



      }



       getRoomDetailsRequest()
      {

        
        let headers = new Headers();
    
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/json');
    this.DashboardService.getRoomDetailsRequest( this.urlsconstnats.url + "/getRooms",requestOptions).subscribe(
      (data)  => {
          //sucess
          this.RoomDetailsRequestDtoList =   data ;
          
          this.selectRooms(this.RoomDetailsRequestDtoList);
       


      },
			error => {
      });
        
      
  console.log("RoomDetailsRequestDtoList - " + this.RoomDetailsRequestDtoList);  



      }


      getCleanRoomDetailsRequest()
      {

        
        let headers = new Headers();
    
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/json');
    this.DashboardService.getRoomDetailsRequest( this.urlsconstnats.url + "/getRooms",requestOptions).subscribe(
      (data)  => {
          //sucess
          this.RoomDetailsRequestDtoList =   data ;
          
          this.getCleanRoomDetailsResponse(data);
         


      },
			error => {
      });
        
      
  console.log("RoomDetailsRequestDtoList - " + this.RoomDetailsRequestDtoList);  



      }

          getallcheckinrecords()
          {


            let headers = new Headers();
    
            let requestOptions = new RequestOptions({ headers: headers });
            headers.append('Content-Type', 'application/json');
            this.DashboardService.getAllCheckinDetailsRequest( this.urlsconstnats.url + "/getcheckinRooms",requestOptions).subscribe(
              (data)  => {
                  //sucess

                  this.getallcheckinrecordssucess(data);
              },
              error => {
           
              });
                

          }



          getallPaymentPendingcrecords()
          {


            let headers = new Headers();
    
            let requestOptions = new RequestOptions({ headers: headers });
            headers.append('Content-Type', 'application/json');
            this.DashboardService.getAllCheckinDetailsRequest( this.urlsconstnats.url + "/getpaymentpendningRooms",requestOptions).subscribe(
              (data)  => {
                  //sucess

                  this.getallPaymentcheckinrecordssucess(data);
              },
              error => {
           
              });
                

          }



          getallcheckinrecordssucess(data)
          {
            this.checkinRoomDetailsResponseDTO =   data ;

          }
          getallPaymentcheckinrecordssucess(data)
          {
            this.paymentPendingRoomDetailsResponseDTO =   data ;
            
          }

          roomstatusdetails()
          {

           
            let headers = new Headers();
    
            let requestOptions = new RequestOptions({ headers: headers });
            headers.append('Content-Type', 'application/json');
            this.DashboardService.getAllCheckinDetailsRequest( this.urlsconstnats.url + "/getroomstats",requestOptions).subscribe(
              (data)  => {
                  //sucess

                  this.roomstatusdetailssucess(data);
              },
              error => {
           
              });
                

          }
          roomstatusdetailssucess(data : any)
          {
            this.RoomstatsDTO = new RoomstatsDTO();
            this.RoomstatsDTO  = data;

           this.cardavailablecount = this.RoomstatsDTO.availablecount;
           this.cardcleancount = this.RoomstatsDTO.cleancount 
           this.cardcheckincount  = this.RoomstatsDTO.checkincount
           this.cardtotalcount = Number(this.cardavailablecount) + Number(this.cardcleancount )+ Number(this.cardcheckincount);

          }



          public openPDF():void {
            let DATA = this.htmlData.nativeElement;
            let doc = new jsPDF('p','pt', 'a4');
            doc.fromHTML(DATA.innerHTML,15,15);
            doc.output('dataurlnewwindow');
          }
        
        
          public downloadPDF():void {

    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#htmlData")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      //pdf.save('converteddoc.pdf');
      //pdf.openPDF('converteddoc.pdf');
      var file = pdf.output('blob');
      this.UploadInvoiceToDropBox (file);
      pdf.output('dataurlnewwindow');

    
      
      
  });
          


}


editPayment()
{
  $("#paymentdetailsmodal").modal('show');

}


paymentconfirmation()
{
  $("#paymentconfirmation").modal('show');

}


checkoutFinalStep()
{
  this.downloadPDF();

  $("#CheckOutPDFmyModal").modal('hide');
  $("#checkoutsucesspopup").modal('show');
  
  this.checkoutFinalStepRequest()

  


}


checkoutFinalStepRequest()
{
  this.checkoutReqDTO = new checkoutReqDTO();

this.checkoutReqDTO.bookingid =  this.checkoutconfrimation.bookingid;
this.checkoutReqDTO.paidamount = this.Totalcharges;
this.checkoutReqDTO.paidamounttype = "CASH";
this.checkoutReqDTO.paymentstatus = "paid";
this.checkoutReqDTO.roomstatus = "CLEAN"
this.checkoutReqDTO.paymentholdpayfalg=this.paymentholdpayfalg;
this.checkoutReqDTO.requestedamount = Number(this.Totalcharges) + Number(this.paymentadvanceamount);
this.checkoutReqDTO.loginby = "2";



let headers = new Headers();
    
let requestOptions = new RequestOptions({ headers: headers });
headers.append('Content-Type', 'application/json');
this.DashboardService.saveRoomBooking( this.urlsconstnats.url + "/customercheckout",this.checkoutReqDTO ,requestOptions).subscribe(
  (data)  => {
      //sucess
      this.paymentholdpayfalg = false;
     this.checkoutFinalStepSucessResponse();
  },
  error => {
    this.paymentholdpayfalg = false;
  });
    
  

}

checkoutFinalStepSucessResponse()
{
  this.getallcheckinrecords();
  this.roomstatusdetails();
  this.checkoutsucessflg = true;
}



checkoutFinalStepRequestPAymentHold()
{


  $("#CheckOutPDFmyModal").modal('hide');
  $("#checkoutsucesspopup").modal('show');
  

  this.checkoutReqDTO = new checkoutReqDTO();

this.checkoutReqDTO.bookingid =  this.checkoutconfrimation.bookingid;
this.checkoutReqDTO.paidamount = this.Totalcharges;
this.checkoutReqDTO.paidamounttype = "CASH";
this.checkoutReqDTO.paymentstatus = "notpaid";
this.checkoutReqDTO.roomstatus = "CLEAN"
this.checkoutReqDTO.requestedamount = Number(this.Totalcharges) + Number(this.paymentadvanceamount);
this.checkoutReqDTO.loginby = "2";



let headers = new Headers();
    
let requestOptions = new RequestOptions({ headers: headers });
headers.append('Content-Type', 'application/json');
this.DashboardService.saveRoomBooking( this.urlsconstnats.url + "/customercheckoutpaymenthold",this.checkoutReqDTO ,requestOptions).subscribe(
  (data)  => {
      //sucess
  
     this.checkoutFinalStepSucessResponse();
  },
  error => {

  });
    
  

}















UploadInvoiceToDropBox (data:any)
  {
   

this.invoicename =this.checkoutconfrimation.bookingid +'-'+ this.checkoutconfrimation.firstname +'-'+'invoice' +'.pdf';
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    let headers = new Headers();
    
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/octet-stream');
    headers.append('Dropbox-API-Arg', '{"path":"\/hotelpalaganicutomerDocuments\/'+this.myDate+'\/'+this.checkoutconfrimation.bookingid+'\/'+this.invoicename+'\","mode":"add","autorename":true,"mute":false,"strict_conflict":false}');
    headers.append('Authorization','Bearer hvOUtIzzOhEAAAAAAAABK4o-UwTp4D_AWh8B6VQHcdBmnexU7cDy4LDVo6XPLx-F');
    this.DashboardService.uploadPhotoToDropBox('https://content.dropboxapi.com/2/files/upload',data, requestOptions).subscribe(
      (data)  => {
      //sucess



    
			},
			error => {

			});

  }

  checkoutconfirmationmodal(data : any)
  {
    this.paymentholdpayfalg = false;

    this.paymentadvanceamount  = 0;
    this.paymentrentamount = 0;
    this.paymentextrapersonamount = 0;
    this.luxurytax = 0;
    this.servicetax= 0;
    this.tellcallCharges = 0;
    this.LaundryCharges = 0;
    this.roomServiceChargres = 0;
    this.othercharges = 0;
    this.Totalcharges = 0;
    
    this.checkoutconfrimation = new checkinRoomDetailsResponseDTO();
    this.checkoutconfrimation = data;
  
    this.checkoutconfrimationname =   this.checkoutconfrimation.firstname;
    this.checkoutconfrimationroom =this.checkoutconfrimation.roomnumber;
    this.getInvoiceDataRequest();
    $("#checkoutconfirmationmodal").modal('show');



  }

  checkoutconfirmationmodalPaymenthold(data : any)
  {

    this.paymentholdpayfalg = true;
    this.paymentadvanceamount  = 0;
    this.paymentrentamount = 0;
    this.paymentextrapersonamount = 0;
    this.luxurytax = 0;
    this.servicetax= 0;
    this.tellcallCharges = 0;
    this.LaundryCharges = 0;
    this.roomServiceChargres = 0;
    this.othercharges = 0;
    this.Totalcharges = 0;
    
    this.checkoutconfrimation = new checkinRoomDetailsResponseDTO();
    this.checkoutconfrimation = data;
  
    this.checkoutconfrimationname =   this.checkoutconfrimation.firstname;
    this.checkoutconfrimationroom =this.checkoutconfrimation.roomnumber;
    this.getInvoiceDataRequest();
    $("#checkoutconfirmationmodal").modal('show');



  }


  checkoutpaymnetdetails()
  {






    $("#paymentdetailsmodal").modal('show');
    this.paymentadvanceamount = this.checkoutconfrimation.paidamount;
    this.extrapersonscount = this.checkoutconfrimation.extrabeds;
    this.checkoutconfrimation.nofpersons
    this.Totalcharges = Number.parseInt(this.paymentadvanceamount) +
    Number.parseInt(this.paymentrentamount) +
    Number.parseInt(this.paymentextrapersonamount) +
    Number.parseInt(this.luxurytax ) +
    Number.parseInt(this.servicetax) +
    Number.parseInt(this.tellcallCharges) +
    Number.parseInt(this.LaundryCharges) +
    Number.parseInt(this.roomServiceChargres); 
    
    
    
    
    
  }
  changetotalvalue()
  {
    this.Totalcharges = 
    Number.parseInt(this.paymentrentamount) +
    Number.parseInt(this.paymentextrapersonamount) +
    Number.parseInt(this.luxurytax ) +
    Number.parseInt(this.servicetax) +
    Number.parseInt(this.tellcallCharges) +
    Number.parseInt(this.LaundryCharges) +
    Number.parseInt(this.roomServiceChargres)
   - Number.parseInt(this.paymentadvanceamount); 
  }

  generatebill()
  {
    this.changetotalvalue();

    $("#CheckOutPDFmyModal").modal('show');


    
   
  }


    getInvoiceDataRequest()
    {
     

       let bookingid = this.checkoutconfrimation.bookingid;
      let headers = new Headers();
    
      let requestOptions = new RequestOptions({ headers: headers });
      headers.append('Content-Type', 'application/json');
      this.DashboardService.saveRoomBooking( this.urlsconstnats.url + "/invoicedata",bookingid,requestOptions).subscribe(
        (data)  => {
            //sucess
            console.log(data);
            this.generatepdffiledata(data);

        },
        error => {
      
        });
          


    }

    generatepdffiledata(data :any)
    {
      this.invoiceResponseDTO = new InvoiceResponseDTO();
      this.invoiceResponseDTO  = data;
      this.invbillno =  this.invoiceResponseDTO .billno;
      this.invdate = this.invoiceResponseDTO .date;
      this.invconactname = this.invoiceResponseDTO .customername;
      this.invaddress = this.invoiceResponseDTO .adress;
      this.invphoneno = this.invoiceResponseDTO .contactphone;
      this.invemaild = this.invoiceResponseDTO .contactemailid;
      this.invroomno = this.invoiceResponseDTO .roomno;
      this.invcheckintime = this.invoiceResponseDTO .checkin;
      this.invinvoicedate = this.invoiceResponseDTO .date;
      this.invduedate = this.invoiceResponseDTO .date;
      this.invcheckouttime = this.invoiceResponseDTO.checkout;
      

    }


    getyetcleanrroms()
    {
if(Number(this.cardcleancount) > 0)
{
  $("#cleanrromstatusmodal").modal('show');
  this.cleaningroomflg = false;
  this.getCleanRoomDetailsRequest()

}



  

    }

    getCleanRoomDetailsResponse(data:any)
    {
      this.CleanRoomDetailsResponseDtoList = [];
      this.cleaningroomflg = true;
      let j=0;
      for(let i =0 ; i <= data.length ; i++)
      {

        if(data[i].roomstatus == 'CLEAN')
        {
         
        this.CleanRoomDetailsResponseDtoList.push(data[i]);
        this.CleanRoomDetailsResponseDtoList[j].css = 'card-header-warning'; 
        this.CleanRoomDetailsResponseDtoList[j].roomstatusnamecolorcss  = 'orange'
        this.CleanRoomDetailsResponseDtoList[j].roomstatusmodname = 'CLEANING'
        this.CleanRoomDetailsResponseDtoList[j].opc ='1'
        this.CleanRoomDetailsResponseDtoList[j].click =true;
        //this.CleanRoomDetailsResponseDtoList[j].clickmethod = "makeroomAvailable()";
        this.CleanRoomDetailsResponseDtoList[j].cursorvalue = 'pointer';
            j = j+1;
        }

      }
   

    }



    makeroomAvailable(data)
    {

      this.Cleanroomavailabledto =data
      this.Cleanroomnnumbe = this.Cleanroomavailabledto.roomnumber;
      $("#Roomcleanconfirmationmodal").modal('show');
     


    }

  makeroomAvailableserviccall()
  {
    $("#cleanousucesspopup").modal('show');
    this.makeroomAvailableRequest(this.Cleanroomavailabledto.id)
  }


    makeroomAvailableRequest(id:any)
    {
      $("#cleanrromstatusmodal").modal('hide');
    
      this.makeroomcleanflg = false;

      let headers = new Headers();
    
      let requestOptions = new RequestOptions({ headers: headers });
      headers.append('Content-Type', 'application/json');
      this.DashboardService.saveRoomBooking( this.urlsconstnats.url + "/makeroomavilable",id,requestOptions).subscribe(
        (data)  => {
            //sucess
            console.log(data);

            this.makeroomAvailableSucess(data);

        },
        error => {
      
        });
          

    }

  makeroomAvailableSucess(data:any)
    {
 
 this.roomstatusdetails();
this.makeroomcleanflg = true;


    }










}
