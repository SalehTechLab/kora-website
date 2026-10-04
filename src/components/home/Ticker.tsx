import styles from "./Ticker.module.css";

const ITEMS = [
  "Global Sourcing",
  "International Logistics",
  "Verified Suppliers",
  "On-Time Delivery",
  "Stress Free Business",
  "Competitive Pricing",
  "Full Visibility",
  "Air. Sea. Rail. Road",
  "Transparency",
  "Compliance",
  "End-to-End Coordination",
  "Multilingual Support",
];

export default function Ticker() {
  return (
    <section className={styles.ticker} aria-label="What KORA offers">
      <div className={styles.track}>
        {/* Rendered twice so the -50% translate loops seamlessly */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className={styles.group}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {ITEMS.map((item) => (
              <li key={item} className={styles.item}>
                <span className={styles.star} aria-hidden="true">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
