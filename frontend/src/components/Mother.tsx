export interface Mother {
    id: number;
    phone_number: number;
    address: string;
    delivery_date: string;
    user: {
      firstName: string;
      lastName: string;
      nic: string;
    };
    phm: {};
    appointments: {
      id: number;
      appointment_description: string;
      startDate: string;
      endDate: string;
      fixedDate: string;
      month: string;
      checkedByMother: boolean;
      checkedByPHM: boolean;
    }[];
  }
  