import { Avatar, Box, Card, Chip, Rating, Typography } from "@mui/material";

interface CompanyResult {
  name: string;
  logo: string;
  type: string;
  price_kwh: number;
  total_customers: number;
  rates: number;
  estimate_economy: number;
  economy_percentual: number;
}

interface CompanyCardProps {
  company: CompanyResult;
  isBest: boolean;
}

export default function CompanyCard({ company, isBest }: CompanyCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        position: "relative",
      }}
    >
      {isBest && (
        <Chip
          label="Melhor Escolha"
          color="success"
          size="small"
          sx={{ position: "absolute", top: 10, right: 10 }}
        />
      )}

      <Avatar
        src={company.logo}
        variant="square"
        alt={company.name}
        sx={{ width: 74, height: 74, mr: 2 }}
      />
      <Box>
        <Typography variant="h6">{company.name}</Typography>
        <Chip
          label={company.type}
          size="small"
          variant="outlined"
          color={
            company.type === "GD" ? "primary" : "secondary"
          }
        />
        <Typography variant="body2">
          Preço kWh: <b>R$ {company.price_kwh}</b>
        </Typography>
        <Typography variant="body2">
          Clientes: {company.total_customers}
        </Typography>
        <Rating
          value={Number(company.rates)}
          precision={0.5}
          readOnly
          size="small"
        />
        <Typography
          variant="body2"
          color="success.main"
          sx={{ fontWeight: "bold", mt: 1 }}
        >
          Economia estimada: R$ {company.estimate_economy} (
          {company.economy_percentual}%)
        </Typography>
      </Box>
    </Card>
  );
}