import { Observable } from "rxjs";
import { GetShiftsRequest, GetShiftsResponse } from "../../models/get-shifts.model";
import { PutShiftsRequest, PutShiftsResponse } from "../../models/put-shifts.model";

export interface IShiftRepo
{
  list(request: GetShiftsRequest): Observable<GetShiftsResponse>;
  update(request: PutShiftsRequest): Observable<PutShiftsResponse>;
}
