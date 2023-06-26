import { publicClient } from './client.js'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { wethAbi } from './abis.js'
import { uniswapAbi } from './abi.js'
import { ercAbi } from './abierc.js'
import { account, goerliClient } from './client.js'


// Calling this function to know the owner of the Uniswap Contract
async function getUniswapV3FactoryOwner() {
  const balance = await publicClient.getBalance({ 
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  })
  const transactionCount = await publicClient.getTransactionCount({  
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  })

  const data = await publicClient.readContract({
    address: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    abi: uniswapAbi,
    functionName: 'owner',
  })
}

// deposits georli eth into weth contract to receive weth token
async function depositIntoWeth() {
  const { request } = await publicClient.simulateContract({
    account,
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    abi: wethAbi,
    functionName: 'deposit',
    value: 10000000000000000n,
  })
  await goerliClient.writeContract(request)
}

async function transferWeth() {
  const { request } = await publicClient.simulateContract({
    account,
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    abi: ercAbi,
    functionName: 'transfer',
    args: ['0x4eed9Ce331948932b3Df2817abcFA6F29B043868',10000000000000000n],
  })
  await goerliClient.writeContract(request)
}

async function generatekey() {
  const privateKey = generatePrivateKey()
  const account = privateKeyToAccount(privateKey) 
  const hash = await goerliClient.sendTransaction({ 
    account,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: 10000000000000000n
  })
}

await transferWeth();
