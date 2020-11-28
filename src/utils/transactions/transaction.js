/* global BigInt */
import { codec, cryptography, transactions } from "@liskhq/lisk-client";
import { getFullAssetSchema } from "../common";
import { fetchAccountInfo } from "../api";

export const createTransaction = async ({
                                          moduleId,
                                          assetId,
                                          baseFee = '0',
                                          passphrase,
                                          fee = null,
                                          networkIdentifier = '568b891c3e8a2d7b784d37365c99014634ab37202b2f9987dc14c769ee694672',
                                          assets,
                                          schema,
                                          nonce = null
                                        }) => {
    const {publicKey} = cryptography.getPrivateAndPublicKeyFromPassphrase(
      passphrase
    );
    const address = cryptography.getAddressFromPassphrase(passphrase);
    if (nonce === null) {
      const account = await fetchAccountInfo(address.toString("hex"));
      if (account?.sequence?.nonce) {
        nonce = account.sequence.nonce;
      } else {
        nonce = 0;
      }
    }
    const transactionObject = {
      moduleID: moduleId,
      assetID: assetId,
      nonce: BigInt(nonce),
      fee: BigInt(transactions.convertLSKToBeddows('0.01')),
      senderPublicKey: publicKey,
      asset: {
        ...assets
      }
    }
    const tx = transactions.signTransaction(
      schema,
      transactionObject,
      Buffer.from(networkIdentifier, "hex"),
      passphrase
    );
    if (fee === null) {
      const size = tx.getBytes().length;
      fee = BigInt(1000 * size);
    }

    if (typeof fee === 'string') {
      fee = BigInt(transactions.convertLSKToBeddows(fee));
    }

    const signedTransaction = transactions.signTransaction(
      schema,
      {...transactionObject, fee},
      Buffer.from(networkIdentifier, "hex"),
      passphrase
    );

    const {id, ...rest} = signedTransaction;
    return {
      id: id.toString("hex"),
      tx: codec.codec.toJSON(getFullAssetSchema(schema), rest),
      signedTransaction: signedTransaction,
    };
  }
;
