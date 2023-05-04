import React, { useEffect, useState } from "react";
import {
  FButton,
  FTable,
  FContainer,
  FItem,
  FTypo,
  // FLoader,
  FDialog,
  FGrid,
  FGridItem,
  FInputText,
  // FLoader,
} from "ferrum-design-system";
import Datatable from "react-bs-datatable";
import { useDispatch, useSelector } from "react-redux";
// import * as stakingActions from "../redux/reducers/staking/stakingAction";
import { useForm } from "react-hook-form";

// Create table headers consisting of 4 columns.
const header = [
  { title: "Token Address", prop: "tokenAddress" },
  { title: "Staking Capital", prop: "stakingCapital" },
  { title: "Staking Starts", prop: "stakingStarts" },
  { title: "Staking Ends", prop: "stakingEnds" },
  { title: "Withdraw Starts", prop: "withdrawStarts" },
  { title: "Withdraw Ends", prop: "withdrawEnds" },
  { title: "App ID", prop: "appId" },
  { title: "Contract Address", prop: "encodedAddress" },
  { title: "Action", prop: "action" },
];

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.

const initialValues = {
  rewardAmount: "",
  withdrawableAmount: "",
};

export const Table = ({ list }: any) => {
  const dispatch: any = useDispatch();
  const [body, setBody] = useState<Array<any>>([]);
  //const { actionLoading } = useSelector((state: any) => state.staking);
  const [stakingIdForReward, setStakingIdForReward] = useState<any>(undefined);
  // const [showMessage, setShowMessage] = useState(false);

  const {
    reset,
    register,
    // control,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    if (list && list.length) {
      // console.log(list);

      let sortedArray = list.slice().sort((a: any, b: any) => {
        return +new Date(b.updatedAt) - +new Date(a.updatedAt);
      });
      let deployed: any[] = [];
      let rest: any[] = [];
      sortedArray.slice().forEach((item: any) => {
        if (item.status === "DEPLOY") {
          deployed.push(item);
        } else {
          rest.push(item);
        }
      });
      let formatedResult = [...deployed, ...rest].map((item: any) => {
        return {
          tokenAddress: (
            <div data-label="Token Address">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.tokenAddress}</FTypo>
              </FItem>
            </div>
          ),
          stakingCapital: (
            <div data-label="Staking Capital">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.stakingCapital}</FTypo>
              </FItem>
            </div>
          ),
          stakingStarts: (
            <div data-label="Staking Starts">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.stakingStarts}</FTypo>
              </FItem>
            </div>
          ),
          stakingEnds: (
            <div data-label="Staking Ends">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.stakingEnds}</FTypo>
              </FItem>
            </div>
          ),
          withdrawStarts: (
            <div data-label="Withdraw Starts">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.withdrawStarts}</FTypo>
              </FItem>
            </div>
          ),
          withdrawEnds: (
            <div data-label="Withdraw Ends">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.withdrawEnds}</FTypo>
              </FItem>
            </div>
          ),
          appId: (
            <div data-label="App ID">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.appId ? item.appId : ""}</FTypo>
              </FItem>
            </div>
          ),
          encodedAddress: (
            <div data-label="Contract Address">
              <FItem display={"flex"}>
                <FTypo size={10}>{item.encodedAddress ? item.encodedAddress : ""}</FTypo>
              </FItem>
            </div>
          ),
          action: (
            <div data-label="Action">
              <FItem display={"flex"}>
                <FButton
                  title={
                    item.status === "CREATED"
                      ? "Deploy"
                      : item.status === "DEPLOY"
                      ? "Setup"
                      : item.status === "SETUP"
                      ? "Add Reward"
                      : item.status === "REWARD"
                      ? "OPEN APP"
                      : "Retry " + item.status.replace("FAIL_", " ").toLowerCase().replace("reward", "Add Reward")
                  }
                  disabled={false}
                  // style={{ backgroud: "red" }}
                  onClick={() => actionHandler(item)}
                />
              </FItem>
            </div>
          ),
        };
      });
      setBody(formatedResult);
    }
    // eslint-disable-next-line
  }, [list, false]);

  console.log(false);
  const actionHandler = (item: any) => {
    // if (item.encodedAddress) {
    //   dispatch(stakingActions.addRewardStaking(item._id));
    // } else

    if (item.status === "CREATED" || item.status === "FAIL_DEPLOY") {
      // dispatch(stakingActions.deployStaking(item._id));
    } else if (item.status === "DEPLOY" || item.status === "FAIL_SETUP") {
      // dispatch(stakingActions.setupStaking(item._id));
    } else if (item.status === "SETUP" || item.status === "FAIL_REWARD") {
      setStakingIdForReward(item._id);
    } else if (item.status === "REWARD") {
      window.open(`${process.env.REACT_APP_STAKING_APP_URL}/${item._id}`, "_blank", "noopener,noreferrer");
    }
  };

  const onSubmit = async (values: any) => {
    // dispatch(stakingActions.addRewardStaking(stakingIdForReward, values));
    reset(initialValues);
    setStakingIdForReward(undefined);
    // dispatch(
    //   stakingActions.createStaking({
    //     ...values,
    //     stakingStarts: moment(values.stakingStarts).format(),
    //     stakingEnds: moment(values.stakingEnds).format(),
    //     withdrawStarts: moment(values.withdrawStarts).format(),
    //     withdrawEnds: moment(values.withdrawEnds).format(),
    //   })
    // );
  };

  return (
    <FContainer type={"fluid"}>
      {/* <FCard variant={"futuristic-secondary"}> */}
      {/* {actionLoading ? (
        <FLoader loading={actionLoading}></FLoader>
      ) : ( */}
      {/* {showMessage && (
        <FResponseBar title="Contract deployed, Please fund this contract address with Algos to pay inner tx fee before setup." show={true} variant="success"></FResponseBar>
      )} */}
      <FTable>
        <Datatable tableHeaders={header} tableBody={body} rowsPerPage={10} />
      </FTable>
      {/* )} */}
      {/* </FCard> */}
      <FDialog title={"Add reward"} size={"medium"} show={stakingIdForReward} showClose={true} onHide={() => setStakingIdForReward(undefined)}>
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
          <FGrid className={"f-mt-1"}>
            <FGridItem>
              <FInputText
                label="Reward Amount"
                name="rewardAmount"
                type="text"
                className={"w-100"}
                placeholder="0"
                register={register}
                validations={{
                  required: {
                    value: true,
                    message: "Reward amount is required",
                  },
                }}
                error={errors["rewardAmount"]?.message ? errors["rewardAmount"]?.message : ""}
              />
            </FGridItem>
            <FGridItem>
              <FInputText
                label="Withdrawable Amount"
                name="withdrawableAmount"
                type="text"
                className={"w-100 f-mt-1"}
                placeholder="0"
                register={register}
                validations={{
                  required: {
                    value: true,
                    message: "Withdrawable amount is required",
                  },
                }}
                error={errors["withdrawableAmount"]?.message ? errors["withdrawableAmount"]?.message : ""}
              />
            </FGridItem>
            <FGridItem alignX={"end"}>
              <FButton
                type="submit"
                disabled={false}
                title={"Add Reward"}
                className={"f-mt-1 f-mb-2"}
                // postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
              ></FButton>
            </FGridItem>
          </FGrid>
        </form>
      </FDialog>
    </FContainer>
  );
};
