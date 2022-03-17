import { Observable } from "rxjs";
import { GetEmployeesRequest, GetEmployeesResponse } from "../../models/get-employees.model";

export interface IEmployeeRepo
{
  list(request: GetEmployeesRequest): Observable<GetEmployeesResponse>;
}
