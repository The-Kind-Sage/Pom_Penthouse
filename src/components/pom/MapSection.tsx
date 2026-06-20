export function MapSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: "var(--sand-soft)" }}>
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-5">Location</p>
          <h2 className="h1-lux">Less than 200 meters from the lake</h2>
          <p className="mt-4 opacity-70 text-sm">Pom PentHouse — Lakeside Road, Pokhara</p>
        </div>
        <div className="rounded-[28px] overflow-hidden shadow-[var(--shadow-soft)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1606.8902719122848!2d83.9600202093067!3d28.209413397410657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995952ed26a383f%3A0x9b2bdf424583384a!2sPOM&#39;s%20Penthouse!5e1!3m2!1sen!2snp!4v1781969596939!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pom PentHouse location"
          />
        </div>
      </div>
    </section>
  );
}
