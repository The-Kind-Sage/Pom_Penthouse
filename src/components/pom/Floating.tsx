import { MessageCircle } from "lucide-react";

export function FloatingBook() {
  return (
    <a
      href="https://wa.me/9779800000000" target="_blank" rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-gold text-luxury-black shadow-[0_18px_40px_-10px_rgba(201,162,39,0.6)] transition hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

export function BackToTop() {
  return null;
}
