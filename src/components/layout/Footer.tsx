import Link from "next/link";

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="px-9 pt-8 pb-16  md:justify-center md:items-center md:flex lg:flex md:gap-[60px] md:px-[123px] md:pb-[10] lg:gap-[300px] bg-primary">
      <div className="flex gap-3 justify-center pb-6 md:pb-0 md:gap-[60px] lg:gap-[300px] ">
        <span className="text-center text-white-ffffff text-[16px] ">
          ©codeit - 2023
        </span>
        <div className="flex items-center justify-center gap-[30px] text-[16px] text-white-ffffff">
          <span className="cursor-pointer">Privacy Policy</span>
          <span className="cursor-pointer">FAQ</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 text-lg md:m-0">
        <Link href="https://facebook.com/">
          <FaFacebook className="text-white-ffffff" />
        </Link>
        <Link href="https://twitter.com/">
          <FaTwitter className="text-white-ffffff" />
        </Link>
        <Link href="https://youtube.com/">
          <FaYoutube className="text-white-ffffff" />
        </Link>
        <Link href="https://instagram.com/">
          <FaInstagram className="text-white-ffffff" />
        </Link>
      </div>
    </div>
  );
}
