import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatDate(date, pattern = "hh:mm · dd/MM/yyyy") {
	if (typeof date === "string") {
		date = new Date(date);
	}
	return format(date, pattern);
}
