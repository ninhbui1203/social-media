import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

function ShareModal({ url }) {
  return (
    <div className="d-flex justify-content-around align-items-center bg-light border-top border-bottom p-1">
      <EmailShareButton url={url}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <PinterestShareButton url={url}>
        <PinterestIcon size={32} round={true} />
      </PinterestShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );
}

export default ShareModal;
