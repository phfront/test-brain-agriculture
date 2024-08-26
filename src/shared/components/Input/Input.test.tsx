import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./index";

test("renders Input component and updates value on change", () => {
  const mockSetValue = jest.fn();
  const placeholderText = "Enter text";

  render(<Input value="" setValue={mockSetValue} placeholder={placeholderText} />);

  // Verifica se o componente de entrada é renderizado com o placeholder correto
  const inputElement = screen.getByPlaceholderText(placeholderText);
  expect(inputElement).toBeInTheDocument();

  // Simula a digitação de um valor no campo de entrada
  fireEvent.change(inputElement, { target: { value: "Valor de teste" } });

  // Verifica se a função setValue foi chamada com o valor correto
  expect(mockSetValue).toHaveBeenCalledWith("Valor de teste");
});