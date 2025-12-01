import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0a0118] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-xl tracking-tighter text-white mb-4 block">
              NxtBeing
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Connecting the world's best AI talent with forward-thinking companies.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary">Browse Talent</Link></li>
              <li><Link href="#" className="hover:text-primary">For Companies</Link></li>
              <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary">Community</Link></li>
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} NxtBeing Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

