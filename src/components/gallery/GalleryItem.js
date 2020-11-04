import React, { useState } from "react";
import "../../App.css";
import Modal from "react-modal";
// import ReactModal from 'react-modal'

const GalleryItem = ({ item, title, desc }) => {
  let newTitle = title.replace("<strong>", "");
  newTitle = newTitle.replace("</strong>", "");
  newTitle = newTitle.replace(".com", "");

  let newDesc = desc.replace(/<strong>/g, "");
  newDesc = newDesc.replace("</strong>", "");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000",
      color: "#ccc",
      width: "500px",
      height: "400px",
      borderRadius: "10px",
      border: "1px #ccc solid",
      boxShadow: " 1px 2px #888888",
    },
  };

  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={"https://oren-epstein.com/oe_img/thumbs/" + item} alt="" />
        </div>
        <div className="card-back" align="center">
          <a onClick={setModalIsOpenToTrue}>Read More...</a>

          <Modal isOpen={modalIsOpen} style={customStyles}>
            <button onClick={setModalIsOpenToFalse}>x</button>
            <br></br>
            <br></br>
            <p className="mb-1">
              {newDesc.split(/<br\s*\\?>/g).map((line) => (
                <div><br></br>{line}</div>
              ))}
            </p>
          </Modal>
                  <strong>
                      <br></br>
                      <br></br>
            <center>www.{newTitle}.com</center>
          </strong>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
