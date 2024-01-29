import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TGlobalFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};

const GlobalForm = ({ onSubmit, children }: TGlobalFormProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>;
    </FormProvider>
  );
};

export default GlobalForm;
