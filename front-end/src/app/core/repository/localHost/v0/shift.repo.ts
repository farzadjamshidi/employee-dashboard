import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkWrapperHelper } from 'src/app/core/helpers/network-wrapper.helper';
import { GetShiftsRequest, GetShiftsResponse } from 'src/app/core/models/get-shifts.model';
import { IShiftRepo } from '../../interfaces/shift.interface';

@Injectable()
export class LocalHostV0ShiftRepo implements IShiftRepo
{

  constructor(
    private networkWrapperHelper: NetworkWrapperHelper
  )
  {
  }

  baseURL = 'http://localhost:8000/shifts';

  list(request: GetShiftsRequest): Observable<GetShiftsResponse>
  {
    return this.networkWrapperHelper.get<GetShiftsResponse>({
      url: this.baseURL,
      params: request
    });
  }

}

