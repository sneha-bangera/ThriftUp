export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-pink-100">
        <h1 className="text-5xl font-bold mb-4 text-pink-600">Welcome to ThriftUp</h1>
        <p className="text-xl max-w-xl mb-6">
          The ultimate destination for women to buy & sell pre-loved fashion. Stylish, sustainable, and budget-friendly!
        </p>
        <div className="flex gap-4">
          <button className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 transition">
            Start Selling
          </button>
          <button className="border border-pink-600 text-pink-600 px-6 py-2 rounded-xl hover:bg-pink-200 transition">
            Browse Listings
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Why ThriftUp?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Eco-Friendly Fashion</h3>
            <p>Give clothes a second life and reduce fashion waste.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Empowering Women</h3>
            <p>Support women entrepreneurs by buying directly from them.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Affordable Style</h3>
            <p>Discover trendy pieces at prices you'll love.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
