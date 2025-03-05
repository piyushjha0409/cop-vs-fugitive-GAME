import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GamePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md w-full space-y-8">
          <h1 className="text-3xl font-bold">Game Page</h1>
          <p className="text-slate-300">
            This is where your game will be implemented. The criminal is hiding in one of the 5 cities, and your 3 cops
            need to find them!
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

