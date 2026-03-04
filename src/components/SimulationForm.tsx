import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

interface SimulationFormProps {
  uf: string;
  consumekWh: number;
  onUfChange: (value: string) => void;
  onConsumeChange: (value: number) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export default function SimulationForm({ uf, consumekWh, onUfChange, onConsumeChange, onSubmit, loading }: SimulationFormProps) {
  const states = [
    { uf: "AC", label: "Acre" },
    { uf: "AL", label: "Alagoas" },
    { uf: "AM", label: "Amazonas" },
    { uf: "AP", label: "Amapá" },
    { uf: "BA", label: "Bahia" },
    { uf: "CE", label: "Ceará" },
    { uf: "DF", label: "Distrito Federal" },
    { uf: "ES", label: "Espírito Santo" },
    { uf: "GO", label: "Goiás" },
    { uf: "MA", label: "Maranhão" },
    { uf: "MG", label: "Minas Gerais" },
    { uf: "MS", label: "Mato Grosso do Sul" },
    { uf: "MT", label: "Mato Grosso" },
    { uf: "PA", label: "Pará" },
    { uf: "PB", label: "Paraíba" },
    { uf: "PE", label: "Pernambuco" },
    { uf: "PI", label: "Piauí" },
    { uf: "PR", label: "Paraná" },
    { uf: "RJ", label: "Rio de Janeiro" },
    { uf: "RN", label: "Rio Grande do Norte" },
    { uf: "RO", label: "Rondônia" },
    { uf: "RR", label: "Roraima" },
    { uf: "RS", label: "Rio Grande do Sul" },
    { uf: "SC", label: "Santa Catarina" },
    { uf: "SE", label: "Sergipe" },
    { uf: "SP", label: "São Paulo" },
    { uf: "TO", label: "Tocantins" },
  ];

  return (
    <form
      onSubmit={onSubmit}
      id="simulation-form"
      style={{ height: "100%" }}
    >
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        sx={{ color: "text.primary", fontWeight: "bold" }}
      >
        Preencha seus dados para fazer a simulação
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", mb: { xs: 2, sm: 4 } }}
      >
        Vamos precisar apenas de alguns dados para saber o potencial
        de economia no mercado livre de energia.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="state-label">Seu Estado</InputLabel>
            <Select
              labelId="state-label"
              id="state-select"
              value={uf}
              label="Estado"
              onChange={(e) => onUfChange(e.target.value)}
            >
              {states.map((state) => (
                <MenuItem key={state.uf} value={state.uf}>
                  {state.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Consumo (kWh)"
            type="number"
            variant="filled"
            fullWidth
            value={consumekWh}
            onChange={(e) => onConsumeChange(Number(e.target.value))}
            required
            margin="normal"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            fontSize: 18,
            py: 1.5,
            mt: 3,
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Fazer Simulação"}
        </Button>
      </Box>
    </form>
  )
}