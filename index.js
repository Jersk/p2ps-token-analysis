/**
 * P2P Solutions Foundation (P2PS) Token Transfer Attempt
 *
 * Description:
 * This project involves analyzing and attempting to execute token transfers from a compromised wallet 
 * holding P2P Solutions Foundation (P2PS) tokens. The main objective is to transfer these tokens to a secure 
 * destination while covering the gas fees from a separate, safe wallet using the Flashbots service. 
 * The code leverages the ethers.js library for Ethereum interaction and Flashbots for secure transaction bundling.
 * 
 * Repository: https://github.com/Jersk/p2ps-token-transfer
 *
 * License:
 * This project is licensed under the MIT License.
 * For more details, see the LICENSE file in the repository or visit https://opensource.org/licenses/MIT
 *
 * Important Note:
 * This project is intended for educational purposes only. The findings and methods used here reflect 
 * the author's observations and are not guaranteed to be accurate or without error. The author does not 
 * take any responsibility for the misuse of this code or the consequences of using it. Use it responsibly.
 *
 * Author:
 * Jersk
 *
 * Version:
 * 1.0.0
 *
 * Last Updated:
 * 2024-08-20
 */


require('dotenv').config();  // Load environment variables from .env file
const { ethers, parseUnits } = require('ethers');
const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");

// Setting up the provider for Ethereum Mainnet using Alchemy
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);

// Private keys for the wallets (should be stored securely as environment variables)
const safeWallet = new ethers.Wallet(process.env.SAFE_WALLET_PRIVATE_KEY, provider);
const compromisedWallet = new ethers.Wallet(process.env.COMPROMISED_WALLET_PRIVATE_KEY, provider);

// Main function to execute the transfer
async function main() {
    // Initialize Flashbots provider for bundling transactions
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, safeWallet);

    // Contract address for P2P Solutions Foundation (P2PS) token and the destination address
    const P2P_CONTRACT_ADDRESS = "0x4527a3B4A8A150403090a99b87efFC96F2195047";
    const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;

    // Load the contract ABI from a separate JSON file
    const P2P_ABI = require('./contractABI.json');

    // Initialize the contract instance with the compromised wallet
    const p2pContract = new ethers.Contract(P2P_CONTRACT_ADDRESS, P2P_ABI, compromisedWallet);

    // Debugging: Display the keys and functions available in the contract instance
    console.log("Contract instance keys: ", Object.keys(p2pContract));
    console.log("Available functions:", p2pContract.interface.fragments);

    // Fetch and log the balance of the compromised wallet
    const balance = await p2pContract.balanceOf(compromisedWallet.address);
    console.log("Balance of compromised wallet:", balance.toString());

    // Attempt to perform a static call to check if transfer would succeed
    try {
        console.log("Attempting callStatic transfer...");
        const success = await p2pContract.callStatic.transfer(
            DESTINATION_ADDRESS,
            parseUnits("5", 8)
        );
        console.log("Static call success:", success);
    } catch (error) {
        console.error("Static call failed:", error);
    }

    // Attempt to execute the transfer using p2pContract.functions
    try {
        console.log("Attempting transfer using p2pContract.functions.transfer...");
        const txResponse = await p2pContract.functions.transfer(
            DESTINATION_ADDRESS,
            parseUnits("5", 8)
        );
        console.log("Transfer call success:", txResponse);
    } catch (error) {
        console.error("Function transfer call failed:", error);
    }

    // Manual encoding of the transfer transaction
    try {
        console.log("Attempting manual transfer transaction encoding...");
        const transferData = p2pContract.interface.encodeFunctionData("transfer", [
            DESTINATION_ADDRESS,
            parseUnits("5", 8)
        ]);

        // Create the transaction object with the necessary parameters
        const transferTx = {
            to: P2P_CONTRACT_ADDRESS,
            data: transferData,
            gasLimit: 100000,
            gasPrice: parseUnits("20", "gwei")
        };

        console.log("Raw transaction data:", transferTx);

        // Sign the transaction using the compromised wallet
        const signedTransferTx = await compromisedWallet.signTransaction(transferTx);
        console.log("Signed transaction:", signedTransferTx);

        // Send the signed transaction bundle via Flashbots
        const bundleResponse = await flashbotsProvider.sendRawBundle(
            [signedTransferTx],
            await provider.getBlockNumber() + 1
        );

        console.log("Bundle response:", bundleResponse);

        // Wait for the transaction to be included in a block
        const bundleReceipt = await bundleResponse.wait();
        if (bundleReceipt === 0) {
            console.log("Bundle included successfully!");
        } else {
            console.log("Bundle not included.");
        }
    } catch (error) {
        console.error("Failed to execute transfer transaction:", error);
    }
}

// Execute the main function
main();
