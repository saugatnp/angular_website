
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'placeholder'
  })
  export class PlaceholderPipe implements PipeTransform {
    transform( item : string , type: string) {
        switch (type) {
            case 'comma':
                return (item !== null && item !== undefined && item !== '' ) ? item + ', ': '';
            case 'dash':
                return (item !== null && item !== undefined && item !== '' ) ? item : '-';
            default:
                return (item !== null && item !== undefined && item !== '' ) ? item : '-';
      
      }
    }



  }