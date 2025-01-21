import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import axios from "axios";

let userItem = localStorage.getItem("user");
const user = userItem ? JSON.parse(userItem) : null;
const userId = user?.id;
const BASE_URL = "http://localhost:3000/";
const role = (localStorage.getItem("role") || "")
  .replace(/"/g, "")
  .trim()
  .toLowerCase();


interface Appointment {
  fixedDate: string;
}

// interface Mother {
//   id: string;
//   appointments: Appointment[];
//   // add other mother fields as needed
// }

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <div className="w-3 h-3 bg-[#BA97FE] rounded-full" />
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        style={isSelected ? { background: "#DDCDFE", fontWeight: "bold" } : {}}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<string[]>([]);

  const fetchMotherAppointments = async (signal: AbortSignal) => {
    const response = await axios.get<Appointment[]>(
      `${BASE_URL}appointments/user/${userId}`,
      { signal }
    );
    return response.data.map(appointment => 
      dayjs(appointment.fixedDate).format('YYYY-MM-DD')
    );
  };

  const fetchPHMAppointments = async (signal: AbortSignal) => {
    const response = await axios.get<Appointment[]>(
      `${BASE_URL}phm/appointments/mother/${userId}`,
      { signal }
    );
    
    // Flatten all appointments from all mothers into a single array of dates
    return response.data.map(appointment => 
      dayjs(appointment.fixedDate).format('YYYY-MM-DD')
    );
  };

  const fetchAppointments = async (date: Dayjs, signal: AbortSignal) => {
    console.log(date);
    try {
      setIsLoading(true);
      let appointmentDates: string[] = [];

      if (role === 'mother') {
        appointmentDates = await fetchMotherAppointments(signal);
      } else if (role === 'phm') {
        appointmentDates = await fetchPHMAppointments(signal);
      }

      if (!signal.aborted) {
        setHighlightedDays(appointmentDates);
        setIsLoading(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      console.error('Error fetching appointments:', error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const controller = new AbortController();
    fetchAppointments(dayjs(), controller.signal);

    requestAbortController.current = controller;
    
    return () => {
      controller.abort();
    };
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    const controller = new AbortController();
    fetchAppointments(date, controller.signal);
    
    requestAbortController.current = controller;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs()}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}