import ContactFormProvider from "@/components/ContactForm";
import Motion from "@/components/Motion";
import PageTransition from "@/components/PageTransition";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getContent } from "@/content/i18n";
import type { Lang } from "@/lib/languages";

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = getContent(lang);
  return (
    <ContactFormProvider lang={lang} text={t.form}>
      <a href="#content" className="skip-link">
        {t.common.skip}
      </a>
      <SiteHeader lang={lang} text={t.nav} menu={t.common.mainMenu} />
      <PageTransition>{children}</PageTransition>
      <SiteFooter lang={lang} />
      <Motion />
    </ContactFormProvider>
  );
}
