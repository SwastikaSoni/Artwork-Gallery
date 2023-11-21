import React from "react";
import { Typography, Button } from "@material-tailwind/react";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="relative w-full bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Typography variant="h5" className="mb-5 text-[#d4f5de]">
              <img
                src="images/logo.png"
                alt="Logo"
                width="7%"
                className="inline me-3"
              />
              Palatte Picks
            </Typography>
            <Typography variant="body" className="text-[#d4f5de]">
              Discover and explore a world of art with Palatte Picks. Your
              creative journey starts here.
            </Typography>
          </div>
          <div className="md:col-span-1 lg:col-span-1 text-center md:text-left">
            <Typography variant="h6" className="mb-4 text-[#d4f5de]">
              Contacts
            </Typography>
            <Typography variant="body" className="text-[#d4f5de] mb-2">
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body" className="text-[#d4f5de] mb-2">
              Email: info@palattepicks.com
            </Typography>
            <Typography variant="body" className="text-[#d4f5de]">
              Address: 123 Art Street, Creativity City
            </Typography>
          </div>
          <div className="md:col-span-1 lg:col-span-1 md:text-right">
            <Typography variant="h6" className="mb-4 text-[#d4f5de]">
              Follow Us
            </Typography>
            <div className="flex justify-end gap-4">
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <svg
                  className="h-5 w-5 text-[#d4f5de]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Your path here */}
                </svg>
                Facebook
              </Typography>
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <svg
                  className="h-5 w-5 text-[#d4f5de]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Your path here */}
                </svg>
                Twitter
              </Typography>
              <Typography
                as="a"
                href="#"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <svg
                  className="h-5 w-5 text-[#d4f5de]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {/* Your path here */}
                </svg>
                Instagram
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Typography
            variant="small"
            className="text-[#d4f5de] opacity-80"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/" className="underline">
              Palatte Picks
            </a>
            . All Rights Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
