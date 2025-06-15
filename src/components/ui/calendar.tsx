"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface CalendarProps {
  className?: string;
  classNames?: Record<string, string>;
  showOutsideDays?: boolean;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  mode?: "single" | "multiple" | "range";
  numberOfMonths?: number;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  disabled,
  mode = "single",
  numberOfMonths = 1,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => {
    return selected || new Date();
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    if (disabled && disabled(clickedDate)) return;
    onSelect?.(clickedDate);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    const date = new Date(year, month, day);
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    const date = new Date(year, month, day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isDisabled = (day: number) => {
    if (!disabled) return false;
    const date = new Date(year, month, day);
    return disabled(date);
  };

  // Generate calendar days
  const calendarDays = [];

  // Previous month's trailing days
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: true,
      isNextMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
      isNextMonth: false,
    });
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
      isNextMonth: true,
    });
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex justify-center pt-1 relative items-center">
          <button
            onClick={previousMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="text-sm font-medium">
            {MONTHS[month]} {year}
          </div>

          <button
            onClick={nextMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((calendarDay, index) => {
            const { day, isCurrentMonth, isPrevMonth, isNextMonth } =
              calendarDay;

            if (!showOutsideDays && !isCurrentMonth) {
              return <div key={index} className="h-9 w-9" />;
            }

            return (
              <button
                key={index}
                onClick={() => isCurrentMonth && handleDateClick(day)}
                disabled={!isCurrentMonth || isDisabled(day)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                  // Current month styles
                  isCurrentMonth &&
                    "hover:bg-accent hover:text-accent-foreground",
                  // Selected day
                  isCurrentMonth &&
                    isSelected(day) &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  // Today
                  isCurrentMonth &&
                    isToday(day) &&
                    !isSelected(day) &&
                    "bg-accent text-accent-foreground",
                  // Outside days
                  !isCurrentMonth && "text-muted-foreground opacity-50",
                  // Disabled
                  isDisabled(day) &&
                    "text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
