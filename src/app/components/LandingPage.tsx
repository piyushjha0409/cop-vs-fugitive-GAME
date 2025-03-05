import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, MapPin, BadgeIcon as Police } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Police className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold">Criminal Escape</h1>
          </div>
          <Badge
            variant="outline"
            className="bg-red-900/30 text-red-400 border-red-800"
          >
            WANTED
          </Badge>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl w-full space-y-12 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
                Criminal Escape:
              </span>
              <span className="block mt-2">The Hunt</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A notorious criminal has vanished again. Can you and your team of
              3 fearless cops track them down across 5 neighboring cities?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center">
              <MapPin className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold">5 Cities</h3>
              <p className="text-slate-400 mt-2">
                Search across 5 neighboring cities to find the criminals hideout
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center">
              <Police className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold">3 Cops</h3>
              <p className="text-slate-400 mt-2">
                Lead a team of 3 fearless officers to capture the fugitive
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-center">
              <AlertCircle className="h-10 w-10 text-red-400 mb-4" />
              <h3 className="text-lg font-bold">1 Criminal</h3>
              <p className="text-slate-400 mt-2">
                Track down the notorious escape artist before they vanish again
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Link href="/game">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/20"
              >
                Start The Hunt
              </Button>
            </Link>
          </div>

          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-900 px-4 text-sm text-slate-400">
                How to play
              </span>
            </div>
          </div>

          <div className="text-slate-300 max-w-2xl mx-auto space-y-4">
            <p>
              The criminal is hiding in one of 5 neighboring cities. As the lead
              detective, you will coordinate 3 cops to search different
              locations.
            </p>
            <p>
              Use strategy and deduction to narrow down the criminals location
              before they have a chance to escape again!
            </p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6 px-4 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Criminal Escape Game
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-slate-400 hover:text-white text-sm">
              How to Play
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white text-sm">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
