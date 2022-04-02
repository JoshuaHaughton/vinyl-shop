import classes from "./Highlight.module.css";
interface Props {
  icon: JSX.Element;
  title: string;
  para: string;
}

const Highlight = ({ icon, title, para }: Props): JSX.Element => {
  return (
    <div className={classes.highlight}>
      <div className={classes.img}>{icon}</div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.paragraph}>{para}</p>
    </div>
  );
};

export default Highlight;
