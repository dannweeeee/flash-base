'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRegularBlockData, useFlashblockData } from "./hooks/useBlockData";
import BlockInfo from "./components/BlockInfo";
import TransactionSender from "./components/TransactionSender";

export default function Home() {
  // Use state to track if we're on the client side
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const { 
    data: regularBlockData, 
    isLoading: isRegularLoading, 
    error: regularError 
  } = useRegularBlockData();
  
  const { 
    data: flashblockData, 
    isLoading: isFlashblockLoading, 
    error: flashblockError 
  } = useFlashblockData();

  return (
    <div className="min-h-screen p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://base.org/images/logo.svg"
              alt="Base logo"
              width={40}
              height={40}
              priority
            />
            <h1 className="text-2xl md:text-3xl font-bold">Base Flashblocks NFT Minter</h1>
          </div>
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center md:text-right">
            <p>ETH Denver 2025 - Builder Side Quest</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Mint Your Transaction Time as an NFT
            </h2>
            <p className="text-lg mb-4">
              Experience the speed of Base Flashblocks (200ms) and mint your transaction time as a unique NFT!
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 min-w-[200px]">
                <h3 className="font-semibold">1. Send a Transaction</h3>
                <p className="text-sm">Send a test transaction to the Flashblocks network</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 min-w-[200px]">
                <h3 className="font-semibold">2. See the Speed</h3>
                <p className="text-sm">Experience 200ms confirmation times</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex-1 min-w-[200px]">
                <h3 className="font-semibold">3. Mint Your NFT</h3>
                <p className="text-sm">Create a unique NFT with your transaction time</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Comparing 2s Full Blocks vs 200ms Flashblocks
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Base Flashblocks provides 10x faster block times (200ms) compared to regular blocks (2s).
            Watch the blocks update in real-time below and see the difference!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isClient ? (
              <>
                <BlockInfo
                  title="Regular Blocks (2s)"
                  blockData={regularBlockData}
                  isLoading={isRegularLoading}
                  error={regularError as Error}
                  refreshInterval={2000}
                />
                
                <BlockInfo
                  title="Flashblocks (200ms)"
                  blockData={flashblockData}
                  isLoading={isFlashblockLoading}
                  error={flashblockError as Error}
                  refreshInterval={200}
                  className="border-blue-500 dark:border-blue-700"
                />
              </>
            ) : (
              <>
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 h-[300px] md:h-[400px] flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-blue-500 dark:border-blue-700 p-6 h-[300px] md:h-[400px] flex items-center justify-center">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Test Transaction Speed & Mint Your NFT
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Send a test transaction to both networks simultaneously and compare how quickly they get confirmed.
            Then, mint an NFT with your Flashblocks transaction time as a unique visual representation!
          </p>
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
            <p className="font-semibold mb-1">How transaction speed is measured:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>You sign the transaction in your wallet</li>
              <li>The timer starts when the transaction hash is received (after signing)</li>
              <li>The timer stops when the transaction is included in a block</li>
              <li>The difference is displayed as the transaction speed</li>
            </ol>
            <p className="mt-2 font-semibold">Expected results:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Regular blocks: ~2000ms (2 seconds)</li>
              <li>Flashblocks: ~200ms (0.2 seconds)</li>
            </ul>
            <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200 text-xs">
                <span className="font-semibold">Demo Mode:</span> For demonstration purposes, this app shows the theoretical block times rather than actual network latency, which can vary based on network conditions.
              </p>
            </div>
          </div>
          
          {isClient ? (
            <TransactionSender />
          ) : (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 h-[300px] flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">
          Built for ETH Denver 2025 - Base Flashblocks Builder Side Quest
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4">
          <a
            href="https://base.org/flashblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Flashblocks Docs
          </a>
          <a
            href="https://github.com/base-org/flashblocks"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/buildonbase"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}
