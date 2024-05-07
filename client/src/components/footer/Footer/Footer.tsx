import { FooterProps } from "./Footer";

function Footer(props: FooterProps) {
  //{ && <div className="fixed-bottom-left">Logged in as {displayUserID}</div>}
  return (
    <footer className="is-flex is-justify-content-center is-size-6">
      {props. && (
        <div className="is-flex">
          <p className="mr-2">Logged in as {props.userID}</p>
          <p className="mr-2">|</p>
        </div>
      )}
    </footer>
  );
}
export default Footer;
