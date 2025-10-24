import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LoginMentee from "@/page/loginMentee";
import logo_text from "@/assets/logo-text.png";
import { Link } from "react-router";
import logo2 from "@/assets/logo-text.png";
import { useState } from "react";

export const NavbarLandingPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#013B35] text-white px-10 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src={logo2}
              alt="Logo TEMPA"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <ul className="flex items-center space-x-10 text-sm font-medium">
          <li>
            <a href="/CampusPage" className="hover:text-[#00BFA6]">
              Kampus
            </a>
          </li>
          <li>
            <Link to="/JurusanPage" className="hover:text-[#00BFA6]">
              Jurusan
            </Link>
          </li>
          <li>
            <a href="/Panduan" className="hover:text-[#00BFA6]">
              Panduan
            </a>
          </li>
          <li>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <form>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-[#96CCEC] text-[#013B35] px-4 py-1.5 rounded-full font-semibold hover:bg-[#00a790] transition"
                  >
                    Masuk
                  </Button>
                </DialogTrigger>
                {isDialogOpen && (
                  <DialogContent className="sm:max-w-[425px] bg-[#013B35]">
                    <DialogHeader className="mb-4 ">
                      <DialogTitle className=" text-white ">
                        <div className="flex justify-center items-center ">
                          <div className="text-3xl">Masuk </div>
                          <img
                            src={logo_text}
                            alt=""
                            className="w-28"
                            srcset=""
                          />
                        </div>
                        <div className="px-16">
                          <div className="w-full  h-1 bg-[#96CCEC] mt-3 mb-2"></div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    {/* button login google */}
                    <LoginMentee />
                  </DialogContent>
                )}
              </form>
            </Dialog>
          </li>
        </ul>
      </nav>
    </>
  );
};
