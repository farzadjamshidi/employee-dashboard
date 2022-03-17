export class Employee
{
  id!: number;
  name!: string;
  email!: string;
  hourlyRate!: number;
  overtimeHourlyRate!: number;
}

export class EmployeeInformation
{
  id!: number;
  name!: string;
  email!: string;
  hourlyRate!: number;
  overtimeHourlyRate!: number;
  totalTimeInHours!: number; // ETTS
  totalRegularPaid !: number; // ETRP
  totalOvertimePaid!: number; // ETOP
}
