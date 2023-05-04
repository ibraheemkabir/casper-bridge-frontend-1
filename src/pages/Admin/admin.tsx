import React, { useEffect } from "react";
import { Header, InputForm, Table } from "../../components/admin";
import { FContainer } from "ferrum-design-system";
import { useDispatch, useSelector } from "react-redux";
// import * as stakingActions from "../redux/reducers/staking/stakingAction";

const AdminDashboard = () => {
  const dispatch: any = useDispatch();
  // const { stakingList } = useSelector((state: any) => state.staking);

  useEffect(() => {
    //dispatch(stakingActions.getStakingList());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <FContainer>
        <Header />
        <InputForm />
        {/* //<Table list={[]} /> */}
      </FContainer>
    </div>
  );
};

export default AdminDashboard;