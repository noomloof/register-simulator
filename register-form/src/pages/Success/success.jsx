import "./styles.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useSound from "use-sound";
import { Link } from "react-router-dom";

export function Success({ goodgif, goodsong }) {
  const [leSong, { stop }] = useSound(goodsong, { volume: 0.35 });

  const params = useParams();

  useEffect(() => {
    leSong();
  });

  function handleSong() {
    stop();
  }

  return (
    <div>
      <h1 className="rickTitle">Bem-vindo(a) {params.name}!</h1>

      <p>
        {" "}
        You filled in all inputs correctly and accessed this protected area!
      </p>
      <img src={goodgif} alt="thegoditself" />
      <p>
        <strong>
          {" "}
          There wasn't much I could find to put here, so... yeah. Rick Astley.
          Another one. Yup.{" "}
        </strong>
      </p>
      <p>
        In any case, here's a{" "}
        <Link className="theLink" onClick={handleSong} to="/">
          {" "}
          link to the previous page
        </Link>{" "}
        for testing purposes.
      </p>
      <p>
        Going back <i>should</i> stop the song.{" "}
        <strong>
          <i>Should.</i>
        </strong>
      </p>
    </div>
  );
}
