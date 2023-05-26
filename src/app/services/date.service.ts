import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  formatDateDotDayMonthYear(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  formatDateSlashDayMonthYear(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
  }

  formatDateDashYearMonthDay(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  formatDateSlashYearMonthDay(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
  }

  isDateDifLessThan(date1: string, date2: string, num: number) {
    const difference = Math.abs((new Date(date1)).getTime() - (new Date(date2)).getTime());
    const daysDifference = difference / (1000 * 60 * 60 * 24);
    return daysDifference < num;
  }

  isFirstDateLessThanSecond(dateString1: string, dateString2: string) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    return date1 <= date2;
  }
}
