import ButtonCard from "../../components/ButtonCard/ButtonCard.jsx";
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
            <ButtonCard
              title="Melodic"
              image="/assets/illustrations/melodic.svg"
            />
            <ButtonCard title="Pop" image="/assets/illustrations/pop.svg" />
            <ButtonCard title="Jazz" image="/assets/illustrations/jazz.svg" />
          </div>
        </div>
      </div>
    </section>
  );
}
