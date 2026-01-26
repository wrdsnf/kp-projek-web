import { Star, MapPin, ExternalLink, PenLine } from "lucide-react";

// Google Maps link for Pegadaian CP Sentul
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/icvaxQqpp8jeJWKZ9";
const GOOGLE_MAPS_REVIEW_LINK = `${GOOGLE_MAPS_LINK}?hl=id&entry=ttu&g_ep=EgoyMDI0MTEyNy4xIKXMDSoASAFQAw%3D%3D`;
const bintang = 3.6;
const ulasan = "90+";

export default function Reviews() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Rating Info */}
          <div className="text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
              <MapPin className="w-4 h-4" />
              Google Maps
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dipercaya oleh Nasabah Pegadaian CP Sentul
            </h2>

            {/* Subtext */}
            <p className="text-gray-600 max-w-lg">
              Penilaian dan ulasan diberikan langsung oleh nasabah melalui Google Maps.
            </p>

            {/* Rating Display */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="text-5xl font-black text-gray-900">{bintang}</div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((bintang) => (
                      <Star 
                        key={bintang} 
                        className={`w-5 h-5 ${bintang <= 4 ? 'fill-amber-400 text-amber-400' : bintang === 5 ? 'fill-amber-400/50 text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{ulasan} ulasan Google</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <a
                href={GOOGLE_MAPS_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tulis ulasan untuk Pegadaian CP Sentul di Google Maps"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all border border-gray-200"
              >
                <PenLine className="w-5 h-5" />
                Tulis Ulasan
              </a>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-green-50 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative space-y-6">
                {/* Google Maps Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Pegadaian CP Sentul
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Jl. Surokarsan No.56, Wirogunan, Kec. Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55151
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-700">{bintang}</span>
                  <span className="text-amber-600 text-sm">({ulasan} ulasan)</span>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Terverifikasi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-xs mt-12">
          Ulasan ditampilkan dan dikelola sepenuhnya oleh Google Maps.
        </p>
      </div>
    </section>
  );
}
