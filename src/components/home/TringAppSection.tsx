import { Smartphone } from "lucide-react";

export default function TringAppSection() {
  return (
    <section id="aplikasi-mobile" className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-900 py-16 md:py-24">
      {/* Background Image - thumbnail.webp */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `url("/thumbnail.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-green-900/70" />
      
      {/* Pattern overlay for consistency */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-green-900 text-sm font-bold rounded-full">
              <Smartphone className="w-4 h-4" />
              APLIKASI MOBILE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pegadaian Digital - <span className="text-amber-400">Tring!</span>
            </h2>
            <p className="text-green-100 text-lg">
              Gunakan aplikasi Pegadaian Digital (Tring) untuk transaksi lebih mudah, aman, dan cepat.
            </p>
            <ul className="space-y-3 text-green-100">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm font-bold">✓</span>
                Gadai online tanpa antri
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm font-bold">✓</span>
                Tabungan emas mulai Rp10.000
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-green-900 text-sm font-bold">✓</span>
                Pembayaran tagihan & top up
              </li>
            </ul>
            
            {/* Referral Code */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-green-200 text-sm mb-2">Kode Referral</p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-3xl font-black text-amber-400 tracking-wider">13554</span>
                <span className="text-green-300 text-sm">(Gunakan saat daftar)</span>
              </div>
            </div>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2">
              <a 
                href="https://devpds.onelink.me/v3LG/seo" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 px-5 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download di</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.pegadaiandigital&pcampaignid=web_share" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-black text-white font-semibold py-3 px-5 rounded-xl hover:bg-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download di</div>
                  <div className="text-sm font-bold">Play Store</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Phone Mockup - Real image */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              {/* Phone frame with mockup image */}
              <div className="w-64 h-[500px] relative rounded-[3rem] overflow-hidden border-4 border-green-500/50 shadow-2xl">
                <img 
                  src="/mockup.jpeg" 
                  alt="Aplikasi Pegadaian Digital Tring"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-400/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
