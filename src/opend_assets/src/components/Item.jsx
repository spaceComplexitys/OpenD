import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";

function Item(props) {

  const [name, setName] = useState();
  const [ownerId, setOwnerId] = useState();
  const [image, setImage] = useState();
  const id = Principal.fromText(props.id);

  const localHost = "http://localhost:8000/";
  const agent = HttpAgent({host: localHost});

  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const ownerId = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imageContent = new UInt8Array(imageData);

    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png"})
    );


    setName(name);
    setOwnerId(ownerId.toText());
    setImage(image);
  }




  useEffect(() => {
    loadNFT();
    loadOwnerId();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {ownerId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
