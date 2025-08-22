// components/SocialLinks.tsx
import { FaLinkedin, FaInstagram, FaLink } from "react-icons/fa";

type SocialLinksProps = {
  linkedin?: string;
  instagram?: string;
  linktree?: string;
};

export default function SocialLinks({ linkedin, instagram, linktree }: SocialLinksProps) {
  return (
    <div className="flex gap-4 mt-2">
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={24} />
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700"
        >
          <FaInstagram size={24} />
        </a>
      )}
      {linktree && (
        <a
          href={linktree}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800"
        >
          <FaLink size={24} />
        </a>
      )}
    </div>
  );
}
