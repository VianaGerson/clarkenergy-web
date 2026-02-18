import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import CompanyCard from "./CompanyCard";

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

interface SimulationResultsProps {
  result: SimulationResult | null;
  loading: boolean;
  clearForm: () => void;
}

export default function SimulationResults({
  result,
  loading,
  clearForm,
}: SimulationResultsProps) {
  const [activeTab, setActiveTab] = useState("TODOS");
  
  const companiesGD =
    result?.companies.filter((company) => company.type === "GD") || [];
  const companiesML =
    result?.companies.filter((company) => company.type === "Mercado Livre") || [];
    [];
  
  const getBestEconomy = (list: SimulationResult["companies"]) => {
    if (list.length === 0) return null;

    return list.reduce((prev, current) =>
      prev.estimate_economy >= current.estimate_economy ? prev : current,
    );
  };

  const bestGD = getBestEconomy(companiesGD);
  const bestML = getBestEconomy(companiesML);

  return result != null ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Preço base do estado:{" "}
        <b>
          R${" "}
          {Number(result.base_price).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </b>
      </Typography>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        centered
        variant="fullWidth"
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Todos" value="TODOS" />
        <Tab label="Geração Distribuída" value="GD" />
        <Tab label="Mercado Livre" value="ML" />
      </Tabs>

      {activeTab !== "TODOS" && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: "success.light",
            borderRadius: 2,
            color: "success.contrastText",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            💡 MELHOR ECONOMIA EM{" "}
            {activeTab === "GD" ? "GERAÇÃO DISTRIBUÍDA" : "MERCADO LIVRE"}:
          </Typography>
          <Typography variant="h5">
            R${" "}
            {activeTab === "GD"
              ? bestGD?.estimate_economy
              : bestML?.estimate_economy}
            <small>
              {" "}
              (
              {activeTab === "GD"
                ? bestGD?.economy_percentual
                : bestML?.economy_percentual}
              %)
            </small>
          </Typography>
        </Box>
      )}
      <Box>
        {(() => {
          let listToShow = result.companies;
          if (activeTab === "GD") listToShow = companiesGD;
          if (activeTab === "ML") listToShow = companiesML;

          if (listToShow.length === 0) {
            return (
              <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                Nenhum fornecedor encontrado para esta categoria.
              </Typography>
            );
          }

          return listToShow.map((company, idx) => (
            <CompanyCard
              key={idx}
              company={company}
              isBest={
                (activeTab === "GD" && company === bestGD) ||
                (activeTab === "ML" && company === bestML)
              }
            />
          ));
        })()}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => clearForm()}
        disabled={loading}
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
    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
      Faça uma simulação para ver os resultados aqui.
    </Typography>
  );
}
