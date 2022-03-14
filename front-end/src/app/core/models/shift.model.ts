import { EmployeeInformation } from "./employee.model";

export class Shift
{
  id!: number;
  employeeId!: number;
  clockIn!: string;
  clockOut!: string;
}

export class ShiftsInformation
{
  totalEmployees!: number;
  totalTimeInHours!: number;
  totalRegularPaid !: number;
  totalOvertimePaid!: number;
  employees!: { [key: string]: EmployeeInformation; };
}
