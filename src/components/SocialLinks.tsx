import { Facebook, Instagram, Linkedin, Twitter, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialLinks = () => {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: Phone,
      href: "https://wa.me/255123456789",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      color: "bg-blue-400 hover:bg-blue-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "bg-blue-700 hover:bg-blue-800",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((social) => (
          <Button
            key={social.name}
            variant="ghost"
            size="icon"
            className={`${social.color} text-white`}
            asChild
          >
            <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
              <social.icon className="w-5 h-5" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};