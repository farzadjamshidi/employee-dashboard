import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkWrapperHelper } from 'src/app/core/helpers/network-wrapper.helper';
import { GetEmployeesRequest, GetEmployeesResponse } from 'src/app/core/models/get-employees.model';
import { PutEmployeesRequest, PutEmployeesResponse } from 'src/app/core/models/put-employees.model';
import { IEmployeeRepo } from '../../interfaces/employee.interface';

@Injectable()
export class LocalHostV0EmployeeRepo implements IEmployeeRepo
{

  constructor(
    private networkWrapperHelper: NetworkWrapperHelper
  )
  {
  }

  baseURL = 'http://localhost:8000/employees';

  list(request: GetEmployeesRequest): Observable<GetEmployeesResponse>
  {
    return this.networkWrapperHelper.get<GetEmployeesResponse>({
      url: this.baseURL,
      params: request
    });
  }

  update(request: PutEmployeesRequest): Observable<PutEmployeesResponse>
  {
    return this.networkWrapperHelper.put<PutEmployeesResponse>({
      url: this.baseURL,
      data: request
    });
  }

}

