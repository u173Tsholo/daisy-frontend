import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  week: any = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthArray: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  todaysDateObject: Date = new Date(); //get todays date
  month: number = this.todaysDateObject.getUTCMonth() + 1; //extract month --> + 1 because start is index 0
  day: number = this.todaysDateObject.getUTCDate(); //extract day as a digit
  year: number = this.todaysDateObject.getUTCFullYear(); //extract year as a digit
  check: number;
  temp: string;
  firstDayOfTheMonth: Date; //= new Date(2020, 6 + 1, 1 - this.day); //check what day was the first of the month
  a: number;
  weekOneArray: Array<any> = [];
  weekTwoArray: Array<any> = [];
  weekTwoArrayv1: Array<any> = [];
  weekThreeArray: Array<any> = [];
  weekFourArray: Array<any> = [];
  weekFourArrayv1: Array<any> = [];
  weekFiveArray: Array<any> = [];
  weekSixArray: Array<any> = [];
  numberOfDaysInThisMonth: number;
  monthName: string;
  dayName: string;

   stringDayOfTheWeek: string  = this.week[this.todaysDateObject.getDay()];

   todaysDate: string = this.year + "/" + this.month + "/" + this.day;

   constructor(private router: Router) { }
   //months with 30 days - April, June, September, Nov
   //months with 31 days -Jan, March, May, July, Aug, Oct, Dec

   daysInMonth () {
       this.numberOfDaysInThisMonth  =  new Date(this.year, this.month, 0).getDate();
   }

   populate(startingIndex: number){
     let dayCount = 0;
     let i = 0;
     for (i = 0; i <= startingIndex; i++) {
       this.weekOneArray.push("-");
       dayCount++;
     }
     for (i = 1; i < 7; i++) {
       this.weekOneArray.push(i);
       dayCount++;
       if(dayCount == 7) {
         i++;
         dayCount = 0;
         break;
       }
     }
     for (i; dayCount < i; i++) {
       this.weekTwoArray.push(i);
       dayCount++;
       if(dayCount == 6) {
         i++;
         this.weekTwoArrayv1.push(i);
         i++;
         dayCount = 0;
         break;
       }
     }

     for (i; dayCount < i; i++) {
       this.weekThreeArray.push(i);
       dayCount++;
       if(dayCount == 7) {
         i++;
         dayCount = 0;
         break;
       }
     }

     for (i; dayCount < i; i++) {
      this.weekFourArrayv1.push(i);
      dayCount++;
      if(dayCount <= 2) {
        i++;
        break;
      }
    }

     for (i; dayCount < i; i++) {
      this.weekFourArray.push(i);
      dayCount++;
      if(dayCount == 7) {
        i++;
        dayCount = 0;
        break;
      }
      // console.log(this.weekFourArray)
    }

    for (i; dayCount < i; i++) {
      this.weekFiveArray.push(i);
      dayCount++;
      if(dayCount == 7) {
        i++;
        dayCount = 0;
        break;
      }
    }

    let count = 0;
    for (i; i < (this.numberOfDaysInThisMonth+1); i++) {
      count++;
      this.weekSixArray.push(i);
      if(i == (this.numberOfDaysInThisMonth+1) ) {
        break;
      }
    }

    for(count; count < 7; count++){
      this.weekSixArray.push("-");
    }

   }

 ngOnInit(): void {
   this.daysInMonth();
   this.monthName = this.monthArray[this.month-1];
   
   var date = new Date(), y = date.getFullYear(), m = date.getMonth();
   this.monthName = this.monthArray[m];

   var firstDay = new Date(y, m, 1);
   var weekdayNumeric = new Date().getDate(); //on what weekday was the first day of the month?

   const stringWeekday = firstDay.toDateString().substring(0, 3);
 
  //  console.log('-------First day of the week-------', stringWeekday);
   var firstWeekdayOfTheMonthDigit = weekdayNumeric.toString();

  const weekDaysShort = { 0: 'Mon', 1: 'Tues', 2: 'Wed', 3: 'Thur', 4: 'Fri', 5: 'Sat', 6: 'Sun'};
  let weekDays = { 0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'};

   this.firstDayOfTheMonth = weekDays[firstWeekdayOfTheMonthDigit];

   this.a = this.week.indexOf(this.temp);

   var weekOneStartingIndex = parseInt(firstWeekdayOfTheMonthDigit);

   this.populate(4);

   if (localStorage.getItem('token')== null)
   {
     this.router.navigate(['/index']);
   }

 }

}
