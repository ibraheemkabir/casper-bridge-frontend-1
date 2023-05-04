import React, { useEffect, useState } from "react";
import {
  FButton,
  FCard,
  FInputText,
  FItem,
  //   FResponseBar,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as BrandIcon } from "../assets/images/brand-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import toast from "react-hot-toast";
import { CasperClient, CasperServiceByJsonRPC, CLPublicKey, CLValueBuilder, decodeBase16, DeployUtil, RuntimeArgs, Signer } from "casper-js-sdk";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import TxProcessingDialog from "../dialogs/TxProcessingDialog";

// interface CardSubmitStakeProps {
//   walletConnected?: boolean;
// }


const RPC_API = "http://44.208.234.65:7777/rpc";

const casperService = new CasperServiceByJsonRPC(RPC_API);
const casperClient = new CasperClient(RPC_API);

const WidthCardSubmit = () => {
  const { stakingId }: any = useParams();
  console.log(stakingId);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [processMsg, setProcessMsg] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { connect: { selectedAccount, isWalletConnected, signedAddresses, config } } = useSelector((state: any) => state.casper);

  useEffect(() => {
    if (
      !isWalletConnected ||
      selectedAccount === undefined
    ) {
      history.push(`/${stakingId}`);
    }
    // eslint-disable-next-line
  }, [isWalletConnected, selectedAccount, signedAddresses]);

  const isAddressSigned = () => {
    if (signedAddresses[`${stakingId}`]?.length) {
      const result = signedAddresses[`${stakingId}`]?.find((address: any) => address === selectedAccount.address);
      if (result) {
        return true;
      }
    }
    return false;
  };

  const performWithdraw = async () => {
    if (
      isWalletConnected &&
      selectedAccount
    ) {
      try {
        if (amount && Number(amount) > 0) {
          const publicKeyHex = selectedAccount?.address;
          const senderPublicKey = CLPublicKey.fromHex(publicKeyHex);

          const deployParams = new DeployUtil.DeployParams(
            senderPublicKey,
            'casper-test'
          );

          const args = RuntimeArgs.fromMap({
            "amount": CLValueBuilder.u256(amount),
            'staking_contract_package_hash': CLValueBuilder.string(`63752072046fa449810f4151d8998a305f6949321225a01ff0b576968643f1e4`)
          });

          const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            decodeBase16('d6428a288740e81ab6f30e792b958ae8b755dc369747f120f669656219f81994'),
            'withdraw',
            args
          );

          const payment = DeployUtil.standardPayment(50000000000);

          const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

          const deployJson: any = DeployUtil.deployToJson(deploy);

          Signer.sign(deployJson, publicKeyHex).then(async (signedDeployJson) => {
            const signedDeploy = DeployUtil.deployFromJson(signedDeployJson);
            console.log(signedDeploy)
            if (signedDeploy.ok) {
              const res = await casperClient.putDeploy(signedDeploy.val);
              console.log(res, 'resres');
              setProcessMsg(res)
              setLoading(false)
              setShowConfirmation(true)
            }
            
          });

          //history.push(`/${stakingId}`);
          toast.success(`${amount} tokens are unstaked successfully`);
        } else {
          toast.error("Amount must be greater than 0");
        }
      } catch (e) {
        console.log("ERROR : ", e);
        toast.error("An error occured please see console for details");
        history.push(`/${stakingId}`);
      }
    } else {
        history.push(`/${stakingId}`);
    }
  };

  return (
    <React.Fragment>
      <FCard className={"card-submit-stake f-mb-2"}>
        <FItem display={"flex"} className="f-mb-2">
          <FItem bgColor="#1F2128" size={70} className="f-p--8 f-mr-1" display={"flex"} alignX="center" alignY={"center"}>
            <BrandIcon />
          </FItem>
          <FItem className={"f-ml-1"}>
            <FTypo size={24} color="white" className={"f-mt--4"}>
              Title Pool
            </FTypo>
            <FTypo size={12} color="white">
              POOL TYPE
            </FTypo>
          </FItem>
        </FItem>
        <FInputText
          className={"f-mt-2"}
          label={"AMOUNT TO WITHDRAW"}
          placeholder={"0"}
          value={amount}
          onChange={(e: any) => {
            e.preventDefault();
            const re = /^-?\d*\.?\d*$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setAmount(e.target.value);
            }
          }}
          postfix={
            <FTypo className={"f-pr-1"} color="#dab46e">
              TOKEN
            </FTypo>
          }
        />
        {/* <FInputText
          className={"f-mt-2"}
          label={"AVAILABLE BALANCE"}
          placeholder={"0"}
          onChange={(e: any) => console.log(e.target.value)}
          disabled={true}
        />
        <FInputText
          className={"f-mt-2"}
          label={"REMAINING FROM CAP"}
          placeholder={"0"}
          onChange={(e: any) => console.log(e)}
          disabled={true}
        /> */}

        {/* <FResponseBar
          variant="error"
          title="Could send a sign request. Not enough balance."
          className="f-mb-0"
          show={true}
        ></FResponseBar> */}
        <FButton
          title={'Withdraw'}
          className="w-100 f-mt-2"
          onClick={performWithdraw}
        />
      </FCard>
      <ConfirmationDialog onHide={() =>setShowConfirmation(false)} transaction={processMsg} message={'Transaction sent to network and is processing.'} show={showConfirmation} />
      <TxProcessingDialog onHide={() =>setLoading(false)} message={ processMsg || "Transaction Processing...."} show={loading}/>
    </React.Fragment>
  );
};
export default WidthCardSubmit;
