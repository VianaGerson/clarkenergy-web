import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Simulation from '../../components/Simulation';
import axios from 'axios';

vi.mock('axios');

function selectOption(labelText: string | RegExp, optionText: string | RegExp) {
  fireEvent.mouseDown(screen.getByLabelText(labelText));
  fireEvent.click(screen.getByText(optionText));
}

describe('Simulation component', () => {
  it('envia o formulário e exibe resultado', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        base_price: 3650,
        companies: [
          {
            name: 'Vento Norte Potiguar',
            logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=vento_norte_potiguar',
            type: 'GD',
            price_kwh: 0.6,
            total_customers: 1100,
            rates: 4.75,
            estimate_economy: '550.00',
            economy_percentual: '15.07',
          },
        ],
      },
    });

    render(<Simulation />);
    selectOption(/Seu Estado/i, 'Rio Grande do Norte');
    fireEvent.change(screen.getByLabelText(/Consumo/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByRole('button', { name: /Fazer Simulação/i }));

    await waitFor(() => {
      expect(screen.getByText(/Resultado da Simulação/i)).toBeInTheDocument();
      expect(screen.getByText(/Vento Norte Potiguar/i)).toBeInTheDocument();
      expect(screen.getByText(/Economia estimada/i)).toBeInTheDocument();
    });
  });

  it('permite nova simulação', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        base_price: 3650,
        companies: [
          {
            name: 'Clarke Energia Sul',
            logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=clarke_energia_sul',
            type: 'SP',
            price_kwh: 0.65,
            total_customers: 1100,
            rates: 4.75,
            estimate_economy: '550.00',
            economy_percentual: '15.07',
          },
        ],
      },
    });

    render(<Simulation />);
    selectOption(/Seu Estado/i, 'São Paulo');
    fireEvent.change(screen.getByLabelText(/Consumo/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByRole('button', { name: /Fazer Simulação/i }));

    await waitFor(() => {
      expect(screen.getByText(/Resultado da Simulação/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Nova Simulação/i }));
    expect(screen.getByText(/Preencha seus dados para fazer a simulação/i)).toBeInTheDocument();
  });
});