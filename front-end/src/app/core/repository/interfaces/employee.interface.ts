import { Observable } from "rxjs";
import { GetEmployeesRequest, GetEmployeesResponse } from "../../models/get-employees.model";
import { PutEmployeesRequest, PutEmployeesResponse } from "../../models/put-employees.model";

export interface IEmployeeRepo
{
  list(request: GetEmployeesRequest): Observable<GetEmployeesResponse>;
  update(request: PutEmployeesRequest): Observable<PutEmployeesResponse>;
}
