import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  range: "",
  content: "",
  linkModel: false,
  position: { x: 50, y: 50 },
  linkModelEdit: false,
  editId: "",
  size: {
    x: window.innerWidth,
    y: window.innerHeight,
  },
};

let counterSlice = createSlice({
  name: "externalLink",
  initialState: initialState,
  reducers: {
    updateSize1: function (state, action) {
      state.size = action.payload;
    },
    close1: function (state) {
      state.linkModel = false;
      state.linkModelEdit = false;
      state.range = "";
      state.content = "";
      state.url = "";
    },
    popup1: function (state, action) {
      action.payload.preventDefault();
      console.log(state);
      console.log(action);
      if (action.payload.which === 3) {
        let x = action.payload.pageX;
        let y = action.payload.pageY;
        state.position = { x, y };

        state.linkModelEdit = true;

        let id = action.payload.target.parentElement.id;
        console.log(id);
        if (id) {
          let element = document.getElementById(id);
          let a = element.querySelector("a");
          let content = element.querySelector(".content");
          let text = content.innerHTML;
          state.content = text;

          let url = a.innerHTML;
          state.url = url;
          state.editId = id;
          state.linkModel = true;
        }
      }
    },
    putid1: function (state, action) {
      try {
        let tooltip = document.querySelectorAll(".tooltip");
        let tooltiptext = document.querySelectorAll(".tooltiptext");
        console.log(state);
        let id = 1;
        if (tooltip.length > 0) {
          for (let Element of tooltip) {
            Element.id = "tooltip" + id;
            ++id;
          }
        }

        id = 1;
        if (tooltiptext.length > 0) {
          for (let Element of tooltiptext) {
            Element.id = "tooltiptext" + id;
            ++id;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    putLink1: function (state, action) {
      try {
        state.linkModel = false;
        let range = state.range;

        if (range && !state.linkModelEdit) {
          let check = state.url.split(".");
          if (state.url !== "" && (check[0] === "www" || check[0] === "WWW")) {
            let newelement = document.createElement("div");
            newelement.className = "tooltip";
            newelement.contentEditable = false;
            range.deleteContents();
            let Content = document.createElement("span");
            Content.innerText = `${state.content}`;
            Content.className = "content";
            newelement.append(Content);
            // newelement.addEventListener("contextmenu", (state, dispatch) => {
            //   //
            //   // console.log(e);
            //   // console.log(state.position);
            //   // console.log(action.payload);
            //   counterSlice.caseReducers.popup1(state, dispatch);
            //   //
            //   // console.log(state);
            // });
            let toottiptext = document.createElement("span");
            toottiptext.className = "tooltiptext";
            let link = document.createElement("a");
            link.href = "https://" + state.url;
            link.innerHTML = state.url;
            link.target = "_blank";
            toottiptext.append(link);
            newelement.append(toottiptext);
            range.insertNode(newelement);
            action.payload.getSelection().setSingleRange(range);
            counterSlice.caseReducers.putid1();
            if (link.getBoundingClientRect().x > 600) {
              const change = document.querySelectorAll(".tooltiptext");
              for (let tool of change) {
                if (tool.getBoundingClientRect().x > 600) {
                  tool.style.marginLeft = -120 + "px";
                  console.log(tool.getBoundingClientRect().x);
                }
              }
            }
          } else if (state.url === "") {
          } else if (check[0] !== "www" || check[0] !== "WWW") {
          }
        } else if (state.linkModelEdit) {
          let check = state.url.split(".");
          if (state.url !== "" && (check[0] === "www" || check[0] === "WWW")) {
            state.linkModelEdit = false;
            let Element = document.getElementById(state.editId);
            let a = Element.querySelector("a");
            a.href = "https://" + state.url;
            a.innerHTML = state.url;
            let Content = Element.querySelector(".content");
            Content.innerHTML = state.content;
          } else if (state.url === "") {
          } else if (check[0] !== "www" || check[0] !== "WWW") {
          }
        } else {
        }
        close1();
      } catch (error) {
        console.log(error);
        close1();
      }
    },
    handleLinkDelete1: function (state, action) {
      try {
        state.linkModel = true;
        let currentElement = document.getElementById(state.editId);
        currentElement.parentNode.replaceChild(
          document.createTextNode(state.content),
          currentElement
        );
        close1();
      } catch (error) {
        console.log(error);
        close1();
      }
    },
    handleLink1: function (state, action) {
      try {
        const getFirstRange = () => {
          let sel = action.payload.getSelection();
          return sel.rangeCount ? sel.getRangeAt(0) : null;
        };
        let range = getFirstRange();
        if (range) {
          close1();
          let word = action.payload.getSelection().toString();

          state.content = word;
          if (word) {
            let text = window.getSelection(),
              position = text.getRangeAt(0),
              boundary = position.getBoundingClientRect();

            state.range = range;
            if (boundary) {
              let x = boundary.x;
              let y = boundary.y;

              state.position = { x, y };
            }

            state.linkModel = true;
          } else {
          }
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    },
    seturl1: function (state, action) {
      console.log(action);
      state.content = action.payload;
    },
    seturl2: function (state, action) {
      state.url = action.payload;
    },
  },
});

export const {
  updateSize1,
  close1,
  popup1,
  putLink1,
  handleLinkDelete1,
  handleLink1,
  putid1,
  seturl1,
  seturl2,
} = counterSlice.actions;

export default counterSlice.reducer;
