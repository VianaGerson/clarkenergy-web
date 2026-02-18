import React, { useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";
import SimulationForm from "./SimulationForm";
import SimulationResults from "./SimulationResults";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface SimulationResult {
  base_price: number;
  companies: {
    name: string;
    logo: string;
    type: string;
    price_kwh: number;
    total_customers: number;
    rates: number;
    estimate_economy: number;
    economy_percentual: number;
  }[];
}

export default function Simulation() {
  const [uf, setUf] = useState("");
  const [consumekWh, setConsumekWh] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    await axios
      .post(`${API_URL}/economy/simulate_economy`, { uf, consumekWh })
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

  return (
    <Container id="simulation" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <img src={"/economy.webp"} style={{ width: '100%', maxWidth: 400, height: 'auto' }} />
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
                <SimulationResults
                  result={result}
                  loading={loading}
                  clearForm={clearForm}
                />
              ) : (
                <SimulationForm
                  uf={uf}
                  consumekWh={consumekWh}
                  onUfChange={setUf}
                  onConsumeChange={setConsumekWh}
                  onSubmit={handleSubmit}
                  loading={loading}
                />
              )}
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
