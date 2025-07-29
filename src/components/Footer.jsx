import { Award, Coins, Camera, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
          {/* Brand + Social Icons */}
          <div>
            <h3 className="text-2xl font-bold text-hot-pink mb-4 custom-heading">
              THRIFT UP
            </h3>
            <p className="text-deep-plum">
              Sustainable fashion for women, by women.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 mt-4">
              {[Heart, Coins, Camera, Award].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-peach-pink hover:bg-hot-pink transition-colors"
                >
                  <Icon className="h-5 w-5 text-deep-plum hover:text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-hot-pink">Features</h4>
            <ul className="space-y-2 text-deep-plum">
              <li><a href="#features">AR Try-On</a></li>
              <li><a href="#features">ThriftCoins</a></li>
              <li><a href="#features">Leaderboard</a></li>
              <li><a href="#features">Community</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-hot-pink">Community</h4>
            <ul className="space-y-2 text-deep-plum">
              <li><a href="#community">Discussion Forums</a></li>
              <li><a href="#community">Fashion Trends</a></li>
              <li><a href="#community">Sustainable Tips</a></li>
              <li><a href="#community">Fashion Events</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-hot-pink">Legal</h4>
            <ul className="space-y-2 text-deep-plum">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#returns">Return Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-peach-pink mt-12 pt-6 text-center text-sm text-deep-plum">
          <p>&copy; 2025 ThriftUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
