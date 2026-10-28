import { WhatsAppIcon } from "@/components/icons/BrandIcons";

export const WHATSAPP_URL =
  "https://wa.me/4917668257323?text=Hi%2C%20I%20have%20a%20query%20regarding%20your%20import%2Fexport%20services.%20Could%20you%20please%20assist%20me%3F";

export default function WhatsAppFloat() {
  return (
    <aside aria-label="Quick contact">
      {/* WhatsApp brand green is an intentional off-palette exception */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
        className="fixed right-6 bottom-22 z-90 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lift transition-[filter,transform] duration-200 hover:scale-105 hover:brightness-95"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </aside>
  );
}
