import CopyrightText from "../copyright/CopyrightText";
import Logo from "/assets/favicon/webDevProF.png";
import SocialMediaLinks from "../socialMedia/SocialMediaLinks";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer bg-slate-700 text-slate-100 p-6 max-w-full">
        <nav>
          <h6 className="footer-title">Contact Information</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Navigation Links</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Privacy Policy or Terms</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer bg-slate-800 text-slate-100 border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <img src={Logo} alt="Logo" className="lg:w-14 lg:h-14 h-8 w-8" />
          <p className="flex">
            &copy; {currentYear} <span className="mr-2"></span>
            <CopyrightText />
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <SocialMediaLinks />
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
