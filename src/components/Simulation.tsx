import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Simulation() {
  const [uf, setUf] = useState("");
  const [consumekWh, setConsumekWh] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await axios
      .post(`${APIURL}/economy/simulate_economy`, { uf, consumekWh })
      .then((response) => {
        console.log("Simulation Result:", response.data);
        setResult(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const clearForm = () => {
    setUf("");
    setConsumekWh("");
    setResult(null);
  };

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
    <Container id="simulation" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <img src={"/economy.webp"} height={581} />
        </Box>
        <Box>
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, minWidth: 600, height: "100%" }}
          >
            <Box sx={{ width: { sm: "100%", md: "100%" } }}>
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 200,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : result ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    gutterBottom
                    sx={{ color: "text.primary", fontWeight: "bold" }}
                  >
                    Resultado da Simulação
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Preço base do estado: <b>R$ {Number(result.base_price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</b>
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {result.companies && result.companies.length > 0 ? (
                    result.companies.map((item, idx) => (
                      <Card key={idx} variant="outlined" sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={item.logo} variant="square" alt={item.name} sx={{ width: 74, height: 74, mr: 2 }} />
                        <Box>
                          <Typography variant="h6">{item.name}</Typography>
                          <Typography variant="body2">Tipo: {item.type}</Typography>
                          <Typography variant="body2">Preço kWh: <b>R$ {item.price_kwh}</b></Typography>
                          <Typography variant="body2">Clientes: {item.total_customers}</Typography>
                          <Rating
                            value={Number(item.rates)}
                            precision={0.5}
                            readOnly
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="body2" color="success.main">
                            Economia estimada: <b>R$ {item.estimate_economy}</b> ({item.economy_percentual}%)
                          </Typography>
                        </Box>
                      </Card>
                    ))
                  ) : (
                    <Typography color="error">Nenhuma empresa disponível para este estado.</Typography>
                  )}
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => clearForm()}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: 18,
                        py: 1.5,
                        mt: 3,
                      }}
                    >
                    Nova Simulação
                  </Button>
                </Box>
              ) : (
                <form
                  onSubmit={handleSubmit}
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
                    Vamos precisar apenas de alguns dados para saber o potencial de
                    economia no mercado livre de energia.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column"
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
                          onChange={(e) => setUf(e.target.value)}
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
                        onChange={(e) => setConsumekWh(e.target.value)}
                        required
                        margin="normal"
                      />
                    </Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: 18,
                        py: 1.5,
                        mt: 3,
                      }}
                    >
                      Fazer Simulação
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
