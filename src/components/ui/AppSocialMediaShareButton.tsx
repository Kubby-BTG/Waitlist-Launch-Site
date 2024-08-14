"use client";

// https://codesandbox.io/p/devbox/react-share-demo-474q4k?file=%2Fsrc%2FApp.tsx%3A254%2C1-261%2C28

//

import { cn } from "../../lib/utils";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";

const AppSocialMediaShareButton = ({ shareUrl, title }: { shareUrl: string; title?: string }) => {
  const iconSize = 32;
  const className01 = cn(["cursor-pointer"]);
  return (
    <div className="flex flex-row gap-3">
      <FacebookShareButton url={shareUrl} className={className01}>
        <FacebookIcon size={iconSize} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title} className={className01}>
        <XIcon size={iconSize} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={title} separator=":: " className={className01}>
        <WhatsappIcon size={iconSize} round={true} />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl} className={className01}>
        <LinkedinIcon size={iconSize} round={true} />
      </LinkedinShareButton>

      <RedditShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460} className={className01}>
        <RedditIcon size={iconSize} round={true} />
      </RedditShareButton>

      <TelegramShareButton url={shareUrl} title={title} className={className01}>
        <TelegramIcon size={iconSize} round={true} />
      </TelegramShareButton>

      {/* <EmailShareButton url={shareUrl} subject={title} body="body" className={className01}>
        <EmailIcon size={iconSize} round={true} />
      </EmailShareButton> */}

      {/* <FacebookMessengerShareButton appId={""} url={shareUrl} title={title} className={className01}>
        <FacebookMessengerIcon size={iconSize} round={true} />
      </FacebookMessengerShareButton> */}

      <TumblrShareButton url={shareUrl} title={title} className={className01}>
        <TumblrIcon size={iconSize} round={true} />
      </TumblrShareButton>
    </div>
  );
};

export default AppSocialMediaShareButton;
