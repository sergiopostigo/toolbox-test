import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'

import App from './App'

describe("Tests del componente App", () => {
  test("renderiza el componente App", () => {
    render(<App/>);
    expect(screen.getByText(/Results:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Send'})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {placeholder: 'Insert Text'})).toBeInTheDocument()

  });
})