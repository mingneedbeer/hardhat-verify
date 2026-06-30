# AI-Enable Token Verifier

Hardhat verification setup for [AIEnableToken.sol](contracts/AIEnableToken.sol) on Abstract chain (testnet/mainnet).

## What

This repo contains the exact compiler configuration needed to verify the `AIEnableToken` contract on the Abstract block explorer. The token is deployed dynamically from the [counter2](https://github.com/mingneedbeer/counter2) web app — each deployment gets a unique on-chain name with the owner's email (e.g. `AI-Enable Token (user@email.com)`).

## Compiler Stack

| Component | Version |
|-----------|---------|
| zksolc | 1.5.15 |
| zkvm-solc | 0.8.24-1.0.2 |
| Solidity | 0.8.24 |
| Optimizer | enabled, mode `3` |
| EVM version | `paris` |

## Usage

```bash
npx hardhat verify --network abstractTestnet <CONTRACT_ADDRESS> \
  "AI-Enable Token (user@email.com)" \
  "AIE" \
  <TO_ADDRESS> \
  1000000000000000000000
```

The constructor arguments are:
1. `_name` — token name, includes the deployer's email
2. `_symbol` — always `"AIE"`
3. `to` — AA account that receives the minted supply
4. `amount` — `1000 * 10^18` (1000 AIE)

## Networks

Edit `hardhat.config.js` to switch between testnet and mainnet:

```js
abstractTestnet: {
  url: "https://api.testnet.abs.xyz",
  verifyURL: "https://api-explorer-verify.testnet.abs.xyz/contract_verification",
},
abstract: {
  url: "https://api.mainnet.abs.xyz",
  verifyURL: "https://api-explorer-verify.abs.xyz/contract_verification",
},
```

## How the UI auto-verifies

The [counter2](https://counter2-xi.vercel.app) web app calls the same verification API directly from the browser after each token deployment. The `verifyContract` function in `WalletConnect.tsx` POSTs the Standard JSON input + ABI-encoded constructor args to the explorer's verification endpoint, matching this Hardhat setup exactly.
