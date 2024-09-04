import { CardTypeEnum } from "@/types/card-type-enum.dto";
import { Button, Checkbox, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import classes from "./ContainedInput.module.css";
import { zodResolver } from "mantine-form-zod-resolver";

const schema = z.object({
  cardType: z.nativeEnum(CardTypeEnum, {
    errorMap: () => ({ message: "Please select a card type" }),
  }),
  email: z.string().email({ message: "Invalid email" }),
  age: z.number().min(18, {
    message: "You must be at least 18 to create an account",
  }),
});

const generateCardTypeOptions = () => [
  {
    label: "Character",
    value: CardTypeEnum.CHARACTER,
  },
  {
    label: "Action",
    value: CardTypeEnum.ACTION,
  },
];

export function Form() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      cardType: "", // Initial value is empty to ensure selection
      email: "",
      termsOfService: false,
    },

    validate: zodResolver(schema),
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={generateCardTypeOptions()}
        placeholder="Pick one"
        label="Choose card type"
        classNames={classes}
        {...form.getInputProps("cardType")}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key("termsOfService")}
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
