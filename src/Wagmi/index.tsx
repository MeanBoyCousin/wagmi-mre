'use client'

import type { PropsWithChildren } from 'react'

import { arbitrum, arbitrumSepolia } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum, arbitrumSepolia],
  [publicProvider()],
)

const connectors = [
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'MRE',
    },
  }),
  new MetaMaskConnector({ chains }),
]

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

export default WagmiProvider
