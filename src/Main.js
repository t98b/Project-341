import React, { useState } from "react";

import Sender from "/Users/talalbazerbachi/Documents/GitHub/Project-341/src/components/Sender.js";
import Messages from "/Users/talalbazerbachi/Documents/GitHub/Project-341/src/components/Messages.js";

export const Main = () => {
  return (
    <div className="main__layout">
      <LeftSection></LeftSection>
      <RightSection></RightSection>
    </div>
  );
};

const LeftSection = () => {
  return (
    <div className="main__layout--leftPannel">
      <UserInfoSection></UserInfoSection>
      <ChannelSection></ChannelSection>
      <PersonnalChatSection></PersonnalChatSection>
    </div>
  );
};

const RightSection = () => {
  return (
    <div className="main__layout--rightPannel">
      <SearchSection></SearchSection>
      <MessageBoardSection></MessageBoardSection>
      <UserInputSection></UserInputSection>
    </div>
  );
};

const UserInputSection = () => {
  return (
    <div className="main__layout--input">
      user input SECTION
      <Sender />
      {/* ADD YOU CODE IN THIS SECTION */}
    </div>
  );
};

const MessageBoardSection = () => {
  return (
    <div className="main__layout--board">
      messages SECTION
      <Messages />
      {/* ADD YOU CODE IN THIS SECTION */}
    </div>
  );
};

const SearchSection = () => {
  return (
    <div className="main__layout--search">
      Search SECTION
      {/* ADD YOU CODE IN THIS SECTION */}
    </div>
  );
};

const UserInfoSection = () => {
  return (
    <div className="main__layout--userInfo">
      User Info SECTION
      {/* ADD YOU CODE IN THIS SECTION */}
    </div>
  );
};

const PersonnalChatSection = () => {
  return (
    <div className="main__layout--chat">
      Personnal Chat SECTION
      {/* ADD YOU CODE IN THIS SECTION */}
    </div>
  );
};

const ChannelSection = () => {
  const [channels, setChannels] = useState(["General"]);
  const [name, setName] = useState("");
  const [channelName, setChannelNAme] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const click = () => {
    setShowOverlay(true);
  };

  const close = () => {
    setShowOverlay(false);
  };

  const onChannelNameChange = event => {
    setName(event.target.value);
  };

  const onSubmit = () => {
    setChannels(channels.push(name));
  };

  return (
    <div className="main__layout--channels">
      <CreateChannelButton
        channelsCount={channels.length}
        createChannelClick={click}
      />
      <Channels channels={channels} />
      {showOverlay ? (
        <AddChannelOverlay
          closeOverlay={close}
          onChange={onChannelNameChange}
          onSubmit={onSubmit}
        />
      ) : null}
    </div>
  );
};

const CreateChannelButton = props => {
  return (
    <div className="longButton__header">
      <span className="label__header label__header--title ">
        {" "}
        Channels ({props.channelsCount})
      </span>
      {/* <span className="label__header" onClick={props.createChannelClick}><PlusSign /></span> */}
    </div>
  );
};

const Channel = props => {
  return <div className="section__channel">{props.name} Channel</div>;
};

const Channels = props => {
  const channelsAr = props.channels;
  return (
    <div className="section__channels">
      {channelsAr.map(channel => (
        <Channel name={channel} />
      ))}
    </div>
  );
};

const AddChannelOverlay = props => {
  return (
    <div className="section__overlay">
      <div className="container__textField">
        <input
          type="text"
          className="login__field"
          placeholder="Channel Name"
          onChange={props.onChange}
        ></input>
        <input
          type="text"
          className="login__field"
          placeholder="Subject (optional)"
        ></input>
        <div>
          <span className="cancel__button" onClick={props.onSubmit}>
            {" "}
            Submit{" "}
          </span>
        </div>
        <div>
          <span className="cancel__button" onClick={props.closeOverlay}>
            {" "}
            Cancel{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
