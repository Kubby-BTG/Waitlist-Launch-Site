import { z, ZodType } from 'zod';

interface IReturnedZodError {
  fieldName: string;
  originalError: string;
  formatedError?: string;
}

type IReturnedData<T> =
  | {
      errors: IReturnedZodError[];
      firstError: string;
      validatedData?: undefined;
    }
  | {
      validatedData: any;
      errors?: undefined;
      firstError?: undefined;
    };

class ZodValidationHelperBase {
  validate<T = any>({ schema, input }: { schema: ZodType; input: T }): IReturnedData<T> {
    const validatedResult = schema.safeParse(input);

    if (!validatedResult.success) {
      const errors: IReturnedZodError[] = [];
      const fieldErrors = validatedResult?.error?.formErrors?.fieldErrors;

      if (fieldErrors) {
        Object.keys(fieldErrors).forEach((fieldName) => {
          const value = fieldErrors[fieldName]?.[0];
          if (value) {
            const out01: IReturnedZodError = {
              fieldName,
              originalError: value,
            };

            if (value === 'Required') {
              out01.formatedError = `${fieldName} is Required`;
            } else {
              // out01.formatedError = `${fieldName}::${value}`;
              out01.formatedError = `${value}`;
            }

            errors.push(out01);
          }
        });
      }
      return {
        errors,
        firstError: errors?.[0].formatedError || errors?.[0].originalError || 'Error occured',
      };
    }
    return { validatedData: validatedResult.data as T };
  }

  getPhoneSchema(message?: string) {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return z.string().regex(regex, message);
  }
}

export const ZodValidationHelper = new ZodValidationHelperBase();

// const User = z.object({
//   username: z.string(),
// });

// type User = z.infer<typeof User>;

// ZodValidationHelper.validate(User, { username: "" });
