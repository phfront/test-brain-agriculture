import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./index";
import { SelectOption } from "../../types/select.type";

const options: SelectOption[] = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

test("renders Select component with placeholder", () => {
  const mockSetValue = jest.fn();
  render(
    <Select
      value={null}
      setValue={mockSetValue}
      options={options}
      placeholder="Select an option"
    />
  );

  // Verifica se o placeholder é exibido corretamente
  const placeholderElement = screen.getByText("Select an option");
  expect(placeholderElement).toBeInTheDocument();
});

test("opens dropdown and selects an option", () => {
  const mockSetValue = jest.fn();
  render(
    <Select
      value={null}
      setValue={mockSetValue}
      options={options}
      placeholder="Select an option"
    />
  );

  // Clica para abrir o dropdown
  const selectBox = screen.getByText("Select an option").closest(".flex");

  fireEvent.click(selectBox as Element);

  // Verifica se as opções são exibidas
  const optionElement = screen.getByText("Option 2").closest(".flex");
  expect(optionElement).toBeInTheDocument();

  // Clica em uma opção
  fireEvent.click(optionElement as Element);

  // Verifica se a função setValue foi chamada com o valor correto
  expect(mockSetValue).toHaveBeenCalledWith(2);

  // Verifica se o dropdown foi fechado
  expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
});

test("renders with a label and checks if it is displayed", () => {
  const mockSetValue = jest.fn();
  render(
    <Select
      value={null}
      setValue={mockSetValue}
      options={options}
      label="Test Label"
    />
  );

  // Verifica se o rótulo é exibido corretamente
  const labelElement = screen.getByText("Test Label");
  expect(labelElement).toBeInTheDocument();
});
