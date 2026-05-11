import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is your Minimum Order Quantity (MOQ)?",
      answer: "Our MOQ varies by product type. For custom paper bags, we start at 500 pieces. Rigid boxes start at 200 pieces, and potli bags at 300 pieces. We also offer sample orders for quality assessment before bulk ordering.",
    },
    {
      question: "What is the typical delivery timeline?",
      answer: "Standard production takes 10-15 business days after design approval. Rush orders can be accommodated in 7-10 days with additional charges. Delivery within India typically takes 3-5 business days post-production.",
    },
    {
      question: "Do you provide design support?",
      answer: "Yes! Our in-house design team offers comprehensive support from concept to final artwork. We provide up to 3 design revisions included in your order. We can also work with your existing brand guidelines and assets.",
    },
    {
      question: "Can I order samples before placing a bulk order?",
      answer: "Absolutely. We encourage sample orders to ensure quality and fit. Sample orders are charged at a nominal fee which is adjusted against your bulk order. Sample production takes 5-7 business days.",
    },
    {
      question: "Do you ship across India?",
      answer: "Yes, we deliver to all major cities and towns across India through reliable courier partners. International shipping is also available for select destinations. Shipping costs are calculated based on order volume and destination.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, UPI, credit/debit cards, and net banking. For bulk orders, we offer flexible payment terms with 50% advance and 50% before dispatch. GST invoices are provided for all orders.",
    },
    {
      question: "Are your packaging materials eco-friendly?",
      answer: "We offer a range of sustainable options including FSC-certified paper, recycled materials, and biodegradable alternatives. Let us know your sustainability requirements, and we'll recommend the best eco-friendly options for your needs.",
    },
  ];

  return (
    <section id="faqs" className="section-padding bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
            <span className="font-satoshi text-sm tracking-widest uppercase text-muted-foreground font-medium">
              FAQs
            </span>
            <span className="w-8 h-[2px] bg-brushed-gold"></span>
          </div>
          
          <h2 className="font-clash text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
            Frequently Asked{" "}
            <span className="text-soft-purple">Questions</span>
          </h2>
          
          <p className="font-satoshi text-lg text-muted-foreground">
            Everything you need to know about working with InTheBox.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card rounded-xl border-none shadow-sm data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                <span className="font-clash text-left text-base font-medium text-primary group-hover:text-soft-purple transition-colors">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="font-satoshi text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-beige rounded-2xl">
          <p className="font-satoshi text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:hello@inthebox.in"
            className="font-satoshi font-medium text-primary hover:text-brushed-gold transition-colors inline-flex items-center gap-2"
          >
            <span>Contact our team</span>
            <span className="w-6 h-[1px] bg-brushed-gold"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;