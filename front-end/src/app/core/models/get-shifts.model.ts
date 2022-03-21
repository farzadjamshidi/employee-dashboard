import { Shift } from "./shift.model";

export class GetShiftsRequest
{
  employeeId?: number;
  startDate?: string;
}

export class GetShiftsResponse extends Array<Shift>
{
}
