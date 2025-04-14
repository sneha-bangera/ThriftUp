export default function Footer() {
    return (
      <footer className="bg-pink-100 text-gray-800 py-6 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} ThriftUp. All rights reserved.</p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    );
  }
  