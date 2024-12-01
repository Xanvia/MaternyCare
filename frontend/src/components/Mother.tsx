export interface Mother {
    id: number;
    nic: string;
    phone_number: number;
    location: string;
    delivery_date: string;
    user: {
      firstName: string;
      lastName: string;
    };
    phm: {};
    appointments: {
      id: number;
      appointment_type: string;
      startDate: string;
      endDate: string;
      fixedDate: string;
      month: string;
      checkedByMother: boolean;
      checkedByPHM: boolean;
    }[];
  }
  