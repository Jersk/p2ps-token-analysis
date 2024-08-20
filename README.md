# :lock: P2P Solutions Foundation (P2PS) Token Analysis and Transaction Execution
## :memo: Overview

This project documents an in-depth analysis and attempted transaction execution involving the P2P Solutions Foundation (P2PS) token smart contract on the Ethereum blockchain. The primary goal was to rescue tokens from a compromised wallet by executing a transfer to a secure wallet while covering the gas fees from a separate, safe wallet. This approach required batching operations to ensure the transaction's success without exposing the compromised wallet to further risks.

Despite my best efforts, the token transfer was unsuccessful, likely due to restrictions embedded within the smart contract by its owner. This project highlights the challenges of interacting with potentially malicious or restrictive smart contracts and provides insights into using tools like Flashbots for secure and private transactions.

You can view the P2PS token smart contract on Etherscan [HERE](https://etherscan.io/address/0x4527a3B4A8A150403090a99b87efFC96F2195047#code).

## :open_file_folder: Project Structure
```plaintext
p2ps-token-transfer/
├── index.js
├── contractABI.json
├── package.json
├── README.md
└── .gitignore
```
- **`index.js`**: The main script that handles the interaction with the P2PS token contract.
- **`contractABI.json`**: The ABI of the P2PS token contract.
- **`package.json`**: Contains project dependencies and scripts.
- **`README.md`**: Detailed documentation (this file).
- **`.gitignore`**: Specifies files to be ignored by Git.

## :clipboard: Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Access to Ethereum Mainnet RPC endpoint** (e.g., Alchemy, Infura)
- **Flashbots Provider** setup

## :gear: Setup and Execution

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/p2ps-token-transfer.git
cd p2ps-token-transfer
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following variables:
```env
ALCHEMY_URL = https://eth-mainnet.alchemyapi.io/v2/your-api-key
SAFE_WALLET_PRIVATE_KEY = your_safe_wallet_private_key
COMPROMISED_WALLET_PRIVATE_KEY = your_compromised_wallet_private_key
DESTINATION_ADDRESS = your_destination_address
```

### 4. Run the Script
```bash
npm start
```

## :hammer_and_wrench: Methodology
### 1. Setting Up the Environment
   * **Safe Wallet:** Used to cover gas fees, ensuring the compromised wallet doesn't need ETH, thereby reducing exposure.Used to cover gas fees, ensuring the compromised wallet doesn't need ETH, thereby reducing exposure.
   * **Compromised Wallet:** Holds the P2PS tokens; the goal was to securely transfer these tokens to a safe wallet.
   * **Flashbots:** Utilized to bundle the transactions into a single block, protecting against front-running and other malicious actions.

### 2. Interacting with the P2PS Smart Contract
   * Loaded the P2PS contract ABI and created a contract instance using `ethers.js`.
   * Verified the transfer function's availability and attempted to transfer tokens using multiple methods.

### 3. Error Handling and Debugging
   * Logged all steps and errors for detailed troubleshooting.
   * Attempted various methods, including static calls and manual transaction encoding, to execute the transfer.

<details>

<summary>Terminal Output example</summary>

```bash
   jersk@sjesk:~/p2ps-token-analysis$ npm start

> p2ps-token-analysis@1.0.0 start
> node index.js

Contract instance keys:  [ 'target', 'interface', 'runner', 'filters', 'fallback' ]
Available functions: [
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'freezeTransfers',
    constant: false,
    outputs: [],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'name',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType], [ParamType] ],
    name: 'approve',
    constant: false,
    outputs: [ [ParamType] ],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType] ],
    name: 'setOwner',
    constant: false,
    outputs: [],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'transferFrom',
    constant: false,
    outputs: [ [ParamType] ],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'decimals',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'unfreezeTransfers',
    constant: false,
    outputs: [],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType] ],
    name: 'balanceOf',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType] ],
    name: 'createTokens',
    constant: false,
    outputs: [ [ParamType] ],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'refundTokens',
    constant: false,
    outputs: [],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'owner',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [],
    name: 'symbol',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType], [ParamType] ],
    name: 'transfer',
    constant: false,
    outputs: [ [ParamType] ],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType], [ParamType] ],
    name: 'allowance',
    constant: true,
    outputs: [ [ParamType] ],
    stateMutability: 'view',
    payable: false,
    gas: null
  },
  FunctionFragment {
    type: 'function',
    inputs: [ [ParamType], [ParamType] ],
    name: 'freezeAccount',
    constant: false,
    outputs: [],
    stateMutability: 'nonpayable',
    payable: false,
    gas: null
  },
  ConstructorFragment {
    type: 'constructor',
    inputs: [],
    payable: false,
    gas: null
  },
  EventFragment {
    type: 'event',
    inputs: [],
    name: 'Freeze',
    anonymous: false
  },
  EventFragment {
    type: 'event',
    inputs: [],
    name: 'Unfreeze',
    anonymous: false
  },
  EventFragment {
    type: 'event',
    inputs: [ [ParamType], [ParamType] ],
    name: 'FrozenFunds',
    anonymous: false
  },
  EventFragment {
    type: 'event',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'RefundTokens',
    anonymous: false
  },
  EventFragment {
    type: 'event',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'Transfer',
    anonymous: false
  },
  EventFragment {
    type: 'event',
    inputs: [ [ParamType], [ParamType], [ParamType] ],
    name: 'Approval',
    anonymous: false
  }
]
Balance of compromised wallet: 85000000000
Attempting callStatic transfer...
Static call failed: TypeError: Cannot read properties of undefined (reading 'transfer')
    at main (/home/jersk/p2ps-token-analysis/index.js:38:54)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
Attempting transfer using p2pContract.functions.transfer...
Function transfer call failed: TypeError: Cannot read properties of undefined (reading 'transfer')
    at main (/home/jersk/p2ps-token-analysis/index.js:50:56)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
Attempting manual transfer transaction encoding...
Raw transaction data: {
  to: '0x0000000000000000000000000000000000000000',
  data: '0x0000000000000000000000000000000000000000000000000000000000000000',
  gasLimit: 100000,
  gasPrice: 20000000000n
}
Signed transaction: 0x0000000000000000000000000000000000000000000000000000000000000000
Failed to execute transfer transaction: Error: Request failed with status 400 (URL: https://relay.flashbots.net): {"error":"unable to decode txs"}
    at FlashbotsBundleProvider.request (/home/jersk/p2ps-token-analysis/node_modules/@flashbots/ethers-provider-bundle/build/index.js:803:19)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async FlashbotsBundleProvider.sendRawBundle (/home/jersk/p2ps-token-analysis/node_modules/@flashbots/ethers-provider-bundle/build/index.js:165:26)
    at async main (/home/jersk/p2ps-token-analysis/index.js:82:32)

```

</details>

## :dart: Context and Objectives
Given the compromised state of the wallet holding the P2PS tokens, direct interaction with the Ethereum blockchain posed significant risks, including potential token loss or further exposure to malicious actors. To mitigate these risks, we devised a strategy to:
* **Cover Gas Fees from a Separate Wallet:** Use the safe wallet to pay for gas fees, ensuring the compromised wallet doesn't need to hold ETH.
* **Batch Operations:** Execute the transfer and payment in a single bundled transaction using Flashbots, ensuring the entire operation is executed atomically.

Despite these precautions, the transfer attempts were thwarted by the smart contract's internal mechanisms, likely controlled by the contract owner.

## :bar_chart: Observations and Results
* **Balance Retrieval:** Successfully retrieved the token balance from the compromised wallet.
* **Transfer Function:** While the transfer function exists, all attempts to execute it failed, suggesting possible restrictions within the contract.

## :pushpin: Conclusions
* **Transfer Restrictions:** The contract likely includes mechanisms that prevent unauthorized transfers, possibly through a global freeze or specific account restrictions.
* **Transparency Issues:** The lack of accessible functions to verify the freeze status makes it difficult for token holders to understand why transactions are failing.
* **Potential Scam Indicators:** The owner of the contract has significant control over token transfers, raising concerns about the contract's intentions.
Recommendations
* **Avoid Interacting with P2PS Token:** Given the findings, it is advisable to exercise caution and avoid engaging with P2PS tokens until more transparency is provided.
* **Report Suspicious Activity:** Consider reporting the contract to blockchain monitoring services for further investigation.
* **Caution with Similar Contracts:** Be vigilant when dealing with contracts that allow owners to unilaterally control key functions like token transfers.
* **Perform Due Diligence:** Always review and understand smart contract codes before engaging in transactions, particularly for significant assets.

## :warning: Disclaimer
The analysis and conclusions provided in this project are based on my personal observations and should not be considered definitive or without error. The use of this code is for educational purposes only, and I am not responsible for any outcomes resulting from its use.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## :page_facing_up: License

[MIT](https://opensource.org/license/mithttps://opensource.org/license/mit)

# :coffee: Buy me a Coffee
> [!TIP]
> If you found this project helpful and want to support me, feel free to send a coffee to my Ethereum address: 0xF5A295862D2A04101Fc88c97b16feA4bF2502e28
