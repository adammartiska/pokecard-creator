import { CardTypeEnum } from "@/types/card-type-enum.dto";
import {
  Button,
  Checkbox,
  Group,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import classes from "./ContainedInput.module.css";
import { zodResolver } from "mantine-form-zod-resolver";
import { Divider } from "@mantine/core";

const schema = z.object({
  cardType: z.nativeEnum(CardTypeEnum, {
    errorMap: () => ({ message: "Please select a card type" }),
  }),
  name: z.string().min(1, { message: "Please enter character name" }),
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
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      style={{ height: "100%" }}
    >
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
        label="Name"
        placeholder="Enter name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Divider my="lg" />

      <TextInput
        label="Spell #1"
        placeholder="Enter spell"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Textarea
        label="Spell #1 desc"
        placeholder="Enter name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Divider my="lg" />

      <TextInput
        label="Spell #2"
        placeholder="Enter spell"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <Textarea
        label="Spell #2 desc"
        placeholder="Enter name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      {/* <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key("termsOfService")}
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      /> */}

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
