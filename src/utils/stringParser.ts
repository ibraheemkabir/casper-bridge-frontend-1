import { Buffer } from 'buffer';
import { CLValueBuilder } from "casper-js-sdk";

export const convertHashStrToHashBuff = (hashStr: string) => {
    let hashHex = hashStr;
    if (hashStr.startsWith("hash-")) {
        hashHex = hashStr.slice(5);
    }
    return Buffer.from(hashHex, "hex");
};

export const setContractHash = (contractHash: string) => {
    console.log(contractHash)
    return CLValueBuilder.key(
        CLValueBuilder.byteArray(convertHashStrToHashBuff(contractHash))
    );
}
