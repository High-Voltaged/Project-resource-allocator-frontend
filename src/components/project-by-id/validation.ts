import * as yup from "yup";

import { ITicketValidationInput } from "./types";
import { TicketPriority, TicketStatus } from "~/shared/types/ticket";
import { TICKET_INPUT_LIMITS } from "~/shared/const/ticket";

export const initialTicketValues: ITicketValidationInput = {
  title: "",
  description: "",
  status: TicketStatus.backlog,
  priority: TicketPriority.lowest,
  dueTo: null,
};

export const editTicketSchema = yup.object().shape({
  title: yup.string().min(TICKET_INPUT_LIMITS.TITLE_MIN).max(TICKET_INPUT_LIMITS.TITLE_MAX).required(),
  description: yup
    .string()
    .min(TICKET_INPUT_LIMITS.DESCRIPTION_MIN)
    .max(TICKET_INPUT_LIMITS.DESCRIPTION_MAX)
    .required(),
  status: yup.string().oneOf(Object.keys(TicketStatus)).required(),
  priority: yup.string().oneOf(Object.keys(TicketPriority)).required(),
  dueTo: yup.date().nullable(),
});
