import { Observable } from "rxjs";
import { GetShiftsRequest, GetShiftsResponse } from "../../models/get-shifts.model";

export interface IShiftRepo
{
  list(request: GetShiftsRequest): Observable<GetShiftsResponse>;
}
