import "./App.css";
import * as rangy from "rangy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  close1,
  popup1,
  putLink1,
  handleLinkDelete1,
  handleLink1,
  // putid1,
} from "./redux/features/AppFeature";

import LinkModel from "./LinkModel";

function App() {
  const [load, setLoad] = useState(false);
  let counterState = useSelector((state) => {
    return state["externalLink"];
  });
  let dispatch = useDispatch();

  let { linkModel, content, linkModelEdit, position, url } = counterState;

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => {
    window.onresize = updateSize;
    test();
    setLoad(false);
  }, [load]);

  const close = () => {
    try {
      dispatch(close1());
    } catch (error) {
      console.log(error);
    }
  };

  //Function to Open popup And Decide it position
  // const popup = (event) => {
  //   try {
  //     dispatch(popup1(event));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const putid = () => {
  //   dispatch(putid1());
  // };
  const test = () => {
    try {
      let content_El = document.querySelectorAll(".content");
      for (let i = 0; i < content_El.length; i++) {
        content_El[i].addEventListener("contextmenu", (e) => {
          dispatch(popup1(e));
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const putLink = () => {
    dispatch(putLink1(rangy));
    setLoad(true);
  };

  const handleLinkDelete = () => {
    dispatch(handleLinkDelete1());
  };

  const handleLink = () => {
    dispatch(handleLink1(rangy));
  };

  return (
    <section>
      {linkModel ? (
        <LinkModel
          PutLink={putLink}
          Close={close}
          Content={content}
          Setcontent={content}
          Seturl={url}
          Url={url}
          Position={position}
          Edit={linkModelEdit}
          Delete={handleLinkDelete}
          width={size.x}
        />
      ) : (
        ""
      )}

      <button className="tooltipbtn button_Enable" onClick={handleLink}>
        Link
        {/* <span className="tooltiptextbtn">Alt+e</span> */}
      </button>
      <div
        id="over_all_div"
        onKeyDown={(e) => {
          if (e.altKey && (e.key === "e" || e.key === "E")) {
            e.preventDefault();
            handleLink();
          }
        }}
      >
        <hr></hr>
        <div className="section" id="sec1">
          <div
            className="para"
            id="par1"
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            Excepteur enim aliquip ea adipisicing excepteur cillum laborum in
            amet. Anim esse consequat ullamco ea magna enim consectetur
            cupidatat mollit mollit culpa eiusmod. Sunt duis adipisicing eiusmod
            sint commodo commodo.Excepteur mollit esse do et veniam culpa ipsum
            culpa enim. Elit ut nisi ex aute incididunt laboris consequat minim.
            Ea deserunt ea velit minim aute. Id aliquip sint sunt ut aliqua ut
            aute officia aliqua ullamco cupidatat deserunt.
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
