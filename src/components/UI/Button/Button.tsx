"use client";

import type { ReactNode } from "react";
import Magnetic from "@/components/UI/Magnetic/Magnetic";
import { leadStore } from "@/lib/leadStore";
import styles from "./Button.module.css";

type Common = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
  magnetic?: boolean;
  cursor?: string;
};

type Props = Common &
  (
    | { href: string; lead?: never; onClick?: never }
    | { lead: true | string; href?: never; onClick?: never }
    | { onClick: () => void; href?: never; lead?: never }
  );

/**
 * The site's one button. Text slides out and back in on hover (a "line
 * feed"); `lead` opens the Begin-your-book dialog, optionally prefilled.
 */
export default function Button({ children, variant = "solid", size = "md", className, magnetic = true, cursor, ...rest }: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className ?? ""}`;
  const inner = (
    <span className={styles.inner}>
      <span className={styles.text}>
        <span className={styles.roll}>
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 20 20" width="14" height="14">
          <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
    </span>
  );

  let el: ReactNode;
  if ("href" in rest && rest.href) {
    el = (
      <a href={rest.href} className={cls} data-cursor={cursor}>
        {inner}
      </a>
    );
  } else {
    const onClick = "lead" in rest && rest.lead ? () => leadStore.open(typeof rest.lead === "string" ? rest.lead : "") : rest.onClick;
    el = (
      <button type="button" className={cls} onClick={onClick} data-cursor={cursor} aria-haspopup={"lead" in rest && rest.lead ? "dialog" : undefined}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
