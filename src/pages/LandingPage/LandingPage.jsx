import styles from "./LandingPage.module.scss";

export default function LandingPageCompiled() {
  return <Hero />;
}

function Hero() {
  return (
    <section id={styles.hero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Craft harmonies through evolutionary algorithms</h1>
          <p>
            By clicking the button below, we will create a music for you through
            a natural selection of notes.
          </p>
          <a href="/compose">Start Generating</a>
        </div>
      </div>
    </section>
  );
}
