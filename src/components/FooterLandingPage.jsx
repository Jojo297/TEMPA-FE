import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import logo2 from "@/assets/logo-text.png";

export function FooterLandingPage() {
  return (
    <>
      {/* Footer */}
      <div className="bg-[#013B36] text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="p-4">
              <img
                src={logo2}
                alt="Logo TEMPA"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              TEMPA adalah platform pengembangan diri dan edukasi digital yang
              membantu kamu menemukan potensi, belajar dengan cara baru, dan
              mempersiapkan masa depan dengan lebih percaya diri.
            </p>
            <div className="flex space-x-4 mt-5 text-xl">
              <FaFacebookF className="hover:text-[#75B4C6] cursor-pointer" />
              <a
                href="https://www.instagram.com/tempa.explore?igsh=cWJ4c29iZnlndHQy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="hover:text-[#75B4C6] cursor-pointer" />
              </a>
              <FaYoutube className="hover:text-[#75B4C6] cursor-pointer" />

              <FaXTwitter className="hover:text-[#75B4C6] cursor-pointer" />
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP KAMPUS</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Politeknik Negeri Batam</li>
              <li>Institut Teknologi Batam (ITEBA)</li>
              <li>Universitas Internasional Batam (UIB)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-lg">TOP 4 PERUSAHAAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>COMING SOON</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-lg">BANTUAN</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Tentang Kami</li>
              <li>FAQs</li>
              <li>Help Center</li>
              <li>Terms and Condition</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-5 text-center text-sm text-gray-400">
          © 2025 TEMPA. All rights reserved. Icons by Icons8
        </div>
      </div>
    </>
  );
}
