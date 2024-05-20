import { Button, Dialog, Select, Text, TextArea, TextField } from "@radix-ui/themes";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useFormik } from "formik";

import { ITicket, TicketPriority, TicketStatus } from "~/shared/types/ticket";
import { CREATE_TICKET, GET_TICKETS_BY_PROJECT_ID, GET_TICKET_BY_ID, UPDATE_TICKET } from "~/shared/graphql/ticket";
import ToastContainer from "~/components/shared/Toast";
import { ERROR_TITLE, SUCCESS_TITLE } from "~/shared/const/misc";
import { capitalize } from "~/shared/utils";
import DatePicker from "~/components/ui/date-picker";
import { TicketStatusItems } from "~/shared/const/ticket";

import { ITicketValidationInput, TUpsertTicketInput, TCreateTicketOutput } from "../types";
import { editTicketSchema, initialTicketValues } from "../validation";

export interface ICreateTicketForm {
  projectId: string;
  ticket?: ITicket;
}

const CreateTicketForm: React.FC<ICreateTicketForm> = ({ ticket, projectId }) => {
  const [toastOpen, setToastOpen] = useState(false);

  const [createTicket, { loading, error }] = useMutation<TCreateTicketOutput, TUpsertTicketInput>(
    !ticket ? CREATE_TICKET : UPDATE_TICKET,
    {
      refetchQueries: [GET_TICKETS_BY_PROJECT_ID, ...(ticket ? [GET_TICKET_BY_ID] : [])],
      onCompleted: () => setToastOpen(true),
      onError: () => setToastOpen(true),
    }
  );

  const formik = useFormik<ITicketValidationInput>({
    initialValues: ticket || initialTicketValues,
    enableReinitialize: true,
    validationSchema: editTicketSchema,
    onSubmit: async (data) => {
      const id = ticket?.id || null;
      const variables: TUpsertTicketInput = id ? { id, ...data } : { projectId, ...data };
      await createTicket({ variables });
      formik.resetForm();
    },
  });

  const toastMessage = error?.message || `The ticket was ${!ticket ? "created" : "updated"} successfully.`;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col items-start w-full space-y-6">
      <ToastContainer
        title={error ? ERROR_TITLE : SUCCESS_TITLE}
        message={toastMessage}
        open={toastOpen}
        setOpen={setToastOpen}
      />
      <div className="w-full">
        <label>
          <Text as="div" size="2" mb="1">
            Title
          </Text>
          <TextField.Root
            id="title"
            placeholder="Ticket title"
            variant="soft"
            className="w-full rounded-lg border border-slate-100"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.title}</p>
          )}
        </label>
      </div>
      <div className="flex items-center space-x-4 w-full">
        <label>
          <Text as="div" size="2" mb="1">
            Status
          </Text>
          <Select.Root
            defaultValue={formik.values.status}
            value={formik.values.status}
            onValueChange={(value) => formik.setFieldValue("status", value)}
          >
            <Select.Trigger variant="soft" className="w-60" />
            <Select.Content variant="soft" id="type" className="w-full rounded-lg border border-slate-100">
              {Object.keys(TicketStatus).map((key) => (
                <Select.Item key={key} value={key}>
                  {TicketStatusItems[key as keyof typeof TicketStatus].label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
        <label>
          <Text as="div" size="2" mb="1">
            Priority
          </Text>
          <Select.Root
            defaultValue={formik.values.priority}
            value={formik.values.priority}
            onValueChange={(value) => formik.setFieldValue("priority", value)}
          >
            <Select.Trigger variant="soft" className="w-60" />
            <Select.Content variant="soft" id="type" className="w-full rounded-lg border border-slate-100">
              {Object.keys(TicketPriority).map((key) => (
                <Select.Item key={key} value={key}>
                  {capitalize(key)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
      </div>
      <div className="w-full">
        <label>
          <Text as="div" size="2" mb="1">
            Due To
          </Text>
          <DatePicker date={formik.values.dueTo || undefined} setDate={(date) => formik.setFieldValue("dueTo", date)} />
        </label>
      </div>
      <div className="w-full">
        <label>
          <Text as="div" size="2" mb="1">
            Description
          </Text>
          <TextArea
            id="description"
            variant="soft"
            placeholder="Ticket description"
            className="w-full rounded-lg border border-slate-100"
            name="description"
            rows={10}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="pl-2 text-sm text-red-500 !mt-1">{formik.errors.description}</p>
          )}
        </label>
      </div>

      <div className="flex justify-center w-full space-x-4">
        <Dialog.Close>
          <Button variant="soft" size="3" color="gray" className="cursor-pointer">
            Cancel
          </Button>
        </Dialog.Close>
        <Button loading={loading} size="3" className="cursor-pointer" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
