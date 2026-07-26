import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

export const QuoteDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-quote-modal", handleOpen);
    return () => window.removeEventListener("open-quote-modal", handleOpen);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[550px] bg-[#050505] border border-white/10 p-6 md:p-8 rounded-2xl text-white max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-sans font-bold text-white leading-tight">
            Get a Custom <span className="text-accent">Quote.</span>
          </DialogTitle>
          <DialogDescription className="text-sm font-sans text-white/50 mt-2">
            Tell us about your packaging parameters. Our structural design specialists will analyze your details and suggest a tailored prototype solution.
          </DialogDescription>
        </DialogHeader>

        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};
