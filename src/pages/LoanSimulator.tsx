import {
    Box,
} from "@mui/material";

import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

import PageHeader from "../components/common/PageHeader";
import ActionButton from "../components/common/ActionButton";
import ClearableSelect from "../components/common/ClearableSelect";
import FormGrid from "../components/common/FormGrid";
import SectionCard from "../components/common/SectionCard";

import MoneyInput from "../components/common/inputs/MoneyInput";
import NumberInput from "../components/common/inputs/NumberInput";

import LoanSummaryCard from "../components/loans/LoanSummaryCard";

import type {
    LoanFrequency,
} from "../interfaces/loans/loan.interface";

import {
    loanFrequencyOptions,
    loanTermFrequencyOptions,
} from "../data/loanOptions";

import {
    useLoanSimulator,
} from "../hooks/loans/useLoanSimulator";

// Página principal del simulador de préstamos.
const LoanSimulator = () => {
    const {
        form,
        result,
        errors,
        hasFormChanges,

        handleChange,
        handleNumberChange,
        handleFormattedNumberChange,
        handleSimulate,
        handleClearForm,
    } = useLoanSimulator();

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <PageHeader
                title="Simulador de préstamos"
                subtitle="Calcula el interés, los réditos generados, el total a pagar, el número de cuotas y el valor de cada cuota."
                actions={
                    <>
                        <ActionButton
                            actionType="clear"
                            onClick={handleClearForm}
                            disabled={!hasFormChanges}
                        >
                            Limpiar
                        </ActionButton>

                        <ActionButton
                            actionType="custom"
                            startIcon={
                                <CalculateOutlinedIcon />
                            }
                            onClick={handleSimulate}
                        >
                            Calcular préstamo
                        </ActionButton>
                    </>
                }
            />

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 1fr) 360px",
                    },

                    gap: 2,

                    alignItems:
                        "start",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                    }}
                >
                    <SectionCard
                        title="Información del préstamo"
                    >
                        <FormGrid
                            columns={{
                                xs: "1fr",
                                sm: "repeat(3, minmax(0, 1fr))",
                                md: "repeat(2, minmax(0, 1fr))",
                                lg: "repeat(3, minmax(0, 1fr))",
                            }}
                        >
                            <MoneyInput
                                label="Monto prestado"
                                required
                                value={
                                    form.amount
                                }
                                error={
                                    Boolean(
                                        errors.amount
                                    )
                                }
                                helperText={
                                    errors.amount
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleFormattedNumberChange(
                                        "amount",
                                        value
                                    )
                                }
                            />

                            <NumberInput
                                label="% Interés"
                                required
                                value={
                                    form.interestRate
                                }
                                error={
                                    Boolean(
                                        errors.interestRate
                                    )
                                }
                                helperText={
                                    errors.interestRate
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleNumberChange(
                                        "interestRate",
                                        value
                                    )
                                }
                            />

                            <ClearableSelect
                                label="Frecuencia del interés"
                                value={
                                    form.interestFrequency
                                }
                                required
                                clearable
                                options={
                                    loanFrequencyOptions
                                }
                                error={
                                    errors.interestFrequency
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleChange(
                                        "interestFrequency",
                                        value as
                                        | LoanFrequency
                                        | ""
                                    )
                                }
                            />
                        </FormGrid>
                    </SectionCard>

                    <SectionCard
                        title="Plazo del préstamo"
                    >
                        <FormGrid
                            columns={{
                                xs: "1fr",
                                md: "repeat(2, minmax(0, 1fr))",
                            }}
                        >
                            <NumberInput
                                label="Plazo"
                                required
                                value={
                                    form.termValue
                                }
                                error={
                                    Boolean(
                                        errors.termValue
                                    )
                                }
                                helperText={
                                    errors.termValue
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleNumberChange(
                                        "termValue",
                                        value
                                    )
                                }
                            />

                            <ClearableSelect
                                label="Unidad del plazo"
                                value={
                                    form.termFrequency
                                }
                                required
                                clearable
                                options={
                                    loanTermFrequencyOptions
                                }
                                error={
                                    errors.termFrequency
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleChange(
                                        "termFrequency",
                                        value as
                                        | LoanFrequency
                                        | ""
                                    )
                                }
                            />
                        </FormGrid>
                    </SectionCard>

                    <SectionCard
                        title="Modalidad de pago"
                    >
                        <FormGrid
                            columns={{
                                xs: "1fr",
                                md: "repeat(3, minmax(0, 1fr))",
                            }}
                        >
                            <ClearableSelect
                                label="Frecuencia de pago"
                                value={
                                    form.paymentFrequency
                                }
                                required
                                clearable
                                options={
                                    loanFrequencyOptions
                                }
                                error={
                                    errors.paymentFrequency
                                }
                                onChange={(
                                    value
                                ) =>
                                    handleChange(
                                        "paymentFrequency",
                                        value as
                                        | LoanFrequency
                                        | ""
                                    )
                                }
                            />
                        </FormGrid>
                    </SectionCard>
                </Box>

                <Box
                    sx={{
                        position: {
                            xs: "static",
                            lg: "sticky",
                        },

                        top: {
                            lg: 16,
                        },
                    }}
                >
                    <LoanSummaryCard
                        result={result}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default LoanSimulator;