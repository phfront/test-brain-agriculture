import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

test("renders Button component and calls action on click", () => {
  const mockAction = jest.fn();
  const buttonLabel = "Click me";

  render(<Button label={buttonLabel} action={mockAction} />);

  // Verifica se o componente de botão é renderizado com o texto correto
  const buttonElement = screen.getByText(buttonLabel);
  expect(buttonElement).toBeInTheDocument();

  // Simula um clique no botão
  fireEvent.click(buttonElement);

  // Verifica se a função action foi chamada
  expect(mockAction).toHaveBeenCalled();
});

test("renders disabled Button and does not call action on click", () => {
  const mockAction = jest.fn();
  const buttonLabel = "Do not click me";

  render(<Button label={buttonLabel} action={mockAction} disabled={true} />);

  // Verifica se o componente de botão é renderizado com o texto correto
  const buttonElement = screen.getByText(buttonLabel);
  expect(buttonElement).toBeInTheDocument();

  // Simula um clique no botão
  fireEvent.click(buttonElement);

  // Verifica se a função action não foi chamada devido ao botão estar desabilitado
  expect(mockAction).not.toHaveBeenCalled();
});