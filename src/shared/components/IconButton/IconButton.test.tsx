import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./index";

test("renders IconButton component with an icon and calls action on click", () => {
  const mockAction = jest.fn();
  const TestIcon = <span data-testid="test-icon">👍</span>;

  render(<IconButton Icon={TestIcon} action={mockAction} />);

  // Verifica se o ícone é renderizado corretamente
  const iconElement = screen.getByTestId("test-icon");
  expect(iconElement).toBeInTheDocument();

  // Verifica se o botão é renderizado corretamente
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();

  // Simula um clique no botão
  fireEvent.click(buttonElement);

  // Verifica se a função action foi chamada
  expect(mockAction).toHaveBeenCalled();
});

test("applies custom class name to IconButton", () => {
  const mockAction = jest.fn();
  const customClass = "custom-class";
  const TestIcon = <span data-testid="test-icon">👍</span>;

  render(<IconButton Icon={TestIcon} action={mockAction} className={customClass} />);

  // Verifica se o botão possui a classe customizada
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveClass(customClass);
});