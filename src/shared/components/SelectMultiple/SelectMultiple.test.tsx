import { render, screen, fireEvent } from "@testing-library/react";
import SelectMultiple from "./index";
import { SelectOption } from "../../types/select.type";

const options: SelectOption[] = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

test("renders SelectMultiple component with placeholder", () => {
  const mockSetValue = jest.fn();
  render(
    <SelectMultiple
      value={[]}
      setValue={mockSetValue}
      options={options}
      placeholder="Select multiple options"
    />
  );

  // Verifica se o placeholder é exibido corretamente
  const placeholderElement = screen.getByText("Select multiple options");
  expect(placeholderElement).toBeInTheDocument();
});

test("opens dropdown and selects multiple options", () => {
  const mockSetValue = jest.fn();
  render(
    <SelectMultiple
      value={[]}
      setValue={mockSetValue}
      options={options}
      placeholder="Select multiple options"
    />
  );

  // Clica para abrir o dropdown
  const selectBox = screen
    .getByText("Select multiple options")
    .closest(".flex");
  fireEvent.click(selectBox as Element);

  // Verifica se as opções são exibidas
  const option1 = screen.getByText("Option 1").closest(".flex");
  const option2 = screen.getByText("Option 2").closest(".flex");
  expect(option1).toBeInTheDocument();
  expect(option2).toBeInTheDocument();

  // Clica em duas opções
  fireEvent.click(option1 as Element);
  fireEvent.click(option2 as Element);

  // Verifica se a função setValue foi chamada com as opções corretas
  expect(mockSetValue).toHaveBeenCalledTimes(2);
  expect(mockSetValue).toHaveBeenNthCalledWith(1, [options[0]]);
});
