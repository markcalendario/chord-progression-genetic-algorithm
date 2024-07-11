import LinkButtonCard from "../../components/ButtonCard/LinkButtonCard.jsx";
import styles from "./Compose.module.scss";

export default function ComposeCompiled() {
  return <Compose />;
}

function Compose() {
  return (
    <section id={styles.compose}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.texts}>
            <h1>Select Music Genre</h1>
          </div>
          <div className={styles.genres}>
            <LinkButtonCard
              title="Melodic"
              image="/assets/illustrations/melodic.svg"
              href="/compose/melodic"
            />
            <LinkButtonCard
              title="Pop"
              image="/assets/illustrations/pop.svg"
              href="/compose/pop"
            />
            <LinkButtonCard
              title="Jazz"
              image="/assets/illustrations/jazz.svg"
              href="/compose/jazz"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
