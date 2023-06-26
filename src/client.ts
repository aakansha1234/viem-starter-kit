import { createPublicClient, http } from 'viem'
import { goerli, mainnet } from 'viem/chains'
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
})
export const goerliClient = createWalletClient({
  chain: goerli,
  transport: http()
})


export const account = privateKeyToAccount('0x07a511d63f5d7cfa4e93e04949327d027553f44cc5e4a2f594b3c360b0caa425')

