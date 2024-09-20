import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AppConstants{

    public API_ENDPOINT_BASE='https://bc589910-fd31-45c5-97de-d95d8c56e697.mock.pstmn.io';
    public API_ENDPOINT_VEHICLE_POSITION='/posicao';
    public API_ENDPOINT_LICENSE_PLATE='/posicao/placas';
    public API_ENDPOINT_POINTS_OF_INTEREST='/pois';

}