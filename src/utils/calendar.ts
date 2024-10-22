export interface Category {

    name: string;

    color: string;

}



export interface Event {

    id: number;

    title: string;

    start: string;

    end: string;

    description: string;

    category: string;

}



export interface DayItem {

    day: number;

    isOutside: boolean;

    isToday?: boolean;

    events?: Event[];

    date?: Date;

}



export const CATEGORIES: Category[] = [

    { name: "Meetings", color: "#6366F1" },

    { name: "Personal", color: "#22C55E" },

    { name: "Deadlines", color: "#EF4444" }

];



export const WEEK_DAYS = [

    { full: 'Monday', short: 'Mo' },

    { full: 'Tuesday', short: 'Tu' },

    { full: 'Wednesday', short: 'We' },

    { full: 'Thursday', short: 'Th' },

    { full: 'Friday', short: 'Fr' },

    { full: 'Saturday', short: 'Sa' },

    { full: 'Sunday', short: 'Su' }

] as const;



export const MAX_VISIBLE_EVENTS = 3;



// Date formatting

export const formatTime = (dateString: string): string => {

    return new Date(dateString).toLocaleTimeString('default', {

        hour: '2-digit',

        minute: '2-digit'

    });

};



export const formatDate = (date: Date): string => {

    return date.toLocaleDateString('default', {

        weekday: 'long',

        year: 'numeric',

        month: 'long',

        day: 'numeric'

    });

};



// Calendar helpers

export const getDaysInMonth = (year: number, month: number): number =>

    new Date(year, month + 1, 0).getDate();



export const getFirstDayOfMonth = (year: number, month: number): number => {

    const firstDay = new Date(year, month, 1).getDay();

    return firstDay === 0 ? 6 : firstDay - 1; // Adjusting for Monday as first day

};



export const isToday = (year: number, month: number, day: number): boolean => {

    const today = new Date();

    return today.getDate() === day &&

        today.getMonth() === month &&

        today.getFullYear() === year;

};



// Event helpers

export const getEventColor = (categoryName: string): string => {

    const category = CATEGORIES.find(cat => cat.name === categoryName);

    return category?.color || '#6366F1';

};



export const isSameDay = (date1: Date, date2: Date): boolean => {

    return date1.getFullYear() === date2.getFullYear() &&

        date1.getMonth() === date2.getMonth() &&

        date1.getDate() === date2.getDate();

};



export const getEventsForDate = (events: Event[], date: Date): Event[] => {

    if (!events || !date) return [];



    return events.filter(event => {

        const eventDate = new Date(event.start);

        return isSameDay(eventDate, date);

    });

};



export const getFormattedEvents = (dayEvents: Event[] = []) => {

    if (!dayEvents.length) return { visibleEvents: [], overflow: 0 };



    const sortedEvents = sortEventsByStartTime(dayEvents);



    return {

        visibleEvents: sortedEvents.slice(0, MAX_VISIBLE_EVENTS),

        overflow: Math.max(0, sortedEvents.length - MAX_VISIBLE_EVENTS)

    };

};



// Calendar generation helpers

export const createDayItem = (

    day: number,

    month: number,

    year: number,

    isOutside: boolean,

    events: Event[] = []

): DayItem => {

    const date = new Date(year, month, day);

    return {

        day,

        isOutside,

        isToday: isToday(year, month, day),

        events: getEventsForDate(events, date),

        date

    };

};



export const getPreviousMonthDays = (

    currentYear: number,

    currentMonth: number,

    firstDay: number,

    events: Event[]

): DayItem[] => {

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const prevMonthDays = getDaysInMonth(prevMonthYear, prevMonth);



    return Array.from({ length: firstDay }, (_, i) => {

        const day = prevMonthDays - firstDay + i + 1;

        return createDayItem(day, prevMonth, prevMonthYear, true, events);

    });

};



export const getCurrentMonthDays = (

    year: number,

    month: number,

    daysInMonth: number,

    events: Event[]

): DayItem[] =>

    Array.from({ length: daysInMonth }, (_, i) => {

        const day = i + 1;

        return createDayItem(day, month, year, false, events);

    });



export const getNextMonthDays = (

    totalCells: number,

    currentDays: number,

    year: number,

    month: number,

    events: Event[]

): DayItem[] => {

    const nextMonth = month === 11 ? 0 : month + 1;

    const nextMonthYear = month === 11 ? year + 1 : year;



    return Array.from({ length: totalCells - currentDays }, (_, i) => {

        const day = i + 1;

        return createDayItem(day, nextMonth, nextMonthYear, true, events);

    });

};



// Date manipulation and sorting

export const addMonths = (date: Date, months: number): Date => {

    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() + months);

    return newDate;

};



export const sortEventsByStartTime = (events: Event[]): Event[] => {

    return [...events].sort((a, b) =>

        new Date(a.start).getTime() - new Date(b.start).getTime()

    );

};



export const filterEventsForMonth = (events: Event[], year: number, month: number): Event[] => {

    return events.filter(event => {

        const eventDate = new Date(event.start);

        return eventDate.getFullYear() === year && eventDate.getMonth() === month;

    });

};



// Debug helpers

export const debugDate = (date: Date): string => {

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

};