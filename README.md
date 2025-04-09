NFT MARKET NOTES
# Dependencies
- next
- kommunicate
- mui
- antd
## Install
```shell
npm install next @kommunicate/kommunicate-chatbot-plugin @mui/material @emotion/react @emotion/styled antd
```

# Init node
```shell
npx hardhat node 
```

# Deploy node
## Local: 
```shell
npx hardhat run scripts/deploy.js --network localhost
```

## Polygon Mumbai: 
```shell
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

# Run web
```shell
npm run dev
```

# essential documents
https://docs.pinata.cloud/docs/getting-started
https://docs.ethers.org/v6/migrating/#migrate-providers
https://hardhat.org/hardhat-runner/docs/getting-started#overview
https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721-Approval-address-address-uint256-
https://github.com/OpenZeppelin/openzeppelin-contracts

