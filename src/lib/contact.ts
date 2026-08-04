export const WHATSAPP_NUMBER = '918787839762';
export const WHATSAPP_DISPLAY = '+91 87878 39762';

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_COACHING_URL = whatsappUrl(
  "Hi! I'm interested in online C / C++ / Competitive Programming coaching from CodeCraft.",
);

export const WHATSAPP_SESSION_URL = whatsappUrl(
  "Hi Anurag! I'd like to book a 1:1 mentoring session.",
);

export const WHATSAPP_CONTACT_URL = whatsappUrl(
  'Hi Anurag! I have a question about your mentoring.',
);
