"use client";
export interface FinancialData {
  ticker: string;
  market_ap: number;
  shares_outstanding: number;
  pe_ratio: number;
  ps_ratio: number;
  pb_ratio: number;
  peg_ratio: number;
  current_ratio: number;
  debt_to_equity_ratio: number;
  eps: number;
  news: {
    [article: string]: {
      sentiment: {
        score: number;
        value: string;
      };
      summary: string;
    };
  };
  analyst_estimates: {
    [analyst: string]: number;
  };
}
