import Image from "next/image";
import type { Place } from "@/content/mockups";

type Props = {
  desktop: string;
  phone: string;
  desktopPlace: Place;
  phonePlace: Place;
  alt?: string;
  sizes: string;
  lag?: { desktop: number; phone: number };
};

/** A desktop screenshot with a phone screenshot beside it, placed as in the design. */
export default function DeviceMock({ desktop, phone, desktopPlace, phonePlace, alt = "", sizes, lag }: Props) {
  return (
    <>
      <span className="mock-desktop" style={desktopPlace} data-lag={lag?.desktop} data-stack-part={lag ? "" : undefined}>
        <span>
          <Image src={desktop} alt={alt} fill sizes={sizes} unoptimized={desktop.endsWith(".svg")} />
        </span>
      </span>
      <span className="mock-phone" style={phonePlace} data-lag={lag?.phone} data-stack-part={lag ? "" : undefined}>
        <span>
          <Image src={phone} alt="" fill sizes="(max-width: 760px) 40vw, 320px" unoptimized={phone.endsWith(".svg")} />
        </span>
      </span>
    </>
  );
}
