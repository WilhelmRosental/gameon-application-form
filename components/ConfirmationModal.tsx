import Image from "next/image";
import { motion } from "framer-motion";

interface ConfirmationModalProps {
  onClose: () => void;
}

export default function ConfirmationModal({ onClose }: ConfirmationModalProps) {
  return (
    <motion.div
      className="confirmation-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.figure
        className="confirmation-modal__body"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <Image
          src="/assets/images/Logo.png"
          alt="Logo de GameOn"
          width={279}
          height={79}
        />
        <figcaption>Merci pour votre inscription !</figcaption>
        <button className="button" onClick={onClose}>
          Fermer
        </button>
      </motion.figure>
    </motion.div>
  );
}
