import { Search } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HomePage() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <button className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#00FF90] rounded-lg mr-2" />
            <span className="font-semibold text-lg">Audio</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TmyrKW80rLI2NAbzPT0A8VfZwStYoY.png"
            alt="Profile"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Welcome Section */}
      <div className="mb-6">
        <p className="text-gray-600 mb-1">Hi, Andrea</p>
        <h1 className="text-2xl font-bold">What are you looking for today?</h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input type="text" placeholder="Search headphone" className="pl-10 bg-gray-50 border-none" />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 mb-6">
        <Button variant="default" className="bg-[#00FF90] text-black hover:bg-[#00FF90]/90">
          Headphone
        </Button>
        <Button variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
          Headset
        </Button>
      </div>

      {/* Featured Product Card */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold mb-1">TMA-2</h3>
            <p className="font-bold mb-4">Modular Headphone</p>
            <Button variant="link" className="text-[#00FF90] hover:text-[#00FF90]/90 p-0 h-auto font-semibold">
              Shop now →
            </Button>
          </div>
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="TMA-2 Headphones"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-bold">Featured Products</h2>
        <Button variant="link" className="text-gray-500">
          See All
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-2xl p-4">
          <Image
            src="/placeholder.svg?height=120&width=120"
            alt="TMA-2 HD Wireless"
            width={120}
            height={120}
            className="mb-4 mx-auto"
          />
          <h3 className="font-semibold text-sm">TMA-2 HD Wireless</h3>
          <p className="text-sm text-gray-600">USD 350</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <Image
            src="/placeholder.svg?height=120&width=120"
            alt="C02 - Cable"
            width={120}
            height={120}
            className="mb-4 mx-auto"
          />
          <h3 className="font-semibold text-sm">C02 - Cable</h3>
          <p className="text-sm text-gray-600">USD 25</p>
        </div>
      </div>
    </div>
  )
}
