import React from "react";
import { Route, Switch } from "react-router";
import { FMain, FGrid } from "ferrum-design-system";
import Header from "./header/header";
import CasperSwap from "./pages/CasperSwap";
import { Withdrawals } from "./components/Withdrawals";
import { CasperAddLiquidity } from "./pages/CasperAddLiquidity";

const BaseRoutes = () => {
  return (
    <>
      <Header />
      <FMain>
        <Switch>
          <Route path="/withdraw" component={() => (
            <FGrid spacing={13}>
              <Withdrawals /> 
            </FGrid>
          )}></Route>
          <Route path="/liquidity" component={() => (
            <FGrid spacing={13}>
              <CasperAddLiquidity /> 
            </FGrid>
          )}></Route>
          <Route path="*" component={() =>
            <FGrid spacing={13}>
             <CasperSwap /> 
            </FGrid>
          }></Route>
        </Switch>
      </FMain>
    </>
  );
};
export default BaseRoutes;
