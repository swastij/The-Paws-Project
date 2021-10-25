import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessageCard from "../components/chat/MessageCard";
import RecentChatCard from "../components/chat/RecentChatCard";
import RemoteMessageCard from "../components/chat/RemoteMessageCard";
import socialfire from "../socialfire";
import firebase from 'firebase'

export default function Chat() {
  const [subscriptionState, setSubscriptionState] = useState();
  const userStore = useSelector((store) => store.userStore);
  const [recentChats, setRecentChats] = useState([]);
  const [friendsState, setFriends] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [unsubHook, setUnsubHook] = useState(null);
  const [messages, setMessages] = useState([]);
  const [remoteUser, setRemoteUser] = useState({});

  const inputRef = useRef();

  const handleRecentChatsSubscription = () => {
    console.log(userStore);
    socialfire
      .firestore()
      .collection("recentChats")
      .where("members", "array-contains", userStore.user.id)
      .onSnapshot((res) => {
        const channels = res.docs.map((doc) => {
          return { docid: doc.id, members: doc.data().members };
        });
        console.log("recent chats", channels);
        setRecentChats(channels);
      });
  };

  useEffect(() => {
    if (recentChats.length > 0) {
      const friends = recentChats.map((chat) => {
        return {
          userID: chat.members.filter((user) => user != userStore.user.id)[0],
          docId: chat.docid,
        };
      });
      console.log(friends);
      setFriends(friends);
    }
  }, [recentChats]);

  useEffect(() => {
    if (userStore.token) handleRecentChatsSubscription();
  }, [userStore]);

  const handleOpenChatRoom = (docID, remUser) => {
    if (docID != activeChannel) {
      setActiveChannel(docID);
      setRemoteUser(remUser);
      setMessages([]);
      console.log("subscribed to doc: ", docID);
      // if (unsubHook) {
      //   unsubHook();
      // }
      socialfire
        .firestore()
        .collection("recentChats")
        .doc(docID)
        .collection("messages")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          const msgs = snapshot.docs.map((doc) => doc.data());
          setMessages(msgs);
        });
    }
    //setUnsubHook(unsubscribe);
  };

  const handleSendMessage = async () => {
    
    if (inputRef.current?.value?.length > 0) {
      try {
        socialfire
          .firestore()
          .collection("recentChats")
          .doc(activeChannel)
          .collection("messages")
          .add({
            body: inputRef.current.value,
            user: userStore.user.id,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
          });
          inputRef.current.value = ""
      } catch (e) {
        console.log(e)
      }
    }else{
      console.log(inputRef.current.value)
    }
  };

  return (
    <Box
      maxW="1200px"
      m="auto"
      h="90vh"
      w="100%"
      display="grid"
      gridTemplateColumns="1fr 3fr"
      padding="8px"
    >
      <div>
        <Heading>Recent Chats</Heading>
        {friendsState?.map((recentChat, key) => (
          <RecentChatCard
            key={key}
            onRecentChatSelect={handleOpenChatRoom}
            userID={recentChat.userID}
            docID={recentChat.docId}
          />
        ))}
      </div>
      {activeChannel && (
        <Box display="grid" gridTemplateRows="1fr 50px" position="relative">
          <div id="messages">
            {messages?.map((msg) => {
              if (msg.user != userStore.user.id)
                return (
                  <RemoteMessageCard
                    timestamp={msg.timestamp}
                    profile_pic={remoteUser.profile_pic}
                    body={msg.body}
                  />
                );
              else
                return (
                  <MessageCard
                  timestamp={msg.timestamp}
                    profile_pic={userStore.user.profile_pic}
                    body={msg.body}
                  />
                );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 50,
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 100px",
              alignItems: "center",
            }}
          >
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              style={{ height: "100%" }}
            />
            <Button onClick={handleSendMessage} colorScheme="blue" h="100%">
              Send
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
}
